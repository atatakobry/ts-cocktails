import React, { FC, HTMLAttributes, useContext } from 'react';
import { compact, join } from 'lodash';

import { TCocktailDetailed } from '../../../../entities/cocktails/types';

import { CocktailContext } from '../../Cocktail';

import styles from './CocktailDetailed.module.scss';

type CocktailDetailedProps = {
  cocktail: TCocktailDetailed;
};

const CocktailDetailedView: FC<CocktailDetailedProps> = ({ cocktail }) => {
  return (
    <div className={styles.cocktailDetailed}>
      <img className={styles.thumbnail} src={cocktail?.strDrinkThumb} alt="" />

      <div>
        <div className={styles.title}>{cocktail?.strDrink}</div>
        <div className={styles.type}>
          {cocktail?.strCategory} &bull; {cocktail?.strAlcoholic}
        </div>
        <div className={styles.glass}>{cocktail?.strGlass}</div>
        <div className={styles.ingredients}>
          <div>Ingredients:</div>
          <div>
            {cocktail?.strIngredients.map(({ ingredient, measure }) => (
              <div key={ingredient}>
                {join(compact([ingredient, measure]), ', ')}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.instructions}>
          <div>Instructions:</div>
          <div>{cocktail?.strInstructions}</div>
        </div>
      </div>
    </div>
  );
};

// TODO: find da way how to use react's attrs more elegant
export const CocktailDetailed: FC<HTMLAttributes<HTMLElement>> = ({ className }) => {
  const { state } = useContext(CocktailContext);

  return (
    <div className={className}>
      {state.cocktail ? (
        <CocktailDetailedView cocktail={state.cocktail} />
      ) : (
        <div>Sorry, but there is no cocktail to show...</div>
      )}
    </div>
  );
};
