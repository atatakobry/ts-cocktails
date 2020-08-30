export type TFiltersOptions = {
  ingredients: Array<string>;
  glasses: Array<string>;
};

// TODO: describe more detailed
export type TFilterValue = object;

export type TFiltersValues = {
  ingredient: string;
  glass: string;
};

export type TCocktail = {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
};

export type TCocktails = Array<TCocktail>;
