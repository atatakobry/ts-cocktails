import { TInitialState, TAction } from './types';
import { ActionTypes } from './actions';

export const initialState: TInitialState = {
  filtersOptions: {
    ingredients: [],
    glasses: [],
  },
  filtersValues: {
    ingredient: '',
    glass: '',
  },
  cocktails: [],
};

export const reducer = (state: TInitialState = initialState, action: TAction) => {
  switch (action.type) {
    case ActionTypes.setFilterOptions:
      return { ...state, filtersOptions: action.payload };
    case ActionTypes.setFilterValue:
      return { ...state, filtersValues: { ...state.filtersValues, ...action.payload } };
    case ActionTypes.setCocktails:
      return { ...state, cocktails: action.payload };
    default:
      throw new Error();
  }
};
