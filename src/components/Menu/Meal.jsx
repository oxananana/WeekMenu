import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getDishesByIds } from "../../selectors/selectors";
import { RecipesContext } from "../../index";
import Dish from "./Dish";
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
  const dishesFull = dishes ? getDishesByIds(recipes, Object.keys(dishes)) : [];

  return (
    <StyledMeal>
      <MealTitle>
        {title}
        <AddIcon onClick={addDish}>
          <Icon name="plus" />
        </AddIcon>
      </MealTitle>
      {dishesFull.length > 0 ? (
        <Dishes>
          {dishesFull.map((dish) => {
            return (
              <Dish
                key={dish.id}
                day={day}
                mealId={id}
                dish={dish}
                isDone={dishes[dish.id].isDone}
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

Meal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dishes: PropTypes.object,
  removeDish: PropTypes.func.isRequired,
  addDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
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
  font-size: 14px;
  color: ${({ theme }) => theme.text.gray};
`;

export default Meal;
