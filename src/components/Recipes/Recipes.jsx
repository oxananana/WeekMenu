import React from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import cn from "classnames";
import { getCategoryRecipes } from "../../selectors/selectors";
import { textColors } from "../../theme/variables";
import Category from "./Category";

const Recipes = (props) => {
  const { categories, recipes } = { ...props };
  const activeCategoryId = useParams()["categoryId"];

  return (
    <>
      <CategoryNav>
        {Object.values(categories).map((category) => {
          return (
            <CategoryNavItem
              key={category.id}
              id={category.id}
              className={cn({ active: category.id === activeCategoryId })}
            >
              <NavLink to={`/recipes/${category.id}`}>{category.title}</NavLink>
            </CategoryNavItem>
          );
        })}
      </CategoryNav>
      <Category
        title={categories[activeCategoryId].title}
        recipes={getCategoryRecipes(recipes, activeCategoryId)}
      />
    </>
  );
};

const CategoryNav = styled.ul`
  display: flex;
  background-color: #fff;
  list-style: none;
  margin: 32px 0;
  padding: 0;
  border-radius: 8px;
`;

const CategoryNavItem = styled.li`
  a {
    padding: 12px 16px;
    display: block;
  }

  a:hover {
    background-color: #f2e9fd;
  }

  a.active {
    color: ${textColors.primary};
  }
`;

export default Recipes;
