import React from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import cn from "classnames";
import { getCategoryRecipes } from "../../selectors/selectors";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { textColors, borderColors } from "../../theme/variables";
import Icon from "../Common/Icon";
import Category from "./Category";

const Recipes = (props) => {
  const activeCategoryId = useParams()["categoryId"];
  const title = props.categories[activeCategoryId].title;
  const recipes = getCategoryRecipes(props.recipes, activeCategoryId);
  useDocumentTitle(title);

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

const RecipesNavbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fff;
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
    color: ${textColors.primaryHover};
  }

  a.active {
    color: ${textColors.primary};
    border-color: ${borderColors.primary};
  }
`;

const AddRecipeLink = styled(NavLink)`
  color: ${textColors.primary};
  padding: 12px 16px;
  display: inline-flex;
  align-items: center;

  &:hover {
    color: ${textColors.primaryHover};
  }

  svg {
    margin-right: 4px;
  }
`;

export default Recipes;
