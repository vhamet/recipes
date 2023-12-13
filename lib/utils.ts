import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import pluralize from "pluralize";

import { Ingredient } from "@/lib/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatIngredient = ({ name, quantity, unit }: Ingredient) => {
  let amount = "";
  if (quantity && unit) amount = ` (${quantity} ${unit})`;
  else if (quantity || unit) amount = ` (${quantity}${unit})`;

  return `${normalizeString(name, "plural")}${amount}`;
};

export type PluralizeOptions = "singular" | "plural";
export const normalizeString = (
  s: string,
  pluralizeOptions?: PluralizeOptions
) => {
  const normalized = s.trim().toLowerCase();
  switch (pluralizeOptions) {
    case "singular":
      return pluralize.singular(normalized);
    case "plural":
      return pluralize.plural(normalized);
    default:
      return normalized;
  }
};

export const capitalize = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";
