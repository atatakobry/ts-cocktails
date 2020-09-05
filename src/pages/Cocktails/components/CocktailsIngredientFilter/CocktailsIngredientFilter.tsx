import React, { FC, HTMLAttributes, ChangeEvent } from 'react';

type CocktailsIngredientFilterProps = HTMLAttributes<HTMLElement> & {
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
        <option value=''>- empty -</option>
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
