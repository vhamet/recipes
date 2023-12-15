import { notFound } from "next/navigation";

import { cn, formatIngredient } from "@/lib/utils";
import { headingFont } from "@/lib/fonts";
import { fetchRecipe } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import RecipePicturesViewer from "@/app/recipes/[id]/_components/RecipePicturesViewer";

const RecipePage = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipe(params.id);
  if (!recipe) {
    notFound();
  }

  const url = recipe.pictures[0]?.url || "";

  return (
    <main className="max-w-3xl mx-auto flex flex-col items-center">
      <div
        style={{ "--image-url": `url(${url})` } as React.CSSProperties}
        className="w-full p-16 relative text-center bg-[image:var(--image-url)] bg-cover bg-center"
      >
        <div className="w-full h-full absolute top-0 left-0 z-[1] bg-gray-800 bg-opacity-50 blur-sm"></div>
        <div className="absolute top-1/2 left-1/2 z-[2] transform -translate-x-1/2 -translate-y-1/2">
          <h1 className={cn("text-5xl text-primary", headingFont.className)}>
            {recipe.name}
          </h1>
          <p className="text-xs">by {recipe.author!.username}</p>
        </div>
      </div>

      <div className="w-full pt-8 pb-16">
        {recipe.description && (
          <p className="w-full mb-2 text-sm whitespace-pre-wrap">
            {recipe.description}
          </p>
        )}

        <div className="mb-8 flex flex-wrap gap-x-2 gap-y-2">
          {recipe.tags.map((tag) => (
            <Badge key={tag.id} className="flex items-center gap-x-2">
              {tag.name}
            </Badge>
          ))}
        </div>

        <RecipePicturesViewer recipe={recipe} />

        <h2 className={cn("mt-4 mb-2 text-lg", headingFont.className)}>
          Ingredients
        </h2>
        <div className="mb-8 grid grid-cols-2">
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.id}>{formatIngredient(ingredient)}</div>
          ))}
        </div>

        <h2 className={cn("mb-2 text-lg", headingFont.className)}>Steps</h2>
        <div className="">
          {recipe.steps.map((step) => (
            <div key={step.id} className="flex gap-x-2 items-baseline">
              <label className="text-xs">{step.order}.</label>
              <p className="flex-grow whitespace-pre-wrap">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default RecipePage;
