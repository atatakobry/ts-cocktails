import React, { FC, ChangeEvent } from 'react';

import { TGlass, TGlasses } from '../../../../entities/glasses/types';
import { TFilterValue } from '../../types';

type CocktailsGlassFilterProps = {
  options: TGlasses;
  value: TGlass;
  onChange: (filterValue: TFilterValue) => void;
};

export const CocktailsGlassFilter: FC<CocktailsGlassFilterProps> = ({
  options = [],
  value = '',
  onChange = () => {},
}) => {
  return (
    <div>
      <label>Choose a glass: </label>
      <select value={value} onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange({ glass: e.target.value })}>
        <option value="">- empty -</option>
        {options.map((option: TGlass) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
