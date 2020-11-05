import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dish from "./Dish";

const Dishes = React.memo((props) => {
  const {
    day,
    dishes,
    mealId,
    removeDish,
    toggleDishIsDone,
    animatedNewDishes,
    resetAnimatedNewDishes,
  } = props;

  return (
    <StyledDishes>
      {dishes.map((dish, index) => {
        let isNew;
        if (animatedNewDishes.new) {
          isNew = animatedNewDishes.new.some((id) => id === mealId + dish.id);
        }

        return (
          <Dish
            key={dish.id + index}
            index={index}
            day={day}
            mealId={mealId}
            dish={dish}
            isDone={dish.isDone}
            removeDish={removeDish}
            toggleDishIsDone={toggleDishIsDone}
            isNew={isNew}
            animatedNewDishes={animatedNewDishes}
            resetAnimatedNewDishes={resetAnimatedNewDishes}
          />
        );
      })}
    </StyledDishes>
  );
});

Dishes.propTypes = {
  dishes: PropTypes.array.isRequired,
  day: PropTypes.string.isRequired,
  mealId: PropTypes.string.isRequired,
  removeDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
  animatedNewDishes: PropTypes.object.isRequired,
  resetAnimatedNewDishes: PropTypes.func.isRequired,
};

const StyledDishes = styled.div``;

export default Dishes;
