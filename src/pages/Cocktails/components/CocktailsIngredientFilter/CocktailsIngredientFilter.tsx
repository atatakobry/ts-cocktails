import React, { FC, ChangeEvent } from 'react';

type CocktailsIngredientFilterProps = {
  options: Array<string>;
  value: string;
  onChange: (filterValue: object) => void;
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
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
