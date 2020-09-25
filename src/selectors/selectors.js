// import memoize from "memoizee";

export const getDishesForMeal = (dishes, dishesIds) => {
  return dishesIds.map((id) => {
    return dishes[id];
  });
};

export const getMealById = (meals, mealId) => {
  return meals[mealId];
};

export const getDishById = (dishes, dishId) => {
  return dishes[dishId];
};

export const getCategoryRecipes = (recipes, categoryId) => {
  return Object.values(recipes).filter((recipe) => {
    return recipe.categoryId === categoryId;
  });
};
