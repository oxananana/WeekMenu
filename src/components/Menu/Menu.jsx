import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import { getDishById } from "../../selectors/selectors";
import { textColors } from "../../theme/variables";
import Meals from "./Meals";
import AddDishModal from "./AddDishModal/AddDishModal";

const Menu = (props) => {
  const dates = props.menu.dates;
  const menu = props.menu.menu;
  const recipes = props.recipes;
  const categories = props.categories;

  const [meals, setMeals] = useState(props.menu.meals);
  const [dishes, setDishes] = useState(props.menu.dishes);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableDay, setEditableDay] = useState("");
  const [editableMeal, setEditableMeal] = useState("");

  // const nextDays = returnNextDays();

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const addDish = (day, mealId) => {
    setModalIsOpen(true);
    setEditableDay(day);
    setEditableMeal(mealId);
  };

  const removeDish = (mealId, dishId) => {
    let newMeals = {
      ...meals,
      [mealId]: {
        ...meals[mealId],
        dishes: meals[mealId].dishes.filter((id) => id !== dishId),
      },
    };
    setMeals(newMeals);
  };

  const handleSubmit = (selectedDishesIds, mealId) => {
    let unduplicatedDishesId = selectedDishesIds.filter((id) => {
      return !meals[mealId].dishes.includes(id);
    });
    let newMeals = {
      ...meals,
      [mealId]: {
        ...meals[mealId],
        dishes: meals[mealId].dishes.concat(unduplicatedDishesId),
      },
    };
    setMeals(newMeals);

    let newDishes = { ...dishes };
    selectedDishesIds.forEach((id) => {
      newDishes[id] = { ...getDishById(recipes, id), isDone: false };
    });
    setDishes(newDishes);
  };

  return (
    <>
      <AddDishModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        recipes={recipes}
        categories={categories}
        day={editableDay}
        mealId={editableMeal}
      />

      <MenuBoard>
        {dates.map((date, index) => {
          const day = formattingDay(date);
          const mealsIds = menu[date].meals;
          console.log(meals);

          return (
            <DayMenu key={index}>
              <DayDate
                className={cn({ weekend: day.isWeekend, today: day.isToday })}
              >
                {day.weekDayName}, {day.date}
                {day.isToday && " — Сегодня"}
              </DayDate>

              <Meals
                mealsIds={mealsIds}
                dishes={dishes}
                meals={meals}
                addDish={addDish}
                removeDish={removeDish}
                day={`${day.weekDayName}, ${day.date}`}
              />
            </DayMenu>
          );
        })}
      </MenuBoard>
    </>
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
  min-width: 240px;
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

export default Menu;
