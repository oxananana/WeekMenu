import memoize from "memoizee";

export const getDishesForMeal = memoize((dishes, dishesIds) => {
  return dishesIds.map((id) => {
    return dishes[id];
  });
});

export const getMealById = (meals, mealId) => {
  return meals[mealId];
};

export const getDishById = (dishes, dishId) => {
  return dishes[dishId];
};

export const getCategoryDishes = (dishes, categoryId) => {
  return Object.values(dishes).filter((dish) => {
    return dish.categoryId === categoryId;
  });
};
