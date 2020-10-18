// import memoize from "memoizee";

export const getDishesByIds = (recipes, dishesIds) => {
  if (!dishesIds) {
    return [];
  }
  return dishesIds.map((id) => {
    return recipes[id];
  });
};

export const getDishesForMeal = (dishes, mealDishes) => {
  return mealDishes.map((dish) => {
    return { ...dish, ...dishes[dish.id] };
  });
};

export const getMealById = (meals, mealId) => {
  return meals[mealId];
};

export const getDishById = (dishes, dishId) => {
  return dishes[dishId];
};

export const getCategoryDishes = (dishes, categoryId) => {
  if (!dishes) {
    return [];
  }
  return Object.values(dishes).filter((dish) => {
    return dish.categoryId === categoryId;
  });
};

export const getRecipeById = (recipes, recipeId) => {
  return recipes[recipeId];
};

export const getCategoryValues = (categories) => {
  return Object.values(categories);
};

export const getCategoryRecipes = (recipes, categoryId) => {
  if (!recipes) {
    return [];
  }
  return Object.values(recipes).filter((recipe) => {
    return recipe.categoryId === categoryId;
  });
};
