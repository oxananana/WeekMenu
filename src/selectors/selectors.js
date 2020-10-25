// import memoize from "memoizee";

export const getDishesFromRecipes = (recipes, dishes) => {
  if (!dishes) {
    return [];
  }

  return dishes.map((dish) => {
    return { ...recipes[dish.id], isDone: dish.isDone };
  });
};

export const getMealDishesByDay = (menu, day, mealId) => {
  return [...(menu[day].meals[mealId].dishes || [])];
};

export const getMealsByDay = (menu, day) => {
  return { ...menu[day].meals };
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
