import axios from 'axios';
import { compact, transform, isArray } from 'lodash';

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
interface IIngredient {
  strIngredient1: string;
}
interface IGlass {
  strGlass: string;
}
interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const fetchIngredients = () => {
  return axios
    .get(`${url}/list.php?i=list`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<IIngredient>>) =>
      compact(
        transform(
          response.data.drinks,
          (ingredients: Array<string>, item: IIngredient) => ingredients.push(item.strIngredient1),
          []
        )
      )
    );
};

const fetchGlasses = () => {
  return axios
    .get(`${url}/list.php?g=list`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<IGlass>>) =>
      compact(
        transform(
          response.data.drinks,
          (ingredients: Array<string>, item: IGlass) => ingredients.push(item.strGlass),
          []
        )
      )
    );
};

const fetchCocktails = (filtersValues: TFiltersValues) => {
  return axios
    .get(`${url}/filter.php?i=${filtersValues.ingredient}`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<ICocktail>>) => (isArray(response.data.drinks) ? response.data.drinks : []));
};

export const API = {
  fetchIngredients,
  fetchGlasses,
  fetchCocktails,
};
