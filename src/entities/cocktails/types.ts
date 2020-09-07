export type TIdDrink = string;

export type TCocktail = null | {
  idDrink: TIdDrink;
  strDrink: string;
  strDrinkThumb: string;
};

export type TCocktailDetailed =
  | null
  | (TCocktail & {
      strCategory: string;
      strAlcoholic: string;
      strGlass: string;
      strInstructions: string;
      strIngredients: Array<{
        ingredient: string;
        measure: string;
      }>;
    });

export type TCocktails = Array<TCocktail>;
