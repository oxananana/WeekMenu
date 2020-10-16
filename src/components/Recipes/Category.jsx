import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getCategoryRecipes } from "../../selectors/selectors";
import Recipe from "./Recipe";

const Category = (props) => {
  const { title, categoryId } = props;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(getCategoryRecipes(props.recipes, categoryId));
  }, [props.recipes, categoryId]);

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

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  recipes: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

Category.defaultProps = {
  recipes: null,
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
  min-width: 280px;
  display: flex;
`;

export default Category;
