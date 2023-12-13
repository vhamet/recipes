export type FormData = { [key: string]: string };

export type Tag = {
  id: number;
  name: string;
};

export type Step = {
  id: number;
  order: number;
  description: string;
};

export type Ingredient = {
  id: number;
  name: string;
  quantity?: number;
  unit?: string;
};

export type Recipe = {
  name: string;
  description?: string;
  ingredients: Ingredient[];
  steps: Step[];
  tags: Tag[];
};
