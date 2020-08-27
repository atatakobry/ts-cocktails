import React, { FC } from 'react';

import { CocktailsContext } from '../../Cocktails';
import { CocktailsIngredientFilter } from '../CocktailsIngredientFilter/CocktailsIngredientFilter';
import { CocktailsGlassFilter } from '../CocktailsGlassFilter/CocktailsGlassFilter';

export const CocktailsFilters: FC = () => {
  return (
    <div>
      <CocktailsContext.Consumer>
        {({ ingredients }) => <CocktailsIngredientFilter options={ingredients} />}
      </CocktailsContext.Consumer>
      <CocktailsContext.Consumer>
        {({ glasses }) => <CocktailsGlassFilter options={glasses} />}
      </CocktailsContext.Consumer>
    </div>
  );
};
