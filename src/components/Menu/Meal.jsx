import React, { useState } from "react";
import styled from "styled-components";
import { textColors } from "../../theme/variables";
import Dish from "./Dish";

const areEqual = (prevProps, nextProps) => {
  const { removeDish, ...prev } = prevProps;
  for (const key of Object.keys(prev)) {
    if (prev[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
};

const Meal = React.memo((props) => {
  const { id, title, dishes, removeDish } = { ...props };

  return (
    <StyledMeal>
      <MealTitle>{title}</MealTitle>
      {dishes.length > 0 ? (
        <DishesList>
          {dishes.map((dish) => {
            return (
              <Dish
                key={dish.id}
                mealId={id}
                dish={dish}
                removeDish={removeDish}
              />
            );
          })}
        </DishesList>
      ) : (
        <NoDishes>Пока пусто</NoDishes>
      )}
    </StyledMeal>
  );
}, areEqual);

const StyledMeal = styled.div`
  & + & {
    margin-top: 32px;
  }
`;

const MealTitle = styled.div`
  font-weight: 600;
  margin-bottom: 12px;
`;

const DishesList = styled.div``;

const NoDishes = styled.div`
  color: ${textColors.gray};
`;

export default Meal;
