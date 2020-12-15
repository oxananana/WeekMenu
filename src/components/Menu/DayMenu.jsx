import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import mediaQuery from "../../theme/mediaQuery";
import Meal from "./Meal";

const DayMenu = (props) => {
  const {
    day,
    meals,
    onOpenAddDishModal,
    onRemoveDish,
    onToggleDishIsDone,
    animatedNewDishes,
    onResetAnimatedNewDishes,
  } = props;

  const orderedMeals = [...meals].sort((mealFirst, mealSecond) => {
    return mealFirst.order - mealSecond.order;
  });

  return (
    <StyledDayMenu>
      <DayDate isWeekend={day.isWeekend}>
        {day.weekDayName}, {day.date}
      </DayDate>

      <Meals>
        {orderedMeals.map((meal) => {
          return (
            <Meal
              day={day.dateString}
              id={meal.id}
              title={meal.title}
              dishes={meal.dishes}
              key={meal.id}
              onOpenAddDishModal={() => {
                onOpenAddDishModal(day.dateString, meal.id, meal.title);
              }}
              onRemoveDish={onRemoveDish}
              onToggleDishIsDone={onToggleDishIsDone}
              animatedNewDishes={animatedNewDishes}
              onResetAnimatedNewDishes={onResetAnimatedNewDishes}
            />
          );
        })}
      </Meals>
    </StyledDayMenu>
  );
};

DayMenu.propTypes = {
  day: PropTypes.object.isRequired,
  meals: PropTypes.array.isRequired,
  onOpenAddDishModal: PropTypes.func.isRequired,
  onRemoveDish: PropTypes.func.isRequired,
  onToggleDishIsDone: PropTypes.func.isRequired,
  animatedNewDishes: PropTypes.object.isRequired,
  onResetAnimatedNewDishes: PropTypes.func.isRequired,
};

const StyledDayMenu = styled.div`
  min-width: 240px;
  padding: 0 4px;
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 16px;
  }

  ${mediaQuery.greaterThen("medium")`
    width: 260px;

    & + & {
      margin-top: 0;
    }

    &:first-child {
      padding-left: 8px;
      width: 264px;
    }

    &:last-child {
      padding-right: 8px;
      width: 264px;
    }
  `}
`;

const DayDate = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
  color: ${({ theme, isWeekend }) => isWeekend && theme.text.error};
`;

const Meals = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bg.baseLight};
  padding: 8px;
  border-radius: 4px;
`;

export default DayMenu;
