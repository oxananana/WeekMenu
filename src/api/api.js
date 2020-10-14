import * as firebase from "firebase/app";
import "firebase/database";
import categoriesAPI from "./categoriesAPI";
import recipesAPI from "./recipesAPI";
import menuAPI from "./menuAPI";

const api = {
  getInitialData() {
    let newData = { categories: null, recipes: null, menu: null };

    const categoriesPromise = categoriesAPI.getCategories().then((response) => {
      newData.categories = response;
    });

    const recipesPromise = recipesAPI.getRecipes().then((response) => {
      newData.recipes = response;
    });

    const menuPromise = menuAPI.getMenu().then((response) => {
      newData.menu = response;
    });

    return Promise.all([categoriesPromise, recipesPromise, menuPromise]).then(
      () => {
        return newData;
      }
    );
  },
};

export default api;
