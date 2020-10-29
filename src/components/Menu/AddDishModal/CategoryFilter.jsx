import React from "react";
import styled from "styled-components";
import cn from "classnames";
import PropTypes from "prop-types";
import mediaQuery from "../../../theme/mediaQuery";

const CategoryFilter = (props) => {
  const { categories, activeCategoryId, changeFilter } = props;

  return (
    <FilterNav>
      {Object.values(categories).map((category) => {
        return (
          <FilterNavItem
            onClick={() => {
              changeFilter(category.id);
            }}
            key={category.id}
            className={cn({ active: category.id === activeCategoryId })}
          >
            {category.title}
          </FilterNavItem>
        );
      })}
    </FilterNav>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.object,
  activeCategoryId: PropTypes.string,
  changeFilter: PropTypes.func,
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

  ${mediaQuery.greaterThen("medium")`
    padding: 12px 16px;
    border-bottom: 0;
    border-left: 2px solid transparent;
    margin: 0;
  `}

  &:hover, &:focus,
  &.active {
    cursor: pointer;
    color: ${({ theme }) => theme.text.primaryHover};
  }

  &.active {
    color: ${({ theme }) => theme.text.primary};
    border-color: ${({ theme }) => theme.border.primary};
  }
`;

export default CategoryFilter;
