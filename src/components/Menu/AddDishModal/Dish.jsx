import React from "react";
import styled from "styled-components";
import cn from "classnames";
import Icon from "../../Common/Icon";
import { shadow, bgColors, textColors } from "../../../theme/variables";

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
          {schedule.map((day, index) => {
            return (
              <RecipeScheduleItem
                key={index}
                className={cn({ active: day.isActive })}
              >
                {day.name}
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
  background-color: #fff;
  position: relative;
  padding-right: 48px;
  border-radius: 4px;

  & + & {
    margin-top: 12px;
  }
  &:hover {
    cursor: pointer;
    box-shadow: ${shadow};
  }

  &.active {
    color: ${textColors.primary};
    /* outline: 2px solid ${bgColors.primary}; */
  }
`;

const imgContainerCss = `
  border-right: 1px solid ${bgColors.base};
  border-radius: 4px 0 0 4px;
  height: 60px;
  width: 60px;
  margin-right: 16px;
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
  color: ${textColors.gray};

  &.active {
    color: ${textColors.base};
  }
`;

const CheckedIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 18px;
  color: ${bgColors.primary};

  svg {
    height: 24px;
    width: 24px;
  }
`;

export default Dish;
