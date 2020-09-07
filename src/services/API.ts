import axios from 'axios';
import { compact, transform, pick, map, isArray } from 'lodash';

import { IIngredient } from '../entities/ingredients/interfaces';
import { IGlass } from '../entities/glasses/interfaces';
import { ICocktail, ICocktailDetailed } from '../entities/cocktails/interfaces';

import { TIngredients } from '../entities/ingredients/types';
import { TGlasses } from '../entities/glasses/types';
import { TIdDrink, TCocktailDetailed, TCocktails } from '../entities/cocktails/types';
import { TFiltersValues } from '../pages/Cocktails/types';

const host = 'the-cocktail-db.p.rapidapi.com';
const key = '26f7bfa6eemsh64d29e32a9df91ap1ac7f1jsn1ef195db90ed';
const url = `https://${host}`;

interface IResponse<T> {
  data: T;
}

interface IDrinks<T> {
  drinks: Array<T>;
}

const getIngredients: (rawIngredients: Array<IIngredient>) => [] | TIngredients = (rawIngredients) => {
  const ingredients = compact(
    transform(
      rawIngredients,
      (ingredients: TIngredients, item: IIngredient) => ingredients.push(item.strIngredient1),
      []
    )
  );

  return ingredients;
};

const fetchIngredients: () => Promise<[] | TIngredients> = () => {
  return axios
    .get(`${url}/list.php?i=list`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<IIngredient>>) => getIngredients(response.data.drinks));
};

const getGlasses: (rawGlasses: Array<IGlass>) => [] | TGlasses = (rawGlasses) => {
  const glasses: TGlasses = compact(
    transform(rawGlasses, (glasses: TGlasses, item: IGlass) => glasses.push(item.strGlass), [])
  );

  return glasses;
};

const fetchGlasses: () => Promise<[] | TGlasses> = () => {
  return axios
    .get(`${url}/list.php?g=list`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<IGlass>>) => getGlasses(response.data.drinks));
};

const getCocktails: (rawCocktails: Array<ICocktail>) => [] | TCocktails = (rawCocktails) => {
  const cocktails = map(rawCocktails, (rawCocktail: ICocktail) =>
    pick(rawCocktail, ['idDrink', 'strDrink', 'strDrinkThumb'])
  );

  return cocktails;
};

const fetchCocktails: (filtersValues: TFiltersValues) => Promise<[] | TCocktails> = (filtersValues) => {
  return axios
    .get(`${url}/filter.php?i=${filtersValues.ingredient}`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<ICocktail>>) =>
      isArray(response.data.drinks) ? getCocktails(response.data.drinks) : []
    );
};

const getCocktail: (rawCocktail: ICocktailDetailed) => TCocktailDetailed = (rawCocktail) => {
  const cocktail: TCocktailDetailed = {
    ...pick(rawCocktail, [
      'idDrink',
      'strDrink',
      'strDrinkThumb',
      'strCategory',
      'strAlcoholic',
      'strGlass',
      'strInstructions',
    ]),
    strIngredients: [],
  };

  for (let i = 1; i <= 15; i++) {
    const ingredient: string = (rawCocktail as any)[`strIngredient${i}`];

    if (ingredient) {
      const measure: string = (rawCocktail as any)[`strMeasure${i}`];

      cocktail.strIngredients.push({ ingredient, measure });
    }
  }

  return cocktail;
};

const fetchCocktail: (idDrink: TIdDrink) => Promise<null | TCocktailDetailed> = (idDrink) => {
  return axios
    .get(`${url}/lookup.php?i=${idDrink}`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<ICocktailDetailed>>) =>
      isArray(response.data.drinks) ? getCocktail(response.data.drinks[0]) : null
    );
};

export const API = {
  fetchIngredients,
  fetchGlasses,
  fetchCocktails,
  fetchCocktail,
};
