import React from "react";
import styled from "styled-components";
import Dish from "./Dish";
import Icon from "../Common/Icon";

const Meal = (props) => {
  const { id, title, dishes, removeDish, addDish, toggleDishIsDone } = props;

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
                toggleDishIsDone={toggleDishIsDone}
              />
            );
          })}
        </Dishes>
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
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AddIcon = styled.span`
  color: ${({ theme }) => theme.text.grayLight};

  &:hover {
    color: ${({ theme }) => theme.text.gray};
    cursor: pointer;
  }
`;

const Dishes = styled.div``;

const NoDishes = styled.div`
  color: ${({ theme }) => theme.text.gray};
`;

export default Meal;
