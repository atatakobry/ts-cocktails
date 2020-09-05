import { TCocktailDetailed } from '../../entities/cocktails/types';

export type TInitialState = {
  cocktail: TCocktailDetailed;
};
export type TAction = {
  type: string;
  payload?: any; // TODO: should be strict?
};