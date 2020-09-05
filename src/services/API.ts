import axios from 'axios';
import { compact, transform, pick, first, isArray } from 'lodash';

import { TIdDrink } from '../entities/cocktails/types';
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
// TODO: try to unify and connect interfaces/types for equal entities
interface ICocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}
// TODO: find da way to describe such dynamic fields as `strIngredient1`, `strIngredient2`, etc.
interface ICocktailDetailed extends ICocktail {
  strCategory: string;
  strIBA: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
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

const fetchCocktail = (idDrink: TIdDrink) => {
  return axios
    .get(`${url}/lookup.php?i=${idDrink}`, {
      headers: {
        'x-rapidapi-host': host,
        'x-rapidapi-key': key,
      },
    })
    .then((response: IResponse<IDrinks<ICocktailDetailed>>) =>
      isArray(response.data.drinks)
        ? pick(
            first(response.data.drinks),
            // TODO: get keys with some interface transformer
            [
              'idDrink',
              'strDrink',
              'strDrinkThumb',
              'strCategory',
              'strIBA',
              'strAlcoholic',
              'strGlass',
              'strInstructions',
            ]
          )
        : null
    );
};

export const API = {
  fetchIngredients,
  fetchGlasses,
  fetchCocktails,
  fetchCocktail,
};
