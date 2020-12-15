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

export const getCategoryDishes = (dishes, categoryId) => {
  if (!dishes) {
    return [];
  }
  return Object.values(dishes).filter((dish) => {
    return dish.categoryId === categoryId;
  });
};

export const getRecipeTitles = (recipes) => {
  if (!recipes) {
    return [];
  }
  return Object.values(recipes).map((recipe) => recipe.title);
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
