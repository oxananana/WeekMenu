import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import { getDishesFromRecipes } from "../../selectors/selectors";
import { RecipesContext } from "../../index";
import Dishes from "./Dishes";
import Icon from "../Common/Icon";

const Meal = (props) => {
  const {
    day,
    id,
    title,
    dishes,
    removeDish,
    addDish,
    toggleDishIsDone,
  } = props;

  const { recipes } = useContext(RecipesContext);
  const dishesFull = dishes ? getDishesFromRecipes(recipes, dishes) : [];

  return (
    <Droppable
      droppableId={JSON.stringify({
        id,
        day,
      })}
      type="dishes"
    >
      {(provided, snapshot) => {
        return (
          <StyledMeal
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <MealTitle>
              {title}
              <AddIcon onClick={addDish}>
                <Icon name="plus" />
              </AddIcon>
            </MealTitle>
            {dishesFull.length > 0 ? (
              <Dishes
                day={day}
                mealId={id}
                dishes={dishesFull}
                removeDish={removeDish}
                toggleDishIsDone={toggleDishIsDone}
              />
            ) : (
              <NoDishes>Пока пусто</NoDishes>
            )}
            {provided.placeholder}
          </StyledMeal>
        );
      }}
    </Droppable>
  );
};

Meal.propTypes = {
  day: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dishes: PropTypes.array,
  removeDish: PropTypes.func.isRequired,
  addDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
};

const StyledMeal = styled.div`
  background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver && theme.bg.droppable};
  padding: 8px;
  border-radius: 4px;

  & + & {
    margin-top: 12px;
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

const NoDishes = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text.gray};
`;

export default Meal;
