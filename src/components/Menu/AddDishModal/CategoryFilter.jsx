import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { categoriesPropTypes } from "../../../prop-types";
import mediaQuery from "../../../theme/mediaQuery";

const CategoryFilter = (props) => {
  const { categories, activeCategoryId, onChangeFilter } = props;

  return (
    <FilterNav>
      {Object.values(categories).map((category) => {
        return (
          <FilterNavItem
            onClick={() => {
              onChangeFilter(category.id);
            }}
            key={category.id}
            isActive={category.id === activeCategoryId}
          >
            {category.title}
          </FilterNavItem>
        );
      })}
    </FilterNav>
  );
};

CategoryFilter.propTypes = {
  categories: categoriesPropTypes,
  activeCategoryId: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

const FilterNav = styled.ul`
  background-color: ${({ theme }) => theme.bg.base};
  list-style: none;
  border-radius: 4px;
  padding: 4px;
  min-width: 120px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;

  ${mediaQuery.greaterThen("medium")`
    margin-right: 24px;
    margin-bottom: 0;
    display: block;
    padding: 4px 0;
  `}
`;

const FilterNavItem = styled.li`
  padding: 12px 0;
  margin: 0 12px;
  display: block;
  border-bottom: 2px solid transparent;
  color: ${({ theme, isActive }) => isActive && theme.text.primary};
  border-color: ${({ theme, isActive }) =>
    isActive ? theme.border.primary : "transparent"};

  ${mediaQuery.greaterThen("medium")`
    padding: 12px 16px;
    border-bottom: 0;
    border-left-width: 2px;
    border-left-style: solid;
    margin: 0;
  `}

  &:hover, &:focus {
    cursor: pointer;
    color: ${({ theme }) => theme.text.primaryHover};
  }
`;

export default CategoryFilter;
