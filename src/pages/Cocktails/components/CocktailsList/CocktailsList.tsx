import React, { FC, useContext } from 'react';

import { TCocktail, TCocktails } from '../../types';

import { CocktailsContext } from '../../Cocktails';

type CocktailsListProps = {
  cocktails: TCocktails;
};

const CocktailsListView: FC<CocktailsListProps> = ({ cocktails = [] }) => {
  return (
    <ul>
      {cocktails.map((cocktail: TCocktail) => (
        <li key={cocktail.idDrink}>{cocktail.strDrink}</li>
      ))}
    </ul>
  );
};

export const CocktailsList: FC = () => {
  const { state } = useContext(CocktailsContext);

  return (
    <div>
      {state.cocktails.length ? (
        <CocktailsListView cocktails={state.cocktails} />
      ) : (
        <div>Sorry, but there are no cocktails to show...</div>
      )}
    </div>
  );
};
