import React, { useState } from "react";
import PropTypes from "prop-types";
import { dishPropTypes } from "../../prop-types";
import { Draggable } from "react-beautiful-dnd";
import styled, { keyframes, css } from "styled-components";
import Icon from "../Common/Icon";

const Dish = (props) => {
  const {
    index,
    day,
    mealId,
    dish,
    isDone,
    onRemoveDish,
    onToggleDishIsDone,
    isNew,
    onResetAnimatedNewDishes,
  } = props;
  const { id, title, imgSrc } = dish;

  const [isRemoved, setIsRemoved] = useState(false);

  const handleSetDishIsRemoved = () => {
    setIsRemoved(true);
  };

  const handleAnimationEnd = () => {
    if (isRemoved) {
      onRemoveDish(day, mealId, id);
    }
    if (isNew) {
      onResetAnimatedNewDishes();
    }
  };

  return (
    <Draggable draggableId={id + mealId + index} index={index}>
      {(provided, snapshot) => {
        return (
          <StyledDish
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isNew={isNew}
            isRemoved={isRemoved}
            onAnimationEnd={handleAnimationEnd}
          >
            <RemoveIcon onClick={handleSetDishIsRemoved}>
              <Icon name="delete" />
            </RemoveIcon>
            <CoockingStatus
              isDone={isDone}
              onClick={() => onToggleDishIsDone(day, mealId, id)}
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
      }}
    </Draggable>
  );
};

Dish.propTypes = {
  dish: PropTypes.exact(dishPropTypes),
  index: PropTypes.number.isRequired,
  isDone: PropTypes.bool.isRequired,
  day: PropTypes.string.isRequired,
  mealId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onRemoveDish: PropTypes.func.isRequired,
  onToggleDishIsDone: PropTypes.func.isRequired,
  onResetAnimatedNewDishes: PropTypes.func.isRequired,
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
    color: ${({ theme }) => theme.text.error};
  }
`;

const fadeOut = keyframes`
 0% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const appearance = (props) => keyframes`
 0% {
    box-shadow: 0 0 0 0 ${props.startColor};
  }
  70% {
    box-shadow: 0 0 0 10px ${props.endColor};
  }
  100% {
    box-shadow: 0 0 0 0 ${props.endColor};
  }
`;

const appearanceAnimation = (color) =>
  css`
    ${appearance(color)} .8s ease-out
  `;

const fadeOutAnimation = css`
  ${fadeOut} .2s ease-out forwards
`;

const StyledDish = styled.div`
  background-color: ${({ theme }) => theme.bg.base};
  display: flex;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 4px;
  position: relative;
  box-shadow: ${({ isDragging, theme }) =>
    isDragging && theme.shadow.draggable};

  animation: ${({ isNew, theme }) =>
    isNew &&
    appearanceAnimation({
      startColor: theme.bg.pulseStart,
      endColor: theme.bg.pulseEnd,
    })};
  animation: ${({ isRemoved }) => isRemoved && fadeOutAnimation};

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
  min-width: 60px;
`;

const DishImg = styled.div`
  ${imgContainerCss};
  border-right: 1px solid ${({ theme }) => theme.bg.baseLight};
  background-size: cover;
  background-position: center;
  background-color: ${({ theme }) => theme.bg.base};
`;

const ImgPlaceholder = styled.div`
  ${imgContainerCss};
  border-right: 1px solid ${({ theme }) => theme.bg.baseLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.bg.baseLight};
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
