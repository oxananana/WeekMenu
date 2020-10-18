import React from "react";
import styled from "styled-components";
import cn from "classnames";
import PropTypes from "prop-types";

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
  background-color: ${({ theme }) => theme.bg.baseLight};
  list-style: none;
  border-radius: 4px;
  padding: 4px 0;
  margin-right: 24px;
  min-width: 120px;
`;

const FilterNavItem = styled.li`
  padding: 12px 16px;
  display: block;
  border-left: 2px solid transparent;

  &:hover,
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
