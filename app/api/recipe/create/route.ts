import { getServerSession } from "next-auth";
import { put, del } from "@vercel/blob";

import prisma from "@/lib/prisma";
import { Ingredient, Recipe, Step } from "@/lib/types";
import { normalizeString } from "@/lib/utils";

const uploadPictures = async (prefix: string, files: File[]) => {
  const now = Date.now();
  const blobs = await Promise.all(
    files.map((file, i) =>
      put(`${prefix}_${now}_${i}`, file, { access: "public" })
    )
  );

  return blobs.map(({ url }) => url);
};

const checkRecipeHasError = (recipe: Recipe) => {
  recipe.name = recipe.name.trim();
  if (!recipe.name) return "You must name your recipe";

  recipe.ingredients = recipe.ingredients.reduce((acc, ingredient) => {
    ingredient.name = normalizeString(ingredient.name);
    ingredient.quantity = Number(ingredient.quantity);
    if (ingredient.unit) ingredient.unit = ingredient.unit.trim();

    if (
      !ingredient.name ||
      isNaN(ingredient.quantity!) ||
      ingredient.quantity! <= 0
    )
      return acc;

    return [...acc, ingredient];
  }, [] as Ingredient[]);
  if (!recipe.ingredients.length)
    return "A recipe needs at least one ingredient";

  recipe.steps = recipe.steps.reduce((acc, step) => {
    step.description = step.description.trim();
    if (!step.description) return acc;
    return [...acc, step];
  }, [] as Step[]);
  if (!recipe.steps.length) return "A recipe needs at least one step";

  recipe.tags = recipe.tags.map((tag) => ({
    ...tag,
    name: normalizeString(tag.name),
  }));

  return null;
};

const createRecipe = (recipe: Recipe, authorId: string) => {
  return prisma.$transaction(
    async (tx) => {
      const newRecipe = await tx.recipe.create({
        data: {
          name: recipe.name,
          description: recipe.description,
          author: { connect: { id: authorId } },
          steps: {
            create: recipe.steps.map(({ description, order }) => ({
              description,
              order,
            })),
          },
          pictures: {
            create: recipe.pictures.map(({ url }) => ({
              url,
            })),
          },
        },
      });

      await tx.tag.createMany({
        data: recipe.tags.map(({ name }) => ({ name })),
        skipDuplicates: true,
      });
      const tags = await tx.tag.findMany({
        select: { id: true },
        where: { name: { in: recipe.tags.map(({ name }) => name) } },
      });
      await tx.recipeTag.createMany({
        data: tags.map((tag) => ({
          recipeId: newRecipe.id,
          tagId: tag.id,
        })),
      });

      await tx.ingredient.createMany({
        data: recipe.ingredients.map(({ name }) => ({ name })),
        skipDuplicates: true,
      });
      const ingredients = await tx.ingredient.findMany({
        select: { id: true, name: true },
        where: { name: { in: recipe.ingredients.map(({ name }) => name) } },
      });
      const mappedIngredients = recipe.ingredients.reduce((acc, ingredient) => {
        return { ...acc, [ingredient.name]: ingredient };
      }, {} as { [key: string]: Ingredient });
      await tx.recipeIngredient.createMany({
        data: ingredients.map((ingredient) => ({
          recipeId: newRecipe.id,
          ingredientId: ingredient.id,
          quantity: mappedIngredients[ingredient.name].quantity,
          unit: mappedIngredients[ingredient.name].unit,
        })),
      });

      return newRecipe;
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 10000, // default: 5000
    }
  );
};

export const POST = async (request: Request) => {
  const session = await getServerSession();
  if (!session?.user)
    return new Response("You are not authorized to create a recipe", {
      status: 401,
    });

  const user = await prisma.user.findUnique({
    select: { id: true },
    where: { email: session.user.email },
  });
  if (!user)
    return new Response("You are not authorized to create a recipe", {
      status: 401,
    });

  let pictureUrls;
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const jsonRecipe = formData.get("recipe") as string;
    let recipe;
    if (jsonRecipe) recipe = JSON.parse(jsonRecipe);
    if (!recipe) return new Response("Invalid recipe data", { status: 400 });

    const recipeError = checkRecipeHasError(recipe);
    if (recipeError) return new Response(recipeError, { status: 400 });
    pictureUrls = await uploadPictures(normalizeString(recipe.name), files);
    recipe.pictures = pictureUrls.map((url, i) => ({ id: `${i}`, url }));

    const newRecipe = await createRecipe(recipe, user.id);

    return new Response(JSON.stringify({ recipeId: newRecipe.id }), {
      status: 200,
    });
  } catch (error) {
    console.error({ error });
    if (pictureUrls) await del(pictureUrls);
    return new Response("Failed to create a new recipe", { status: 500 });
  }
};
