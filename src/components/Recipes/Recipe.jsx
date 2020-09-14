import React from "react";
import styled from "styled-components";
import cn from "classnames";

import { ingredientsToString } from "../../helpers/helpers";
import { textColors, shadow, bgColors } from "../../theme/variables";

const Recipe = (props) => {
  const { id, title, imgSrc, categoryId, schedule, ingredients } = { ...props };

  return (
    <StyledRecipe>
      <RecipeImg style={{ backgroundImage: `url(${imgSrc})` }} />
      <RecipeTitle>{title}</RecipeTitle>
      <RecipeIngredients>
        {ingredients.length > 0
          ? ingredientsToString(ingredients)
          : "Не заполнено"}
      </RecipeIngredients>

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
    </StyledRecipe>
  );
};

const StyledRecipe = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
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
  margin: 0 -4px;
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
  margin: 12px 0;
`;

export default Recipe;
