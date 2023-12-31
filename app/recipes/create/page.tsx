"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import CreateForm from "@/app/recipes/create/_components/Form";
import { headingFont } from "@/lib/fonts";
import { cn, wait } from "@/lib/utils";
import { Recipe } from "@/lib/types";

const CreateRecipePage = () => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (recipe: Recipe) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      for (const { file } of recipe.picturesUpload!) {
        formData.append("files", file);
      }
      delete recipe.picturesUpload;
      formData.append("recipe", JSON.stringify(recipe));

      const response = await fetch("/api/recipe/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/recipes/${data.recipeId}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-16 flex flex-col items-center">
      <h1 className={cn("text-3xl text-primary", headingFont.className)}>
        Share your recipe
      </h1>
      <p className="mb-8 text-sm">Better be good</p>

      <CreateForm onSubmit={handleSubmit} submitting={submitting} />
    </main>
  );
};

export default CreateRecipePage;
