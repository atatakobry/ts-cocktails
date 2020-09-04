import React, { FC, useContext } from 'react';

import { TCocktail, TCocktails } from '../../types';

import { CocktailsContext } from '../../Cocktails';

import { CocktailsListItem } from '../CocktailsListItem/CocktailsListItem';

import styles from './CocktailsList.module.scss';

type CocktailsListProps = {
  cocktails: TCocktails;
};

const CocktailsListView: FC<CocktailsListProps> = ({ cocktails = [] }) => {
  return (
    <div className={styles.cocktails}>
      {cocktails.map((cocktail: TCocktail) => (
        <CocktailsListItem key={cocktail.idDrink} cocktail={cocktail} />
      ))}
    </div>
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
