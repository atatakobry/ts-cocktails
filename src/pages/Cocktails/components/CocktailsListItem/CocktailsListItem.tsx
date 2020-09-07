import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { TCocktail } from '../../../../entities/cocktails/types';

import styles from './CocktailsListItem.module.scss';

type CocktailsListItemProps = {
  cocktail: TCocktail;
};

export const CocktailsListItem: FC<CocktailsListItemProps> = ({ cocktail }) => {
  return (
    <div className={styles.cocktail}>
      <img className={styles.thumbnail} src={cocktail?.strDrinkThumb} alt="" />
      <NavLink className={styles.title} to={`/cocktails/${cocktail?.idDrink}`}>{cocktail?.strDrink}</NavLink>
    </div>
  );
};
