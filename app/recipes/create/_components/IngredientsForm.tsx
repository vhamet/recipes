import React, { FormEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import DeleteTrashIcon from "@/components/DeleteTrashIcon";
import { formatIngredient, normalizeString } from "@/lib/utils";
import { Ingredient } from "@/lib/types";

type IngredientsFormProps = {
  ingredients: Ingredient[];
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredient: Ingredient) => void;
  disabled: boolean;
  error?: string;
};

const IngredientsForm = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  disabled,
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

    formData.name = normalizeString(formData.name);
    if (!formData.name) {
      setIngredientError("Ingredient must have a name");
      return;
    }

    ingredientForm.current?.reset();
    ingredientNameInput.current?.focus();
    onAddIngredient({ ...formData, id: Date.now().toString() });
  };

  return (
    <div className="flex flex-col space-y-1.5">
      <h2 className="flex items-baseline justify-between">
        Ingredients{" "}
        {(ingredientError || error) && (
          <label className="text-xs text-red-800">
            {error || ingredientError}
          </label>
        )}
      </h2>
      <form
        ref={ingredientForm}
        className="flex items-center gap-x-2"
        onSubmit={addIngredient}
      >
        <Input
          ref={ingredientNameInput}
          name="name"
          placeholder="Name"
          disabled={disabled}
        />
        <Input
          name="quantity"
          type="number"
          step=".01"
          placeholder="Quantity"
          disabled={disabled}
        />
        <Input name="unit" placeholder="Unit" disabled={disabled} />
        <Button type="submit" disabled={disabled}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </form>
      {ingredients.map((ingredient) => (
        <div key={ingredient.id} className="flex items-center gap-x-2">
          <DeleteTrashIcon
            className="text-xs"
            handleClick={() => onRemoveIngredient(ingredient)}
            disabled={disabled}
          />
          <label className="text-xs">{formatIngredient(ingredient)}</label>
        </div>
      ))}
    </div>
  );
};

export default IngredientsForm;
