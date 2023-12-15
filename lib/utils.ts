import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Ingredient } from "@/lib/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const normalizeString = (s: string) => s.trim().toLowerCase();

export const capitalize = (s: string) =>
  (s && s[0].toUpperCase() + s.slice(1)) || "";

export const formatIngredient = ({ name, quantity, unit }: Ingredient) => {
  let amount = "";
  if (quantity && unit) amount = `${quantity} ${unit} `;
  else if (quantity) amount = `${quantity} `;
  else if (unit) amount = `${unit} `;

  return `${amount}${capitalize(name)}`;
};

export const wait = (delay = 500) =>
  new Promise<boolean>((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, delay)
  );
