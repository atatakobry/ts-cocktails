import React, { useReducer, useEffect, createContext } from 'react';

import { API } from '../../services/API';

import { TFiltersOptions, TFiltersValues, TCocktails } from './types';

import { CocktailsFilters } from './components/CocktailsFilters/CocktailsFilters';
import { CocktailsList } from './components/CocktailsList/CocktailsList';

type TInitialState = {
  filtersOptions: TFiltersOptions;
  filtersValues: TFiltersValues;
  cocktails: TCocktails;
};

type TAction = {
  type: string;
  payload?: any; // TODO: should be strict?
};

const initialState: TInitialState = {
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

const reducer = (state: TInitialState = initialState, action: TAction) => {
  switch (action.type) {
    case 'SET_FILTERS_OPTIONS':
      return { ...state, filtersOptions: action.payload };
    case 'SET_FILTER_VALUE':
      return { ...state, filtersValues: { ...state.filtersValues, ...action.payload } };
    case 'SET_COCKTAILS':
      return { ...state, cocktails: action.payload };
    default:
      throw new Error();
  }
};

export const CocktailsContext = createContext<{
  state: TInitialState;
  dispatch: (action: TAction) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

export const Cocktails = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchFiltersOptions = () => {
    Promise.all([API.fetchIngredients(), API.fetchGlasses()]).then(([ingredients, glasses]) =>
      dispatch({
        type: 'SET_FILTERS_OPTIONS',
        payload: { ingredients, glasses },
      })
    );
  };

  useEffect(() => {
    fetchFiltersOptions();
  }, []);
  // TODO: optimize (use memo or separate contexts)
  return (
    <CocktailsContext.Provider value={{ state, dispatch }}>
      <CocktailsFilters />
      <CocktailsList />
    </CocktailsContext.Provider>
  );
};
