import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import cn from "classnames";
import DOMPurify from "dompurify";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getDishById } from "../../selectors/selectors";
import { arrayToEnumString } from "../../helpers/helpers";
import Button from "../Common/Button";
import Icon from "../Common/Icon";
import AddEditRecipeForm from "./AddEditRecipeForm";

const RecipePage = (props) => {
  const { recipeId } = useParams();
  let history = useHistory();
  const { categoryId, title, imgSrc, schedule, ingredients, recipe } = {
    ...getDishById(props.recipes, recipeId),
  };
  const [editMode, setEditMode] = useState(false);
  const [state, setState] = useState({
    categoryId: categoryId,
    imgSrc: imgSrc,
    title: title,
    recipe: recipe,
    ingredients: ingredients,
  });

  useDocumentTitle(state.title);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  const handleSubmit = (formData) => {
    setState({ ...state, ...formData });
    setEditMode(false);
    if (categoryId !== formData.categoryId) {
      history.push(`/recipes/${formData.categoryId}/${recipeId}`);
    }
  };

  return editMode ? (
    <AddEditRecipeForm
      {...state}
      onSubmit={handleSubmit}
      toggleEditMode={() => toggleEditMode()}
      action="edit"
      categories={props.categoryValues}
      buttons={
        <>
          <Button type="submit">Сохранить</Button>
          <Button invert onClick={toggleEditMode}>
            Отмена
          </Button>
        </>
      }
    />
  ) : (
    <StyledRecipe>
      {state.imgSrc ? (
        <RecipeImg style={{ backgroundImage: `url(${state.imgSrc})` }} />
      ) : (
        <RecipeImgPlaceholder>
          <Icon name="camera"></Icon>
        </RecipeImgPlaceholder>
      )}
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
    </StyledRecipe>
  );
};

const formattingRecipeText = (text) => {
  const cleanText = DOMPurify.sanitize(text);
  return {
    __html: `<p>${cleanText.replace(/(?:\r\n|\r|\n)/g, "</p><p>")}</p>`,
  };
};

const StyledRecipe = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  padding: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg.baseLight};
`;

const ResipeDescription = styled.div`
  flex: 1;
`;

const imgContainerCss = `
  width: 400px;
  height: 400px;
  border-radius: 8px;
  margin-right: 32px;
`;

const RecipeImg = styled.div`
  ${imgContainerCss};
  background-size: cover;
  background-position: center;
`;

const RecipeImgPlaceholder = styled.div`
  ${imgContainerCss};
  border: 2px solid ${({ theme }) => theme.bg.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg.base};
  svg {
    width: 48px;
    height: 48px;
  }
`;

const RecipeTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
`;

const Dl = styled.dl`
  dt {
    color: ${({ theme }) => theme.text.gray};
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
  color: ${({ theme }) => theme.text.gray};

  &.active {
    color: ${({ theme }) => theme.text.base};
  }
`;

const RecipeIngredients = styled.div`
  margin: 12px 0;
`;

export default RecipePage;
