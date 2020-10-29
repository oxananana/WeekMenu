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
    animatedDishes,
  } = props;

  return (
    <StyledDishes>
      {dishes.map((dish, index) => {
        let isNew;
        if (animatedDishes.new) {
          isNew = animatedDishes.new.some((id) => id === mealId + dish.id);
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
            animatedDishes={animatedDishes}
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
  animatedDishes: PropTypes.object.isRequired,
};

const StyledDishes = styled.div``;

export default Dishes;
