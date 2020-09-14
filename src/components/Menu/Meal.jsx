import React from "react";
import styled from "styled-components";
import { textColors } from "../../theme/variables";
import Dish from "./Dish";

const Meal = (props) => {
  const { title, dishes } = { ...props };

  return (
    <StyledMeal>
      <MealTitle>{title}</MealTitle>
      {dishes.length > 0 ? (
        <DishesList>
          {dishes.map((dish, index) => {
            return <Dish key={index} id={dish.id} isDone={dish.isDone} />;
          })}
        </DishesList>
      ) : (
        <NoDishes>Пока пусто</NoDishes>
      )}
    </StyledMeal>
  );
};

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
