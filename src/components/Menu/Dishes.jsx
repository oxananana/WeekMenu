import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dish from "./Dish";

const Dishes = React.memo((props) => {
  const {
    day,
    dishes,
    mealId,
    onRemoveDish,
    onToggleDishIsDone,
    animatedNewDishes,
    onResetAnimatedNewDishes,
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
            onRemoveDish={onRemoveDish}
            onToggleDishIsDone={onToggleDishIsDone}
            isNew={isNew}
            animatedNewDishes={animatedNewDishes}
            onResetAnimatedNewDishes={onResetAnimatedNewDishes}
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
  onRemoveDish: PropTypes.func.isRequired,
  onToggleDishIsDone: PropTypes.func.isRequired,
  animatedNewDishes: PropTypes.object.isRequired,
  onResetAnimatedNewDishes: PropTypes.func.isRequired,
};

const StyledDishes = styled.div``;

export default Dishes;
