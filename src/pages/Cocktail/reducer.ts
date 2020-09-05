import { TInitialState, TAction } from './types';
import { ActionTypes } from './actions';

export const initialState: TInitialState = {
  cocktail: {
    idDrink: '',
    strDrink: '',
    strDrinkThumb: '',
    strCategory: '',
    strIBA: '',
    strAlcoholic: '',
    strGlass: '',
    strInstructions: '',
  },
};

export const reducer = (state: TInitialState = initialState, action: TAction) => {
  switch (action.type) {
    case ActionTypes.setCocktail:
      return { ...state, cocktail: action.payload };
    default:
      throw new Error();
  }
};
