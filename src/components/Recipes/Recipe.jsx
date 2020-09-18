import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import cn from "classnames";

import { ingredientsToString } from "../../helpers/helpers";
import { textColors, shadow, bgColors } from "../../theme/variables";

const Recipe = (props) => {
  const { id, title, imgSrc, categoryId, schedule, ingredients } = {
    ...props.recipe,
  };

  return (
    <StyledRecipe>
      <NavLink to={`/recipes/${categoryId}/${id}`}>
        <RecipeImg style={{ backgroundImage: `url(${imgSrc})` }} />
        <RecipeTitle>{title}</RecipeTitle>

        <RecipeSchedule>
          {schedule.map((day, index) => {
            return (
              <RecipeScheduleItem
                key={index}
                className={cn({ active: day.isActive })}
              >
                {day.name}
              </RecipeScheduleItem>
            );
          })}
        </RecipeSchedule>
        <RecipeIngredients>
          {ingredients.length > 0
            ? ingredientsToString(ingredients)
            : "Не заполнено"}
        </RecipeIngredients>
      </NavLink>
    </StyledRecipe>
  );
};

const StyledRecipe = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  flex: auto;
  width: 100%;
  box-shadow: ${shadow};
  transition: transform 0.2s ease-out;

  & + & {
    margin-left: 20px;
  }

  &:hover {
    transform: translateY(-10px);
  }
`;

const RecipeImg = styled.div`
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: ${bgColors.base};
  margin-bottom: 16px;
  border-radius: 8px;
`;

const RecipeTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
`;

const RecipeSchedule = styled.ul`
  display: flex;
  margin: 12px -4px;
`;

const RecipeScheduleItem = styled.li`
  margin: 0 4px;
  color: ${textColors.gray};

  &.active {
    color: ${textColors.base};
  }
`;

const RecipeIngredients = styled.div`
  color: ${textColors.gray};
`;

export default Recipe;
