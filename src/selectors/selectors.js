// import memoize from "memoizee";

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

export const getCategoryValues = (categories) => {
  return Object.values(categories);
};

export const getCategoryRecipes = (recipes, recipesIds) => {
  if (!recipes) {
    return [];
  }
  return recipesIds.map((id) => {
    return recipes[id];
  });
};
