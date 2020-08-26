import React, { useState, useEffect } from 'react';

import { API } from '../../services/API';

export const Cocktails = () => {
  const [dictionaries, setDictionaries] = useState({
    ingredients: [],
    glasses: [],
  });

  const fetchDictionaries = () => {
    Promise.all([
      API.fetchIngredients(),
      API.fetchGlasses(),
    ]).then(([ingredients, glasses]) =>
      setDictionaries({ ingredients, glasses })
    );
  };

  useEffect(() => {
    fetchDictionaries();
  }, []);
  return <pre>{JSON.stringify(dictionaries, null, 2)}</pre>;
};
