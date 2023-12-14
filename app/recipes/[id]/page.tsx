import { notFound } from "next/navigation";

import { cn, formatIngredient } from "@/lib/utils";
import { headingFont } from "@/lib/fonts";
import { fetchRecipe } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

const RecipePage = async ({ params }: { params: { id: string } }) => {
  const recipe = await fetchRecipe(params.id);
  if (!recipe) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center">
      <div className="w-full p-16 text-center">
        <h1 className={cn("text-5xl text-primary", headingFont.className)}>
          {recipe.name}
        </h1>
        <p className="text-xs">by {recipe.author!.username}</p>
      </div>

      <div className="w-full p-16 pt-0">
        {recipe.description && (
          <p className="w-full mb-8 text-sm whitespace-pre-wrap">
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

        <h2 className={cn("mb-4 text-lg", headingFont.className)}>
          Ingredients
        </h2>
        <div className="mb-8 grid grid-cols-2">
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.id}>{formatIngredient(ingredient)}</div>
          ))}
        </div>

        <h2 className={cn("mb-4 text-lg", headingFont.className)}>Steps</h2>
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
