import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Meal from "./Meal";

const Meals = (props) => {
  const { day, meals, addDish, removeDish, toggleDishIsDone } = props;
  const orderedMeals = meals.sort((mealFirst, mealSecond) => {
    if (mealFirst.order > mealSecond.order) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <StyledMeals>
      {orderedMeals.map((meal) => {
        return (
          <Meal
            day={day}
            id={meal.id}
            title={meal.title}
            dishes={meal.dishes}
            key={meal.id}
            addDish={() => {
              addDish(day, meal.id, meal.title);
            }}
            removeDish={removeDish}
            toggleDishIsDone={toggleDishIsDone}
          />
        );
      })}
    </StyledMeals>
  );
};

Meals.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.array.isRequired,
  addDish: PropTypes.func.isRequired,
  removeDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
};

const StyledMeals = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg.baseLight};
  padding: 16px;
  border-radius: 4px;
`;

export default Meals;
