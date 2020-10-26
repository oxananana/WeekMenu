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
    <StyledMeal>
      <MealTitle>
        {title}
        <AddIcon onClick={addDish}>
          <Icon name="plus" />
        </AddIcon>
      </MealTitle>
      <Droppable
        droppableId={JSON.stringify({
          id,
          day,
        })}
        type="dishes"
      >
        {(provided, snapshot) => {
          return (
            <DishesContainer
              draggingFromThisWith={snapshot.draggingFromThisWith}
              isDraggingOver={snapshot.isDraggingOver}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {dishesFull.length > 0 ? (
                <>
                  <Dishes
                    day={day}
                    mealId={id}
                    dishes={dishesFull}
                    removeDish={removeDish}
                    toggleDishIsDone={toggleDishIsDone}
                  />
                  {provided.placeholder}
                </>
              ) : (
                <>
                  {provided.placeholder}
                  {!snapshot.isDraggingOver && <NoDishes>Пока пусто</NoDishes>}
                </>
              )}
              {}
            </DishesContainer>
          );
        }}
      </Droppable>
    </StyledMeal>
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
  & + & {
    margin-top: 4px;
  }
`;

const DishesContainer = styled.div`
  background-color: ${({ draggingFromThisWith, theme }) =>
    draggingFromThisWith && theme.bg.droppableParent};
  background-color: ${({ isDraggingOver, theme }) =>
    isDraggingOver && theme.bg.droppable};
  transition: background-color 0.2s ease-out, height 0.2s ease-out;
  padding: 8px;
  border-radius: 4px;
`;

const MealTitle = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 4px;
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
