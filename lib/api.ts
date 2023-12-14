import prisma from "@/lib/prisma";
import { Recipe, User } from "@/lib/types";

type DbRecipe = {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
} & {
  author: {
    id: string;
    username: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    image: string;
  };
  ingredients: ({
    ingredient: {
      id: string;
      name: string;
    };
  } & {
    recipeId: string;
    ingredientId: string;
    quantity: number | null;
    unit: string | null;
    createdAt: Date;
    updatedAt: Date;
  })[];
  steps: {
    id: string;
    order: number;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    recipeId: string;
  }[];
  tags: ({
    tag: {
      id: string;
      name: string;
    };
  } & {
    recipeId: string;
    tagId: string;
    createdAt: Date;
    updatedAt: Date;
  })[];
};

const parseRecipe = (recipe: DbRecipe) => {
  const { id, name, description, author, ingredients, steps, tags } = recipe;
  return {
    id,
    name,
    description,
    author,
    ingredients: ingredients.map(
      ({ ingredient: { id, name }, quantity, unit }) => ({
        id,
        name,
        quantity,
        unit,
      })
    ),
    steps: steps.map(({ id, order, description }) => ({
      id,
      order,
      description,
    })),
    tags: tags.map(({ tag: { id, name } }) => ({ id, name })),
  } as Recipe;
};

export const fetchRecipe = async (recipeId: string) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      author: true,
      ingredients: {
        include: {
          ingredient: { select: { id: true, name: true } },
        },
      },
      steps: true,
      tags: {
        include: {
          tag: { select: { id: true, name: true } },
        },
      },
    },
  });
  if (!recipe) return null;

  return parseRecipe(recipe);
};
