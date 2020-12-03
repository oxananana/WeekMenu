import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import mediaQuery from "../../theme/mediaQuery";
import Meal from "./Meal";

const DayMenu = (props) => {
  const {
    day,
    meals,
    addDish,
    removeDish,
    toggleDishIsDone,
    animatedNewDishes,
    resetAnimatedNewDishes,
  } = props;
  const orderedMeals = meals.sort((mealFirst, mealSecond) => {
    if (mealFirst.order > mealSecond.order) {
      return 1;
    } else {
      return -1;
    }
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
              addDish={() => {
                addDish(day.dateString, meal.id, meal.title);
              }}
              removeDish={removeDish}
              toggleDishIsDone={toggleDishIsDone}
              animatedNewDishes={animatedNewDishes}
              resetAnimatedNewDishes={resetAnimatedNewDishes}
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
  addDish: PropTypes.func.isRequired,
  removeDish: PropTypes.func.isRequired,
  toggleDishIsDone: PropTypes.func.isRequired,
  animatedNewDishes: PropTypes.object.isRequired,
  resetAnimatedNewDishes: PropTypes.func.isRequired,
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
