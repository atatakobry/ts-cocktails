import React, { FC, useContext } from 'react';

import { TCocktailDetailed } from '../../../../entities/cocktails/types';

import { CocktailContext } from '../../Cocktail';

type CocktailDetailedProps = {
  cocktail: TCocktailDetailed;
};

const CocktailDetailedView: FC<CocktailDetailedProps> = ({ cocktail }) => {
  return <pre>{JSON.stringify(cocktail, null, 2)}</pre>;
};

export const CocktailDetailed: FC = () => {
  const { state } = useContext(CocktailContext);

  return (
    <div>
      <CocktailDetailedView cocktail={state.cocktail} />
    </div>
  );
};
