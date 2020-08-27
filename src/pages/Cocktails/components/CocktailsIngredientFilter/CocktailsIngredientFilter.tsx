import React, { FC } from 'react';

type CocktailsIngredientFilterProps = {
  options: Array<string> | undefined; // TODO: get rid of `undefined`?
};

export const CocktailsIngredientFilter: FC<CocktailsIngredientFilterProps> = ({ options = [] }) => {
  return (
    <div>
      <label>Choose an ingredient:</label>

      <select id="ingredients">
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
