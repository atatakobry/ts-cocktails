import React, { FC, ChangeEvent } from 'react';

import { TIngredient, TIngredients } from '../../../../entities/ingredients/types';
import { TFilterValue } from '../../types';

type CocktailsIngredientFilterProps = {
  options: TIngredients;
  value: TIngredient;
  onChange: (filterValue: TFilterValue) => void;
};

export const CocktailsIngredientFilter: FC<CocktailsIngredientFilterProps> = ({
  options = [],
  value = '',
  onChange = () => {},
}) => {
  return (
    <div>
      <label>Choose an ingredient: </label>
      <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ ingredient: e.target.value })}>
        <option value="">- empty -</option>
        {options.map((option: TIngredient) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
