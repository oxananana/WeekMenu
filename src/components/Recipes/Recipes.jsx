import React from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { categoriesPropTypes } from "../../prop-types";
import mediaQuery from "../../theme/mediaQuery";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Icon from "../Common/Icon";
import Category from "./Category";

const Recipes = (props) => {
  const { categories } = props;
  const activeCategoryId = useParams()["categoryId"];
  const title = props.categories[activeCategoryId].title;
  useDocumentTitle(title);

  return (
    <>
      <RecipesNavbar>
        <CategoryNav>
          {Object.values(categories).map((category) => {
            return (
              <CategoryNavItem key={category.id}>
                <CategoryNavLink to={`/recipes/${category.id}`}>
                  {category.title}
                </CategoryNavLink>
              </CategoryNavItem>
            );
          })}
        </CategoryNav>
        <AddRecipeLink to="/recipes/new-recipe">
          <Icon name="plus" /> Добавить рецепт
        </AddRecipeLink>
      </RecipesNavbar>
      <Category title={title} categoryId={activeCategoryId} />
    </>
  );
};

Recipes.propTypes = {
  categories: categoriesPropTypes,
};

Recipes.defaultProps = {
  categories: null,
};

const RecipesNavbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bg.base};
  margin-bottom: 32px;
  border-radius: 8px;
  border-radius: 8px;
  padding: 6px 16px;

  ${mediaQuery.greaterThen("medium")`
    padding: 0 24px;
  `}
`;

const CategoryNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
`;

const CategoryNavItem = styled.li`
  margin-right: 24px;
`;

const CategoryNavLink = styled((props) => {
  const { children, ...rest } = props;

  return <NavLink {...rest}>{children}</NavLink>;
})`
  padding: 12px 0;
  display: block;
  border-bottom: 2px solid transparent;

  &:hover {
    color: ${({ theme }) => theme.text.primaryHover};
  }

  &.active {
    color: ${({ theme }) => theme.text.primary};
    border-color: ${({ theme }) => theme.border.primary};
  }
`;

const AddRecipeLink = styled(NavLink)`
  color: ${({ theme }) => theme.text.primary};
  padding: 8px 0;
  display: inline-flex;
  align-items: center;

  ${mediaQuery.greaterThen("medium")`
    padding: 12px 0;
  `}

  &:hover {
    color: ${({ theme }) => theme.text.primaryHover};
  }

  svg {
    margin-right: 4px;
  }
`;

export default Recipes;
