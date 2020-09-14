import dishes from "../JSON/dishes";
import categories from "../JSON/categories";

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
