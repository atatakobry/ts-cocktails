import { TInitialState, TAction } from './types';
import { ActionTypes } from './actionTypes';

export const initialState: TInitialState = {
  cocktail: null,
};

export const reducer = (state: TInitialState = initialState, action: TAction) => {
  switch (action.type) {
    case ActionTypes.setCocktail:
      return { ...state, cocktail: action.payload };
    default:
      throw new Error();
  }
};
