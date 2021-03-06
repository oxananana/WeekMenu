import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import mediaQuery from "../../theme/mediaQuery";
import { getCategoryRecipes } from "../../selectors/selectors";
import Recipe from "./Recipe";
import { RecipesContext } from "../../index";

const Category = (props) => {
  const { title, categoryId } = props;

  const recipes = useContext(RecipesContext).recipes;
  const categoryRecipes = useMemo(() => {
    return getCategoryRecipes(recipes, categoryId);
  }, [recipes, categoryId]);

  return (
    <StyledCategory>
      <CategoryTitle>{title}</CategoryTitle>
      {categoryRecipes.length > 0 ? (
        <RecipeList>
          {categoryRecipes.map((recipe, index) => {
            return (
              <RecipeContainer key={index}>
                <Recipe recipe={recipe} />
              </RecipeContainer>
            );
          })}
        </RecipeList>
      ) : (
        <NoRecipes>Здесь пока нет рецептов</NoRecipes>
      )}
    </StyledCategory>
  );
};

Category.propTypes = {
  categoryId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
`;

const RecipeList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 8px -12px 0;
`;

const RecipeContainer = styled.div`
  display: flex;
  padding: 12px;
  width: 100%;

  ${mediaQuery.greaterThen("medium")`
    width: 50%;
  `}

  ${mediaQuery.greaterThen("large")`
    width: 25%;
  `}

  ${mediaQuery.greaterThen("xlarge")`
    width: 20%;
  `}
`;

const NoRecipes = styled.div`
  margin-top: 16px;
`;

export default Category;
