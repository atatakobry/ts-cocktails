import React, { useReducer, useEffect, createContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { API } from '../../services/API';

import { TInitialState, TAction } from './types';
import { ActionTypes } from './actions';
import { initialState, reducer } from './reducer';

import { CocktailDetailed } from './components/CocktailDetailed/CocktailDetailed';

import styles from './Cocktail.module.scss';

export const CocktailContext = createContext<{
  state: TInitialState;
  dispatch: (action: TAction) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

export const Cocktail = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { idDrink } = useParams();

  const fetchCocktail = () => {
    API.fetchCocktail(idDrink).then((cocktailDetailed) =>
      dispatch({
        type: ActionTypes.setCocktail,
        payload: cocktailDetailed,
      })
    );
  };

  useEffect(fetchCocktail, []);
  // TODO: optimize (use memo or separate contexts)
  return (
    <CocktailContext.Provider value={{ state, dispatch }}>
      <NavLink to="/cocktails">&larr; Back</NavLink>
      <CocktailDetailed className={styles.cocktailDetailed} />
    </CocktailContext.Provider>
  );
};
