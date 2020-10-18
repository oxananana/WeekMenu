import { v4 as uuidv4 } from "uuid";
import dishes from "./recipes";

let ids = [];

for (let i = 0; i < 10; i++) {
  ids.push(uuidv4());
}

const data = {
  "2020-10-17": {
    meals: {
      "2020-10-17-breakfast": {
        id: "2020-10-17-breakfast",
        title: "Завтрак",
        type: "breakfast",
        dishes: [
          { isDone: false, id: "-MJl18EixfCt_rpPtnXU" },
          { isDone: true, id: "-MJl24M0SJawgShyaqg4" },
          { isDone: true, id: "-MJlfuT53aDn-llJ5fWc" },
        ],
      },

      "2020-10-17-lunch": {
        id: "2020-10-17-lunch",
        title: "Обед",
        type: "lunch",
        dishes: [
          { isDone: true, id: "-MJl24M0SJawgShyaqg4" },
          { isDone: false, id: "-MJl18EixfCt_rpPtnXU" },
          { isDone: true, id: "-MJlfuT53aDn-llJ5fWc" },
        ],
      },
      "2020-10-17-dinner": {
        id: "2020-10-17-dinner",
        title: "Ужин",
        type: "dinner",
        dishes: [
          { isDone: false, id: "-MJl18EixfCt_rpPtnXU" },
          { isDone: true, id: "-MJlfuT53aDn-llJ5fWc" },
        ],
      },
    },
  },
  "2020-10-18": {
    meals: {
      "2020-10-18-breakfast": {
        id: "2020-10-18-breakfast",
        title: "Завтрак",
        type: "breakfast",
        dishes: [
          { isDone: false, id: "-MJl18EixfCt_rpPtnXU" },
          { isDone: true, id: "-MJlfuT53aDn-llJ5fWc" },
        ],
      },
      "2020-10-18-lunch": {
        id: "2020-10-18-lunch",
        title: "Обед",
        type: "lunch",
        dishes: [],
      },
      "2020-10-18-dinner": {
        id: "2020-10-18-dinner",
        title: "Ужин",
        type: "dinner",
        dishes: [{ isDone: true, id: "-MJlfuT53aDn-llJ5fWc" }],
      },
    },
  },
};

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

export default normalize(data);
