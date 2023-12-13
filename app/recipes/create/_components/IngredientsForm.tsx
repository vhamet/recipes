import React, { FormEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DeleteTrashIcon from "@/components/DeleteTrashIcon";
import { formatIngredient, normalizeString } from "@/lib/utils";
import { Ingredient } from "@/lib/types";

type IngredientsFormProps = {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredient: Ingredient) => void;
  error?: string;
};

const IngredientsForm = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  error,
}: IngredientsFormProps) => {
  const ingredientForm = useRef<HTMLFormElement>(null);
  const ingredientNameInput = useRef<HTMLInputElement>(null);
  const [ingredientError, setIngredientError] = useState("");

  const addIngredient = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIngredientError("");

    const formData = Object.fromEntries(
      new FormData(event.currentTarget)
    ) as unknown as Ingredient;

    formData.name = normalizeString(formData.name, "plural");
    if (!formData.name) {
      setIngredientError("Ingredient must have a name");
      return;
    }

    ingredientForm.current?.reset();
    ingredientNameInput.current?.focus();
    onAddIngredient({ ...formData, id: Date.now() });
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <Label className="flex items-baseline justify-between">
        Ingredients{" "}
        {(ingredientError || error) && (
          <label className="text-xs text-red-800">
            {error || ingredientError}
          </label>
        )}
      </Label>
      <form
        ref={ingredientForm}
        className="flex items-center gap-x-2"
        onSubmit={addIngredient}
      >
        <Input ref={ingredientNameInput} name="name" placeholder="Name" />
        <Input
          name="quantity"
          type="number"
          step=".01"
          placeholder="Quantity"
        />
        <Input name="unit" placeholder="Unit" />
        <Button type="submit">
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </form>
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="flex items-center gap-x-2">
          <DeleteTrashIcon
            className="text-xs"
            handleClick={() => onRemoveIngredient(ingredient)}
          />
          <label className="text-xs">{formatIngredient(ingredient)}</label>
        </div>
      ))}
    </div>
  );
};

export default IngredientsForm;
