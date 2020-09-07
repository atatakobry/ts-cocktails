import { TIngredient, TIngredients } from '../../entities/ingredients/types';
import { TGlass, TGlasses } from '../../entities/glasses/types';
import { TCocktails } from '../../entities/cocktails/types';

export type TFiltersOptions = {
  ingredients: TIngredients;
  glasses: TGlasses;
};
export type TFilterValue =
  | {
      ingredient: TIngredient;
    }
  | {
      glass: TGlass;
    };

export type TFiltersValues = {
  ingredient: TIngredient;
  glass: TGlass;
};

export type TInitialState = {
  filtersOptions: TFiltersOptions;
  filtersValues: TFiltersValues;
  cocktails: TCocktails;
};
export type TAction = {
  type: string;
  payload?: any; // TODO: should be strict?
};
