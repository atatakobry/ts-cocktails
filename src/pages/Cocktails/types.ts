import { TCocktails } from '../../entities/cocktails/types';

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

export type TInitialState = {
  filtersOptions: TFiltersOptions;
  filtersValues: TFiltersValues;
  cocktails: TCocktails;
};
export type TAction = {
  type: string;
  payload?: any; // TODO: should be strict?
};