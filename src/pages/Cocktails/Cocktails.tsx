import React, { useReducer, useEffect, createContext } from 'react';

import { API } from '../../services/API';

import { TInitialState, TAction } from './types';
import { ActionTypes } from './actionTypes';
import { initialState, reducer } from './reducer';

import { CocktailsFilters } from './components/CocktailsFilters/CocktailsFilters';
import { CocktailsList } from './components/CocktailsList/CocktailsList';

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
    Promise.all([API.fetchIngredients(), /* API.fetchGlasses() */]).then(([ingredients, glasses]) =>
      dispatch({
        type: ActionTypes.setFilterOptions,
        payload: { ingredients, glasses },
      })
    );
  };

  useEffect(fetchFiltersOptions, []);
  // TODO: optimize (use memo or separate contexts)
  return (
    <CocktailsContext.Provider value={{ state, dispatch }}>
      <CocktailsFilters />
      <CocktailsList />
    </CocktailsContext.Provider>
  );
};
