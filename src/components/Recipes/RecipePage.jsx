import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import cn from "classnames";

import { getDish } from "../../selectors/selectors";
import { ingredientsToString } from "../../helpers/helpers";
import { textColors, bgColors } from "../../theme/variables";

const RecipePage = (props) => {
  const { recipeId } = useParams();
  const { title, imgSrc, schedule, ingredients, recipe } = {
    ...getDish(recipeId),
  };

  return (
    <StyledRecipe>
      <RecipeImg style={{ backgroundImage: `url(${imgSrc})` }} />
      <ResipeDescription>
        <RecipeTitle>{title}</RecipeTitle>
        <Dl>
          <dt>Наличие в расписании:</dt>
          <dd>
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
          </dd>
          <dt>Ингредиенты:</dt>
          <dd>
            <RecipeIngredients>
              {ingredients.length > 0
                ? ingredientsToString(ingredients)
                : "Не заполнено"}
            </RecipeIngredients>
          </dd>
          <dt>Рецепт:</dt>
          <dd
            dangerouslySetInnerHTML={{
              __html: `<p>${recipe.replace(/(?:\r\n|\r|\n)/g, "</p><p>")}</p>`,
            }}
          />
        </Dl>
      </ResipeDescription>
    </StyledRecipe>
  );
};

const StyledRecipe = styled.div`
  margin-top: 32px;
  display: flex;
`;

const ResipeDescription = styled.div`
  flex: 1;
`;

const RecipeImg = styled.div`
  width: 400px;
  height: 400px;
  background-size: cover;
  background-position: center;
  background-color: ${bgColors.base};
  border-radius: 8px;
  margin-right: 32px;
`;

const RecipeTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Dl = styled.dl`
  dt {
    color: ${textColors.gray};
    margin-bottom: 8px;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }
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
  margin: 12px 0;
`;

export default RecipePage;
