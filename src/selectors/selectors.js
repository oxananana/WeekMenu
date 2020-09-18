import dishes from "../data/dishes";
import categories from "../data/categories";

export const getDishesForMeal = (dishes, dishesIds) => {
  return dishesIds.map((id) => {
    return dishes[id];
  });
};

export const getMealById = (meals, mealId) => {
  return meals[mealId];
};

//old

export const getDish = (id) => {
  return dishes[id];
};

export const getDishes = () => {
  return dishes;
};

export const getCategories = () => {
  return categories;
};

export const getCategoryDishes = (categoryId) => {
  const dishes = Object.values(getDishes());

  return dishes.filter((dish) => {
    return dish.categoryId === categoryId;
  });
};
