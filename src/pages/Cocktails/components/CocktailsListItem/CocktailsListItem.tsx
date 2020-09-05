import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { TCocktail } from '../../../../entities/cocktails/types';

import styles from './CocktailsListItem.module.scss';

type CocktailsListItemProps = {
  cocktail: TCocktail;
};

export const CocktailsListItem: FC<CocktailsListItemProps> = ({ cocktail: { idDrink, strDrink, strDrinkThumb } }) => {
  return (
    <div className={styles.cocktail}>
      <img className={styles.thumbnail} src={strDrinkThumb} alt="" />
      <NavLink className={styles.title} to={`/cocktails/${idDrink}`}>{strDrink}</NavLink>
    </div>
  );
};
