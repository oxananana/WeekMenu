import React from "react";
import styled from "styled-components";
import { textColors } from "../../theme/variables";
import Dish from "./Dish";
import Icon from "../Common/Icon";

const areEqual = (prevProps, nextProps) => {
  const { removeDish, addDish, ...prev } = prevProps;
  for (const key of Object.keys(prev)) {
    if (prev[key] !== nextProps[key]) {
      return false;
    }
  }
  return true;
};

const Meal = React.memo((props) => {
  const { id, title, dishes, removeDish, addDish } = { ...props };
  return (
    <StyledMeal>
      <MealTitle>
        {title}
        <AddIcon onClick={addDish}>
          <Icon name="plus" />
        </AddIcon>
      </MealTitle>
      {dishes.length > 0 ? (
        <Dishes>
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
        </Dishes>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddIcon = styled.span`
  opacity: 0.3;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

const Dishes = styled.div``;

const NoDishes = styled.div`
  color: ${textColors.gray};
`;

export default Meal;
