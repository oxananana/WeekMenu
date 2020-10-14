import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import cn from "classnames";
import PropTypes from "prop-types";
import { getCategoryRecipes } from "../../selectors/selectors";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Icon from "../Common/Icon";
import Category from "./Category";

const Recipes = (props) => {
  const activeCategoryId = useParams()["categoryId"];
  const title = props.categories[activeCategoryId].title;
  useDocumentTitle(title);

  const recipesIds = props.categories[activeCategoryId].recipes;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (recipesIds) {
      setRecipes(getCategoryRecipes(props.recipes, recipesIds));
    } else {
      setRecipes([]);
    }
  }, [props.recipes, activeCategoryId, recipesIds]);

  return (
    <>
      <RecipesNavbar>
        <CategoryNav>
          {Object.values(props.categories).map((category) => {
            return (
              <CategoryNavItem
                key={category.id}
                id={category.id}
                className={cn({ active: category.id === activeCategoryId })}
              >
                <NavLink to={`/recipes/${category.id}`}>
                  {category.title}
                </NavLink>
              </CategoryNavItem>
            );
          })}
        </CategoryNav>
        <AddRecipeLink to="/recipes/new-recipe">
          <Icon name="plus" /> Добавить рецепт
        </AddRecipeLink>
      </RecipesNavbar>
      <Category title={title} recipes={recipes} />
    </>
  );
};

Recipes.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  recipes: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

Recipes.defaultProps = {
  categories: null,
  recipes: null,
};

const RecipesNavbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bg.baseLight};
  margin-bottom: 32px;
  border-radius: 8px;
  border-radius: 8px;
`;

const CategoryNav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
`;

const CategoryNavItem = styled.li`
  a {
    padding: 12px 16px;
    display: block;
    border-bottom: 2px solid transparent;
  }

  a:hover,
  a.active {
    color: ${({ theme }) => theme.text.primaryHover};
  }

  a.active {
    color: ${({ theme }) => theme.text.primary};
    border-color: ${({ theme }) => theme.border.primary};
  }
`;

const AddRecipeLink = styled(NavLink)`
  color: ${({ theme }) => theme.text.primary};
  padding: 12px 16px;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.text.primaryHover};
  }

  svg {
    margin-right: 4px;
  }
`;

export default Recipes;
