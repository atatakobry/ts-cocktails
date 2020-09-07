import axios from 'axios';
import { compact, transform, pick, map, isArray } from 'lodash';

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
// TODO: find da way to describe such dynamic fields as `strIngredient1`, `strIngredient2`, etc.
interface ICocktailDetailed extends ICocktail {
  strCategory: string;
  strAlcoholic: string;
  strGlass: string;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
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
