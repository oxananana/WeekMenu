import { v4 as uuidv4 } from "uuid";
import dishes from "./recipes";

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();

const data = {
  "2020-09-17": {
    meals: {
      [id1]: {
        id: id1,
        title: "Завтрак",
        type: "breakfast",
        dishes: [
          { id: "breakfast1", isDone: false, ...dishes["breakfast1"] },
          { id: "drink1", isDone: false, ...dishes["drink1"] },
          { id: "desert1", isDone: false, ...dishes["desert1"] },
        ],
      },

      [id2]: {
        id: id2,
        title: "Обед",
        type: "lunch",
        dishes: [
          { id: "side2", isDone: false, ...dishes["side2"] },
          { id: "meat2", isDone: false, ...dishes["meat2"] },
          { id: "salad1", isDone: false, ...dishes["salad1"] },
        ],
      },
      [id3]: {
        id: id3,
        title: "Ужин",
        type: "dinner",
        dishes: [
          { id: "side1", isDone: false, ...dishes["side1"] },
          { id: "meat1", isDone: false, ...dishes["meat1"] },
        ],
      },
    },
  },
  "2020-09-18": {
    meals: {
      [id4]: {
        id: id4,
        title: "Завтрак",
        type: "breakfast",
        dishes: [
          { id: "breakfast2", isDone: false, ...dishes["breakfast2"] },
          { id: "drink2", isDone: false, ...dishes["drink2"] },
          { id: "desert2", isDone: false, ...dishes["desert2"] },
        ],
      },

      [id5]: {
        id: id5,
        title: "Обед",
        type: "lunch",
        dishes: [
          { id: "side1", isDone: false, ...dishes["side1"] },
          { id: "meat2", isDone: false, ...dishes["meat2"] },
        ],
      },
      [id3]: {
        id: id3,
        title: "Ужин",
        type: "dinner",
        dishes: [
          { id: "side1", isDone: false, ...dishes["side1"] },
          { id: "meat1", isDone: false, ...dishes["meat1"] },
        ],
      },
    },
  },
  // "2020-09-19": {
  //   breakfast: {
  //     id: uuidv4(),
  //     title: "Завтрак",
  //     dishes: [
  //       { id: "breakfast2", isDone: true, ...dishes["breakfast2"] },
  //       { id: "drink1", isDone: true, ...dishes["drink1"] },
  //     ],
  //   },
  //   lunch: {
  //     id: uuidv4(),
  //     title: "Обед",
  //     dishes: [
  //       { id: "side1", isDone: true, ...dishes["side1"] },
  //       { id: "meat1", isDone: true, ...dishes["meat1"] },
  //       { id: "salad1", isDone: false, ...dishes["salad1"] },
  //     ],
  //   },
  //   dinner: {
  //     id: uuidv4(),
  //     title: "Ужин",
  //     dishes: [
  //       { id: "side1", isDone: true, ...dishes["side1"] },
  //       { id: "meat1", isDone: false, ...dishes["meat1"] },
  //     ],
  //   },
  // },
  // "2020-09-20": {
  //   breakfast: {
  //     id: uuidv4(),
  //     title: "Завтрак",
  //     dishes: [
  //       { id: "breakfast1", isDone: false, ...dishes["breakfast1"] },
  //       { id: "drink1", isDone: true, ...dishes["drink1"] },
  //       { id: "desert2", isDone: true, ...dishes["desert2"] },
  //     ],
  //   },
  //   lunch: {
  //     id: uuidv4(),
  //     title: "Обед",
  //     dishes: [],
  //   },
  //   dinner: {
  //     id: uuidv4(),
  //     title: "Ужин",
  //     dishes: [],
  //   },
  // },
  // "2020-09-21": {
  //   breakfast: {
  //     id: uuidv4(),
  //     title: "Завтрак",
  //     dishes: [
  //       { id: "breakfast2", isDone: false, ...dishes["breakfast2"] },
  //       { id: "drink2", isDone: true, ...dishes["drink2"] },
  //     ],
  //   },
  //   lunch: {
  //     id: uuidv4(),
  //     title: "Обед",
  //     dishes: [],
  //   },
  //   dinner: {
  //     id: uuidv4(),
  //     title: "Ужин",
  //     dishes: [],
  //   },
  // },
  // "2020-09-22": {
  //   breakfast: {
  //     id: uuidv4(),
  //     title: "Завтрак",
  //     dishes: [
  //       { id: "breakfast2", isDone: false, ...dishes["breakfast2"] },
  //       { id: "drink1", isDone: false, ...dishes["drink1"] },
  //     ],
  //   },
  //   lunch: {
  //     id: uuidv4(),
  //     title: "Обед",
  //     dishes: [],
  //   },
  //   dinner: {
  //     id: uuidv4(),
  //     title: "Ужин",
  //     dishes: [],
  //   },
  // },
  // "2020-09-23": {
  //   breakfast: {
  //     id: uuidv4(),
  //     title: "Завтрак",
  //     dishes: [],
  //   },
  //   lunch: {
  //     id: uuidv4(),
  //     title: "Обед",
  //     dishes: [],
  //   },
  //   dinner: {
  //     id: uuidv4(),
  //     title: "Ужин",
  //     dishes: [],
  //   },
  // },
  // "2020-09-24": {
  //   breakfast: {
  //     id: uuidv4(),
  //     title: "Завтрак",
  //     dishes: [],
  //   },
  //   lunch: {
  //     id: uuidv4(),
  //     title: "Обед",
  //     dishes: [],
  //   },
  //   dinner: {
  //     id: uuidv4(),
  //     title: "Ужин",
  //     dishes: [],
  //   },
  // },
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
        dishes[dish.id] = dish;
        return dish.id;
      });

      return meal.id;
    });
  });

  return { dates, menu, meals, dishes };
};

// meals: {
//       [id1]: {
//         id: id1,
//         title: "Завтрак",
//         type: "breakfast",
//         dishes: [
//           { id: "breakfast1", isDone: false, ...dishes["breakfast1"] },
//           { id: "drink1", isDone: false, ...dishes["drink1"] },
//           { id: "desert1", isDone: false, ...dishes["desert1"] },
//         ],
//       },

export default normalize(data);
