import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import { bgColors, textColors } from "../../theme/variables";
import data from "../../data/menu";
import Meal from "./Meal";

const Menu = (props) => {
  const [menu, setMenu] = useState(data);
  const dates = Object.keys(menu);
  const nextDays = returnNextDays();

  return (
    <MenuBoard>
      {dates.map((date, index) => {
        const day = formattingDay(date);
        const meals = Object.values(menu[date]);

        return (
          <DayMenu key={index}>
            <DayDate
              className={cn({ weekend: day.isWeekend, today: day.isToday })}
            >
              {day.weekDayName}, {day.date}
              {day.isToday && " — Сегодня"}
            </DayDate>

            <Meals>
              {meals.map((meal) => {
                return (
                  <Meal title={meal.title} dishes={meal.dishes} key={meal.id} />
                );
              })}
            </Meals>
          </DayMenu>
        );
      })}
    </MenuBoard>
  );
};

const formattingDay = (dateString) => {
  const weekDaysNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const date = new Date(dateString);
  const today = new Date();

  const day = {
    date: date.getDate(),
    weekDayName: weekDaysNames[date.getDay()],
    isWeekend: date.getDay() === 0 || date.getDay() === 6,
    isToday: today.toDateString() === date.toDateString(),
  };

  return day;
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

  &.today {
    color: ${textColors.primary};
  }
`;

const Meals = styled.div`
  flex: 1;
  background-color: ${bgColors.base};
  padding: 16px;
  border-radius: 4px;
`;

export default Menu;
