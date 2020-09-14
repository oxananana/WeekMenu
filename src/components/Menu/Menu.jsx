import React from "react";
import styled from "styled-components";
import cn from "classnames";
import { bgColors } from "../../theme/variables";

import Meal from "./Meal";

const Menu = (props) => {
  const menu = props.menu;
  const nextDays = returnNextDays();

  return (
    <MenuBoard>
      {nextDays.map((day, index) => {
        let meals = [];

        if (menu[day.dateString]) {
          meals = Object.values(menu[day.dateString]);
        } else {
          alert("добавь день в menu.json");
        }

        return (
          <DayMenu key={index}>
            <DayDate className={cn({ weekend: day.isWeekend })}>
              {day.weekDayName}, {day.date}
            </DayDate>

            <MealsList key={index}>
              {meals.map((meal, index) => {
                return (
                  <Meal title={meal.title} dishes={meal.dishes} key={index} />
                );
              })}
            </MealsList>
          </DayMenu>
        );
      })}
    </MenuBoard>
  );
};

const returnNextDays = () => {
  const weekDaysNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

  const today = new Date();
  let nextDays = [];

  for (let i = 0; i < 7; i++) {
    let newDayDate = new Date();
    newDayDate.setDate(today.getDate() + i);

    let newDayMonth = newDayDate.getMonth() + 1;
    if (newDayMonth < 10) {
      newDayMonth = "0" + newDayMonth;
    }

    const newDay = {
      date: newDayDate.getDate(),
      weekDayName: weekDaysNames[newDayDate.getDay()],
      dateString: `${newDayDate.getFullYear()}-${newDayMonth}-${newDayDate.getDate()}`,
      isWeekend: newDayDate.getDay() === 0 || newDayDate.getDay() === 6,
    };

    nextDays.push(newDay);
  }

  return nextDays;
};

const MenuBoard = styled.div`
  background-color: #fff;
  display: flex;
  padding: 24px 0;
  overflow: auto;
`;

const DayMenu = styled.div`
  min-width: 260px;
  margin: 0 4px;
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-left: 8px;
  }

  &:last-child {
    margin-right: 8px;
  }
`;
const DayDate = styled.div`
  /* display: flex;
  align-items: center; */
  font-weight: bold;
  margin-bottom: 12px;

  &.weekend {
    color: red;
  }
`;

const MealsList = styled.div`
  flex: 1;
  background-color: ${bgColors.base};
  padding: 16px;
  border-radius: 4px;
`;

export default Menu;
