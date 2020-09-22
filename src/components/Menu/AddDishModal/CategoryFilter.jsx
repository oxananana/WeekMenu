import React from "react";
import styled from "styled-components";
import cn from "classnames";
import { textColors, bgColors } from "../../../theme/variables";

const CategoryFilter = (props) => {
  const { categories, activeCategoryId, changeFilter } = { ...props };

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

const FilterNav = styled.ul`
  background-color: #fff;
  list-style: none;
  border-radius: 8px;
  margin-right: 24px;
  min-width: 120px;
`;

const FilterNavItem = styled.li`
  padding: 12px 16px;
  display: block;

  &:hover {
    cursor: pointer;
    background-color: #f2e9fd;
  }

  &.active {
    color: ${textColors.primary};
  }
`;

export default CategoryFilter;
