export type FormData = { [key: string]: string };

export type User = {
  id: string;
  username: string;
  image: string;
};

export type Tag = {
  id: string;
  name: string;
};

export type Step = {
  id: string;
  order: number;
  description: string;
};

export type Ingredient = {
  id: string;
  name: string;
  quantity?: number;
  unit?: string;
};

export type Recipe = {
  name: string;
  description?: string;
  author?: User;
  ingredients: Ingredient[];
  steps: Step[];
  tags: Tag[];
};
