import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
import mediaQuery from "../../theme/mediaQuery";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { arrayToEnumString } from "../../helpers/recipeFormatting";
import { recipePropTypes, categoriesPropTypes } from "../../prop-types";
import { RecipesContext } from "../../index";
import Button from "../Common/Button";
import Icon from "../Common/Icon";
import EditRecipe from "./EditRecipe";

const RecipePage = (props) => {
  const categories = props.categories;
  const { recipes, recipeSlugs } = useContext(RecipesContext);
  const recipe = recipes[recipeSlugs[useParams()["recipeSlug"]].id];

  const { categoryId, title, imgSrc, ingredients, description } = recipe;
  const [editMode, setEditMode] = useState(false);

  useDocumentTitle(title);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (editMode) {
    return (
      <EditRecipe
        recipe={recipe}
        categories={categories}
        toggleEditMode={toggleEditMode}
      />
    );
  }
  return (
    <StyledRecipe>
      {imgSrc ? (
        <RecipeImg image={imgSrc} />
      ) : (
        <RecipeImgPlaceholder>
          <Icon name="camera" />
        </RecipeImgPlaceholder>
      )}
      <ResipeDescription>
        <RecipeTitle>{title}</RecipeTitle>
        <Dl>
          <dt>Категория:</dt>
          <dd>{categories[categoryId].title}</dd>
          <dt>Ингредиенты:</dt>
          <dd>
            <RecipeIngredients>
              {ingredients && ingredients.length > 0
                ? arrayToEnumString(ingredients)
                : "Не заполнено"}
            </RecipeIngredients>
          </dd>
          <dt>Рецепт:</dt>
          {description ? (
            <dd
              dangerouslySetInnerHTML={{
                __html: formattingRecipeText(description),
              }}
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
  return `<p>${cleanText.replace(/(?:\r\n|\r|\n)/g, "</p><p>")}</p>`;
};

RecipePage.propTypes = {
  recipe: PropTypes.exact(recipePropTypes),
  categories: categoriesPropTypes,
};

const StyledRecipe = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg.base};
  padding: 24px;

  ${mediaQuery.greaterThen("medium")`
    display: flex;
    padding: 32px;
  `}
`;

const ResipeDescription = styled.div`
  flex: 1;
`;

const imgContainerCss = `
  width: 100%;
  height: 300px;
  border-radius: 8px;
  margin-bottom: 24px;

  ${mediaQuery.greaterThen("medium")`
    margin-right: 32px;
    margin-bottom: 0;
    width: 50%;
  `}

  ${mediaQuery.greaterThen("large")`
    width: 400px;
    height: 400px;
  `}
`;

const RecipeImg = styled.div`
  ${imgContainerCss};
  background-size: cover;
  background-position: center;
  background-image: url(${(props) => props.image});
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

const RecipeIngredients = styled.div`
  margin: 12px 0;
`;

export default RecipePage;
