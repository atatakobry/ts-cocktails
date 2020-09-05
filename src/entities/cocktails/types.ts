export type TIdDrink = string;

export type TCocktail = {
  idDrink: TIdDrink;
  strDrink: string;
  strDrinkThumb: string;
};

export type TCocktailDetailed = TCocktail & {
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
};

export type TCocktails = Array<TCocktail>;