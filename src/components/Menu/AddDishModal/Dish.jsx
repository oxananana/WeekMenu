import React from "react";
import styled from "styled-components";
import cn from "classnames";
import { weekDaysNamesRU } from "../../../constants";
import Icon from "../../Common/Icon";

const Dish = (props) => {
  const { id, title, imgSrc, schedule, isActive, selectDish } = props;

  return (
    <StyledDish
      className={cn({ active: isActive })}
      onClick={() => {
        selectDish(id);
      }}
    >
      {imgSrc ? (
        <DishImg style={{ backgroundImage: `url(${imgSrc})` }} />
      ) : (
        <ImgPlaceholder>
          <Icon name="camera" />
        </ImgPlaceholder>
      )}
      <div>
        <DishTitle>{title}</DishTitle>
        <RecipeSchedule>
          {weekDaysNamesRU.map((day, index) => {
            const isActive = schedule && schedule[day];
            return (
              <RecipeScheduleItem
                key={index}
                className={cn({ active: isActive })}
              >
                {day}
              </RecipeScheduleItem>
            );
          })}
        </RecipeSchedule>
      </div>
      {isActive && (
        <CheckedIcon>
          <Icon name="check" />
        </CheckedIcon>
      )}
    </StyledDish>
  );
};

const StyledDish = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg.baseLight};
  position: relative;
  padding-right: 48px;
  border-radius: 4px;

  & + & {
    margin-top: 12px;
  }

  &:hover {
    cursor: pointer;
    box-shadow: ${({ theme }) => theme.shadow.base};
  }

  &.active {
    color: ${({ theme }) => theme.text.primary};
    /* outline: 2px solid ${({ theme }) => theme.bg.primary}; */
  }
`;

const imgContainerCss = `
  border-radius: 4px 0 0 4px;
  height: 60px;
  width: 60px;
  margin-right: 12px;
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
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RecipeSchedule = styled.ul`
  display: flex;
  margin: 8px -4px 0;
  font-size: 12px;
`;

const RecipeScheduleItem = styled.li`
  margin: 0 4px;
  color: ${({ theme }) => theme.text.gray};

  &.active {
    color: ${({ theme }) => theme.text.base};
  }
`;

const CheckedIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 18px;
  color: ${({ theme }) => theme.bg.primary};

  svg {
    height: 24px;
    width: 24px;
  }
`;

export default Dish;
