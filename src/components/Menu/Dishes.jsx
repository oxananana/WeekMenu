import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dish from "./Dish";

const Dishes = React.memo((props) => {
  const {
    day,
    dishes,
    dishesFull,
    mealId,
    removeDish,
    toggleDishIsDone,
  } = props;

  return (
    <StyledDishes>
      {dishesFull.map((dish, index) => {
        return (
          <Dish
            key={dish.id}
            index={index}
            day={day}
            mealId={mealId}
            dish={dish}
            isDone={dishes[dish.id].isDone}
            removeDish={removeDish}
            toggleDishIsDone={toggleDishIsDone}
          />
        );
      })}
    </StyledDishes>
  );
});

Dishes.propTypes = {
  dishes: PropTypes.object.isRequired,
  dishesFull: PropTypes.array.isRequired,
  day: PropTypes.string.isRequired,
  mealId: PropTypes.string.isRequired,
  removeDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
};

const StyledDishes = styled.div``;

export default Dishes;
