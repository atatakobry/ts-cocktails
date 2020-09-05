import React, { FC, HTMLAttributes, useContext } from 'react';

import { TCocktailDetailed } from '../../../../entities/cocktails/types';

import { CocktailContext } from '../../Cocktail';

type CocktailDetailedProps = HTMLAttributes<HTMLElement> & {
  cocktail: TCocktailDetailed;
};

const CocktailDetailedView: FC<CocktailDetailedProps> = ({ cocktail }) => {
  return <pre>{JSON.stringify(cocktail, null, 2)}</pre>;
};

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
