"use client";

import { useState } from "react";
import Link from "next/link";

import Button, { buttonVariants } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import IngredientsForm from "@/app/recipes/create/_components/IngredientsForm";
import TagsForm from "@/app/recipes/create/_components/TagsForm";
import StepsForm from "@/app/recipes/create/_components/StepsForm";
import { Ingredient, Recipe, Step, Tag } from "@/lib/types";
import Loader from "@/components/Loader";

type CreateFormProps = {
  onSubmit: (data: Recipe) => void;
  submitting: boolean;
};

type Errors = {
  name?: string;
  description?: string;
  ingredients?: string;
  steps?: string;
};

const CreateForm = ({ onSubmit, submitting }: CreateFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const addIngredient = (ingredient: Ingredient) =>
    setIngredients([...ingredients, ingredient]);
  const removeIngredient = (ingredient: Ingredient) =>
    setIngredients(ingredients.filter((i) => i.id !== ingredient.id));

  const [steps, setSteps] = useState<Step[]>([]);
  const addStep = (step: Step) => setSteps([...steps, step]);
  const removeStep = (step: Step) =>
    setSteps(
      steps.reduce(
        (acc, s) =>
          s.id === step.id ? acc : [...acc, { ...s, order: acc.length + 1 }],
        [] as Step[]
      )
    );

  const [tags, setTags] = useState<Tag[]>([]);
  const addTag = (tag: Tag) => setTags([...tags, tag]);
  const removeTag = (tag: Tag) => setTags(tags.filter((t) => t.id !== tag.id));

  const handleSubmit = () => {
    setErrors({});
    if (!name)
      setErrors((curr) => ({ ...curr, name: "You must name your recipe" }));
    if (!ingredients.length)
      setErrors((curr) => ({
        ...curr,
        ingredients: "Add at least one ingredient",
      }));
    if (!steps.length)
      setErrors((curr) => ({ ...curr, steps: "Add at least one step" }));

    if (Object.keys(errors).length) return;

    onSubmit({ name, description, ingredients, steps, tags });
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full sm:w-[600px] p-2 sm:p-4  mobile-only:border-0">
        <CardContent className="pt-8 grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="name"
              className="flex items-baseline justify-between"
            >
              Name
              {errors.name && (
                <label className="text-xs text-red-800">{errors.name}</label>
              )}
            </Label>
            <Input
              id="name"
              placeholder="What are we cooking ?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={submitting}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Tell me more"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
            />
          </div>
          <br />

          <IngredientsForm
            ingredients={ingredients}
            onAddIngredient={addIngredient}
            onRemoveIngredient={removeIngredient}
            error={errors.ingredients}
            disabled={submitting}
          />
          <br />
          <StepsForm
            steps={steps}
            onAddStep={addStep}
            onRemoveStep={removeStep}
            error={errors.steps}
            disabled={submitting}
          />
          <br />
          <TagsForm
            tags={tags}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            disabled={submitting}
          />
        </CardContent>

        <CardFooter className="flex justify-end gap-x-4">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Cancel
          </Link>
          <Button
            onClick={handleSubmit}
            className="w-[94px]"
            disabled={submitting}
          >
            {submitting ? <Loader /> : "Let's go !"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateForm;
