import { v4 as uuidv4 } from "uuid";
import dishes from "./recipes";

let ids = [];

for (let i = 0; i < 10; i++) {
  ids.push(uuidv4());
}

const data = {
  "2020-09-17": {
    meals: {
      [ids[0]]: {
        id: ids[0],
        title: "Завтрак",
        type: "breakfast",
        dishes: [
          { isDone: false, ...dishes["breakfast1"] },
          { isDone: true, ...dishes["drink1"] },
          { isDone: true, ...dishes["desert1"] },
        ],
      },

      [ids[1]]: {
        id: ids[1],
        title: "Обед",
        type: "lunch",
        dishes: [
          { isDone: false, ...dishes["side2"] },
          { isDone: true, ...dishes["meat2"] },
          { isDone: false, ...dishes["salad1"] },
        ],
      },
      [ids[2]]: {
        id: ids[2],
        title: "Ужин",
        type: "dinner",
        dishes: [
          { isDone: false, ...dishes["side2"] },
          { isDone: false, ...dishes["meat2"] },
        ],
      },
    },
  },
  "2020-09-18": {
    meals: {
      [ids[3]]: {
        id: ids[3],
        title: "Завтрак",
        type: "breakfast",
        dishes: [
          { isDone: false, ...dishes["breakfast2"] },
          { isDone: true, ...dishes["drink2"] },
          { isDone: false, ...dishes["desert2"] },
        ],
      },
      [ids[4]]: {
        id: ids[4],
        title: "Обед",
        type: "lunch",
        dishes: [
          { isDone: false, ...dishes["soup2"] },
          { isDone: false, ...dishes["side1"] },
          { isDone: false, ...dishes["meat1"] },
        ],
      },
      [ids[5]]: {
        id: ids[5],
        title: "Ужин",
        type: "dinner",
        dishes: [
          { isDone: false, ...dishes["side1"] },
          { isDone: false, ...dishes["meat1"] },
        ],
      },
    },
  },
  "2020-09-19": {
    meals: {
      [ids[6]]: {
        id: ids[6],
        title: "Завтрак",
        type: "breakfast",
        dishes: [{ isDone: false, ...dishes["breakfast2"] }],
      },
      [ids[7]]: {
        id: ids[7],
        title: "Обед",
        type: "lunch",
        dishes: [],
      },
      [ids[8]]: {
        id: ids[8],
        title: "Ужин",
        type: "dinner",
        dishes: [],
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
