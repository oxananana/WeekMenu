import React from "react";
import styled from "styled-components";
import Icon from "../Common/Icon";
import { shadow, bgColors, textColors } from "../../theme/variables";

const Dish = (props) => {
  const { mealId, dish, removeDish, toggleDishIsDone } = props;
  const { id, title, isDone, imgSrc } = dish;

  return (
    <StyledDish>
      <RemoveIcon onClick={() => removeDish(id, mealId)}>
        <Icon name="delete" />
      </RemoveIcon>
      <CoockingStatus
        isDone={isDone}
        onClick={() => toggleDishIsDone(id, mealId)}
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

const CoockingStatus = styled.span`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  color: ${(props) =>
    props.isDone ? textColors.primary : textColors.grayLight};

  &:hover {
    cursor: pointer;
    color: ${textColors.primaryHover};
  }
`;

const RemoveIcon = styled.span`
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 16px;
  height: 16px;
  color: ${textColors.grayLight};
  opacity: 0;

  &:hover {
    color: red;
  }
`;

const StyledDish = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;

  & + & {
    margin-top: 4px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${shadow};
    ${RemoveIcon} {
      opacity: 1;
    }
  }
`;

const imgContainerCss = `
  border-right: 1px solid ${bgColors.base};
  border-radius: 4px 0 0 4px;
  height: 60px;
  width: 60px;
`;

const DishImg = styled.div`
  ${imgContainerCss};
  background-size: cover;
  background-position: center;
  background-color: #fff;
`;

const ImgPlaceholder = styled.div`
  ${imgContainerCss};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${bgColors.base};
  svg {
    width: 32px;
    height: 32px;
  }
`;

const DishTitle = styled.div`
  flex: 1;
  padding: 0 16px;
  font-size: 14px;
  max-height: 60px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default Dish;
