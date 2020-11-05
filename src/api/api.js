import categoriesAPI from "./categoriesAPI";
import recipesAPI from "./recipesAPI";
import menuAPI from "./menuAPI";

const api = {
  getInitialData() {
    return Promise.all([
      menuAPI.getMenu(),
      categoriesAPI.getCategories(),
      recipesAPI.getRecipes(),
    ]).then((response) => {
      return {
        menu: response[0],
        categories: response[1],
        recipes: response[2],
      };
    });
  },
  getMenuAndRecipes() {
    return Promise.all([menuAPI.getMenu(), recipesAPI.getRecipes()]).then(
      (response) => {
        return { menu: response[0], recipes: response[1] };
      }
    );
  },
};

export default api;
