import axios from 'axios';
import { compact, transform } from 'lodash';

const fetchIngredients = () => {
  interface IResponse {
    data: {
      drinks: Array<IResponseItem>;
    };
  }
  interface IResponseItem {
    strIngredient1: string;
  }

  return axios
    .get('https://the-cocktail-db.p.rapidapi.com/list.php?i=list', {
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '26f7bfa6eemsh64d29e32a9df91ap1ac7f1jsn1ef195db90ed',
      },
    })
    .then((response: IResponse) =>
      compact(
        transform(
          response.data.drinks,
          (ingredients: Array<string>, item: IResponseItem) =>
            ingredients.push(item.strIngredient1),
          []
        )
      )
    );
};

const fetchGlasses = () => {
  interface IResponse {
    data: {
      drinks: Array<IResponseItem>;
    };
  }
  interface IResponseItem {
    strGlass: string;
  }

  return axios
    .get('https://the-cocktail-db.p.rapidapi.com/list.php?g=list', {
      headers: {
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
        'x-rapidapi-key': '26f7bfa6eemsh64d29e32a9df91ap1ac7f1jsn1ef195db90ed',
      },
    })
    .then((response: IResponse) =>
      compact(
        transform(
          response.data.drinks,
          (ingredients: Array<string>, item: IResponseItem) =>
            ingredients.push(item.strGlass),
          []
        )
      )
    );
};

export const API = {
  fetchIngredients,
  fetchGlasses,
};
