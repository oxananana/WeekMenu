import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import { getDishesForMeal, getMealById } from "../../selectors/selectors";
import { bgColors, textColors } from "../../theme/variables";
import Meal from "./Meal";

const Menu = (props) => {
  const dates = props.menu.dates;
  const menu = props.menu.menu;
  const [meals, setMeals] = useState(props.menu.meals);
  const [dishes, setDishes] = useState(props.menu.dishes);
  // const nextDays = returnNextDays();

  const removeDish = (date, mealId, dishId) => {
    let newMeals = { ...meals };
    // debugger;
    newMeals[mealId].dishes = newMeals[mealId].dishes.filter((id) => {
      return id !== dishId;
    });
    setMeals({ ...newMeals });
  };

  return (
    <MenuBoard>
      {dates.map((date, index) => {
        const day = formattingDay(date);
        const mealsIds = menu[date].meals;

        return (
          <DayMenu key={index}>
            <DayDate
              className={cn({ weekend: day.isWeekend, today: day.isToday })}
            >
              {day.weekDayName}, {day.date}
              {day.isToday && " — Сегодня"}
            </DayDate>

            <Meals>
              {mealsIds.map((id) => {
                const meal = getMealById(meals, id);
                return (
                  <Meal
                    date={date}
                    id={meal.id}
                    title={meal.title}
                    dishes={getDishesForMeal(dishes, meal.dishes)}
                    key={meal.id}
                    removeDish={removeDish}
                  />
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
  width: 260px;
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
