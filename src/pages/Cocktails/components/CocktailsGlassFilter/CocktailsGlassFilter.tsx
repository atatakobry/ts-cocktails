import React, { FC, ChangeEvent } from 'react';

type CocktailsGlassFilterProps = {
  options: Array<string>;
  value: string;
  onChange: (filterValue: object) => void;
};

export const CocktailsGlassFilter: FC<CocktailsGlassFilterProps> = ({
  options = [],
  value = '',
  onChange = () => {},
}) => {
  return (
    <div>
      <label>Choose a glass: </label>
      <select value={value} placeholder="ASD" onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ glass: e.target.value })}>
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
