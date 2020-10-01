import React from "react";
import styled from "styled-components";

import Recipe from "./Recipe";

const Category = (props) => {
  const { title, recipes } = props;

  return (
    <StyledCategory>
      <CategoryTitle>{title}</CategoryTitle>
      {recipes.length > 0 ? (
        <RecipeList>
          {recipes.map((recipe, index) => {
            return (
              <RecipeContainer key={index}>
                <Recipe recipe={recipe} />
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
  margin-bottom: 20px;
`;

const RecipeList = styled.div`
  display: flex;
  margin: 0 -12px;
`;

const RecipeContainer = styled.div`
  padding: 0 12px;
  width: 25%;
  display: flex;
`;

export default Category;
