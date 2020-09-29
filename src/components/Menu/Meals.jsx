import React from "react";
import styled from "styled-components";
import { getDishesForMeal, getMealById } from "../../selectors/selectors";
import { bgColors } from "../../theme/variables";
import Meal from "./Meal";

const Meals = (props) => {
  const {
    mealsIds,
    dishes,
    meals,
    addDish,
    removeDish,
    toggleDishIsDone,
    day,
  } = props;

  return (
    <StyledMeals>
      {mealsIds.map((id) => {
        const meal = getMealById(meals, id);

        return (
          <Meal
            id={meal.id}
            title={meal.title}
            dishes={getDishesForMeal(dishes, meal.dishes)}
            key={meal.id}
            addDish={() => {
              addDish(`${meal.title}, ${day}`, meal.id);
            }}
            removeDish={removeDish}
            toggleDishIsDone={toggleDishIsDone}
          />
        );
      })}
    </StyledMeals>
  );
};

const StyledMeals = styled.div`
  flex: 1;
  background-color: ${bgColors.base};
  padding: 16px;
  border-radius: 4px;
`;

export default Meals;
