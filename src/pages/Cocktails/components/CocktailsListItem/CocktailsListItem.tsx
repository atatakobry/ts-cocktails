import React, { FC } from 'react';

import { TCocktail } from '../../types';

import styles from './CocktailsListItem.module.scss';

type CocktailsListItemProps = {
  cocktail: TCocktail;
};

export const CocktailsListItem: FC<CocktailsListItemProps> = ({ cocktail: { strDrink, strDrinkThumb } }) => {
  return (
    <div className={styles.cocktail}>
      <img className={styles.thumbnail} src={strDrinkThumb} alt="" />
      <div className={styles.title}>{strDrink}</div>
    </div>
  );
};
