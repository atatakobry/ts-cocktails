import React, { FC } from 'react';

type CocktailsGlassFilterProps = {
  options: Array<string> | undefined; // TODO: get rid of `undefined`?
};

export const CocktailsGlassFilter: FC<CocktailsGlassFilterProps> = ({ options = [] }) => {
  return (
    <div>
      <label>Choose a glass:</label>

      <select id="glasses">
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};
