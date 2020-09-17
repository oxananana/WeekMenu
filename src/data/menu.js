import { v4 as uuidv4 } from "uuid";
import dishes from "./dishes";

const data = {
  "2020-09-17": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [
        { id: "breakfost1", isDone: false, ...dishes["breakfost1"] },
        { id: "drink1", isDone: false, ...dishes["drink1"] },
        { id: "desert1", isDone: false, ...dishes["desert1"] },
      ],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [
        { id: "side2", isDone: false, ...dishes["side2"] },
        { id: "meat2", isDone: false, ...dishes["meat2"] },
        { id: "salad1", isDone: false, ...dishes["salad1"] },
      ],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [
        { id: "side1", isDone: false, ...dishes["side1"] },
        { id: "meat1", isDone: false, ...dishes["meat1"] },
      ],
    },
  },
  "2020-09-18": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [
        { id: "breakfost1", isDone: false, ...dishes["breakfost1"] },
        { id: "drink1", isDone: false, ...dishes["drink1"] },
        { id: "desert1", isDone: false, ...dishes["desert1"] },
      ],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [
        { id: "side2", isDone: false, ...dishes["side2"] },
        { id: "meat2", isDone: false, ...dishes["meat2"] },
        { id: "salad1", isDone: false, ...dishes["salad1"] },
      ],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [
        { id: "side1", isDone: false, ...dishes["side1"] },
        { id: "meat1", isDone: false, ...dishes["meat1"] },
      ],
    },
  },
  "2020-09-19": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [
        { id: "breakfost2", isDone: true, ...dishes["breakfost2"] },
        { id: "drink1", isDone: true, ...dishes["drink1"] },
      ],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [
        { id: "side1", isDone: true, ...dishes["side1"] },
        { id: "meat1", isDone: true, ...dishes["meat1"] },
        { id: "salad1", isDone: false, ...dishes["salad1"] },
      ],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [
        { id: "side1", isDone: true, ...dishes["side1"] },
        { id: "meat1", isDone: false, ...dishes["meat1"] },
      ],
    },
  },
  "2020-09-20": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [
        { id: "breakfost1", isDone: false, ...dishes["breakfost1"] },
        { id: "drink1", isDone: true, ...dishes["drink1"] },
        { id: "desert2", isDone: true, ...dishes["desert2"] },
      ],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [],
    },
  },
  "2020-09-21": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [
        { id: "breakfost2", isDone: false, ...dishes["breakfost2"] },
        { id: "drink2", isDone: true, ...dishes["drink2"] },
      ],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [],
    },
  },
  "2020-09-22": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [
        { id: "breakfost2", isDone: false, ...dishes["breakfost2"] },
        { id: "drink1", isDone: false, ...dishes["drink1"] },
      ],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [],
    },
  },
  "2020-09-23": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [],
    },
  },
  "2020-09-24": {
    breakfast: {
      id: uuidv4(),
      title: "Завтрак",
      dishes: [],
    },
    lunch: {
      id: uuidv4(),
      title: "Обед",
      dishes: [],
    },
    dinner: {
      id: uuidv4(),
      title: "Ужин",
      dishes: [],
    },
  },
};

export default data;
