import React from "react";
import PropTypes from "prop-types";
import { dishPropTypes } from "./prop-types";
import styled from "styled-components";
import Icon from "../Common/Icon";

const Dish = (props) => {
  const { day, mealId, dish, isDone, removeDish, toggleDishIsDone } = props;
  const { id, title, imgSrc } = dish;

  return (
    <StyledDish>
      <RemoveIcon onClick={() => removeDish(day, mealId, id)}>
        <Icon name="delete" />
      </RemoveIcon>
      <CoockingStatus
        isDone={isDone}
        onClick={() => toggleDishIsDone(day, mealId, id, isDone)}
      >
        <Icon name="check" />
      </CoockingStatus>
      {imgSrc ? (
        <DishImg style={{ backgroundImage: `url(${imgSrc})` }} />
      ) : (
        <ImgPlaceholder>
          <Icon name="camera" />
        </ImgPlaceholder>
      )}
      <DishTitle>{title}</DishTitle>
    </StyledDish>
  );
};

Dish.propTypes = {
  dish: PropTypes.exact(dishPropTypes),
  isDone: PropTypes.bool.isRequired,
  day: PropTypes.string.isRequired,
  mealId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  removeDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
};

const CoockingStatus = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  color: ${({ isDone, theme }) =>
    isDone ? theme.text.primary : theme.text.grayLight};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.text.primaryHover};
  }
`;

const RemoveIcon = styled.span`
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 16px;
  height: 16px;
  color: ${({ theme }) => theme.text.grayLight};
  opacity: 0;

  &:hover {
    color: red;
  }
`;

const StyledDish = styled.div`
  background-color: ${({ theme }) => theme.bg.baseLight};
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;

  & + & {
    margin-top: 4px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.base};
    ${RemoveIcon} {
      opacity: 1;
    }
  }
`;

const imgContainerCss = `
border-radius: 4px 0 0 4px;
height: 60px;
width: 60px;
`;

const DishImg = styled.div`
  ${imgContainerCss};
  border-right: 1px solid ${({ theme }) => theme.bg.base};
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.bg.baseLight};
`;

const ImgPlaceholder = styled.div`
  ${imgContainerCss};
  border-right: 1px solid ${({ theme }) => theme.bg.base};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg.base};
  svg {
    width: 32px;
    height: 32px;
  }
`;

const DishTitle = styled.div`
  flex: 1;
  padding: 0 20px 0 12px;
  font-size: 14px;
  max-height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default Dish;
