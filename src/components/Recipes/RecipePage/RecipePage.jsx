import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import cn from "classnames";
import { getDishById } from "../../../selectors/selectors";
import { arrayToEnumString } from "../../../helpers/helpers";
import { textColors, bgColors } from "../../../theme/variables";
import Button from "../../Common/Button";
import RecipeEditForm from "./RecipeEditForm";

const RecipePage = (props) => {
  const { recipeId } = useParams();
  const { title, imgSrc, schedule, ingredients, recipe } = {
    ...getDishById(props.recipes, recipeId),
  };
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState({
    imgSrc: imgSrc,
    title: title,
    recipe: recipe,
    ingredients: ingredients,
  });
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const handleSubmit = (formData) => {
    setState({ ...state, ...formData });
    setEditMode(false);
  };

  return (
    <StyledRecipe>
      {editMode ? (
        <RecipeEditForm
          {...state}
          onSubmit={handleSubmit}
          toggleEditMode={() => toggleEditMode()}
        />
      ) : (
        <>
          <RecipeImg style={{ backgroundImage: `url(${state.imgSrc})` }} />
          <ResipeDescription>
            <RecipeTitle>{state.title}</RecipeTitle>
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
                  {arrayToEnumString(state.ingredients) || "Не заполнено"}
                </RecipeIngredients>
              </dd>
              <dt>Рецепт:</dt>
              {state.recipe ? (
                <dd
                  dangerouslySetInnerHTML={formattingRecipeText(state.recipe)}
                ></dd>
              ) : (
                <dd>Не заполнено</dd>
              )}
            </Dl>
            <Button invert onClick={toggleEditMode}>
              Редактировать
            </Button>
          </ResipeDescription>
        </>
      )}
    </StyledRecipe>
  );
};

const formattingRecipeText = (text) => {
  return {
    __html: `<p>${text.replace(/(?:\r\n|\r|\n)/g, "</p><p>")}</p>`,
  };
};

const StyledRecipe = styled.div`
  margin: 32px auto;
  display: flex;
  max-width: 1200px;
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
