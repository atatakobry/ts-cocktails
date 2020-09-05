import React, { FC, HTMLAttributes, useContext } from 'react';

import { API } from '../../../../services/API';

import { TFilterValue, TFiltersValues } from '../../types';
import { ActionTypes } from '../../actions';

import { CocktailsContext } from '../../Cocktails';

import { CocktailsIngredientFilter } from '../CocktailsIngredientFilter/CocktailsIngredientFilter';
// import { CocktailsGlassFilter } from '../CocktailsGlassFilter/CocktailsGlassFilter';

export const CocktailsFilters: FC<HTMLAttributes<HTMLElement>> = () => {
  const { state, dispatch } = useContext(CocktailsContext);

  const changeFilterValue = (filterValue: TFilterValue) => {
    dispatch({ type: ActionTypes.setFilterValue, payload: filterValue });
  };

  const fetchCocktails = (filtersValues: TFiltersValues) => {
    API.fetchCocktails(filtersValues).then((cocktails) =>
      dispatch({
        type: ActionTypes.setCocktails,
        payload: cocktails,
      })
    );
  };

  return (
    <div>
      <CocktailsIngredientFilter
        options={state.filtersOptions.ingredients}
        value={state.filtersValues.ingredient}
        onChange={changeFilterValue}
      />

      {/* <CocktailsGlassFilter
        options={state.filtersOptions.glasses}
        value={state.filtersValues.glass}
        onChange={changeFilterValue}
      /> */}

      <p>
        <button disabled={!state.filtersValues.ingredient} onClick={() => fetchCocktails(state.filtersValues)}>
          Get cocktails by ingredient
        </button>
      </p>
    </div>
  );
};
