import React from "react";
import styled from "styled-components";

import Recipe from "./Recipe";

const Category = (props) => {
  const { title, recipes } = { ...props };

  return (
    <StyledCategory>
      <CategoryTitle>{title}</CategoryTitle>
      {recipes.length > 0 ? (
        <RecipeList>
          {recipes.map((recipe, index) => {
            return (
              <RecipeContainer key={index}>
                <Recipe
                  id={recipe.id}
                  title={recipe.title}
                  imgSrc={recipe.imgSrc}
                  categoryId={recipe.categoryId}
                  ingredients={recipe.ingredients}
                  recipe={recipe.recipe}
                  schedule={recipe.schedule}
                />
              </RecipeContainer>
            );
          })}
        </RecipeList>
      ) : (
        <div>Здесь пока нет рецептов</div>
      )}
    </StyledCategory>
  );
};

const StyledCategory = styled.div`
  & + & {
    margin-top: 32px;
  }
`;
const CategoryTitle = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 16px;
`;

const RecipeList = styled.div`
  display: flex;
  margin: 0 -12px;
`;

const RecipeContainer = styled.div`
  padding: 0 12px;
  width: 25%;
`;

export default Category;
