const normalize = (data) => {
  let dates = Object.keys(data);
  let menu = {};
  let meals = {};
  let dishes = {};

  Object.entries(data).forEach(([key, value]) => {
    menu[key] = { ...value };
    menu[key].meals = Object.values(value.meals).map((meal) => {
      meals[meal.id] = meal;
      meal.dishes = meal.dishes.map((dish) => {
        const { isDone, ...rest } = dish;
        dishes[dish.id] = rest;
        return { id: dish.id, isDone: dish.isDone };
      });

      return meal.id;
    });
  });

  return { dates, menu, meals, dishes };
};
