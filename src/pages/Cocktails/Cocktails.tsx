import React, { useEffect, createContext } from 'react';

import { API } from '../../services/API';

import { CocktailsFilters } from './components/CocktailsFilters/CocktailsFilters';

type TCocktailsFiltersOptions = {
  ingredients: Array<string>;
  glasses: Array<string>;
};

export const CocktailsContext = createContext<Partial<TCocktailsFiltersOptions>>({});

export const Cocktails = () => {
  let cocktailsFiltersOptions: TCocktailsFiltersOptions = {
    ingredients: [],
    glasses: [],
  };

  const fetchFiltersOptions = () => {
    Promise.all([API.fetchIngredients(), API.fetchGlasses()]).then(([ingredients, glasses]) => {
      cocktailsFiltersOptions = { ...cocktailsFiltersOptions, ingredients, glasses };
    });
  };

  useEffect(() => {
    fetchFiltersOptions();
  });

  return (
    <CocktailsContext.Provider value={cocktailsFiltersOptions}>
      <CocktailsFilters />
    </CocktailsContext.Provider>
  );
};
