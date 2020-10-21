import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import cn from "classnames";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { weekDaysNamesRU } from "../../constants";
import { getRecipeById } from "../../selectors/selectors";
import { arrayToEnumString } from "../../helpers/helpers";
import { recipePropTypes } from "./prop-types";
import Button from "../Common/Button";
import Icon from "../Common/Icon";
import EditRecipe from "./EditRecipe";

const RecipePage = (props) => {
  const { recipeId } = useParams();
  const categories = props.categories;
  const recipe = getRecipeById(props.recipes, recipeId);
  const { categoryId, title, imgSrc, schedule, ingredients, description } = {
    ...recipe,
  };
  const [editMode, setEditMode] = useState(false);

  useDocumentTitle(title);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return editMode ? (
    <EditRecipe
      recipe={recipe}
      categories={categories}
      toggleEditMode={toggleEditMode}
    />
  ) : !title ? (
    <div>нет такого рецепта, кривой урл</div>
  ) : (
    <StyledRecipe>
      {imgSrc ? (
        <RecipeImg style={{ backgroundImage: `url(${imgSrc})` }} />
      ) : (
        <RecipeImgPlaceholder>
          <Icon name="camera"></Icon>
        </RecipeImgPlaceholder>
      )}
      <ResipeDescription>
        <RecipeTitle>{title}</RecipeTitle>
        <Dl>
          <dt>Наличие в расписании:</dt>
          <dd>
            <RecipeSchedule>
              {weekDaysNamesRU.map((day, index) => {
                const isActive = schedule && schedule[day];
                return (
                  <RecipeScheduleItem
                    key={index}
                    className={cn({ active: isActive })}
                  >
                    {day}
                  </RecipeScheduleItem>
                );
              })}
            </RecipeSchedule>
          </dd>
          <dt>Категория:</dt>
          <dd>{categories[categoryId].title}</dd>
          <dt>Ингредиенты:</dt>
          <dd>
            <RecipeIngredients>
              {ingredients ? arrayToEnumString(ingredients) : "Не заполнено"}
            </RecipeIngredients>
          </dd>
          <dt>Рецепт:</dt>
          {description ? (
            <dd
              dangerouslySetInnerHTML={formattingRecipeText(description)}
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

RecipePage.propTypes = {
  recipe: PropTypes.exact(recipePropTypes),
  categories: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  recipes: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

const StyledRecipe = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
  padding: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg.base};
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
  border: 2px solid ${({ theme }) => theme.bg.baseLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg.baseLight};
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
