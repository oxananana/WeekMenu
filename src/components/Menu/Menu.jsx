import React, { useState } from "react";
import styled from "styled-components";
import cn from "classnames";
import { getDishById } from "../../selectors/selectors";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Meals from "./Meals";
import AddDishModal from "./AddDishModal/AddDishModal";

const Menu = (props) => {
  useDocumentTitle(props.docTitle);
  const dates = props.menu.dates;
  const menu = props.menu.menu;
  const recipes = props.recipes;
  const categories = props.categories;

  const [meals, setMeals] = useState(props.menu.meals);
  const [dishes, setDishes] = useState(props.menu.dishes);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableDay, setEditableDay] = useState("");
  const [editableMeal, setEditableMeal] = useState("");

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const addDish = (day, mealId) => {
    setModalIsOpen(true);
    setEditableDay(day);
    setEditableMeal(mealId);
  };

  const removeDish = (dishId, mealId) => {
    const newMeals = {
      ...meals,
      [mealId]: {
        ...meals[mealId],
        dishes: meals[mealId].dishes.filter((dish) => dish.id !== dishId),
      },
    };
    setMeals(newMeals);
  };

  const toggleDishIsDone = (dishId, mealId) => {
    const newMeals = {
      ...meals,
      [mealId]: {
        ...meals[mealId],
        dishes: meals[mealId].dishes.map((dish) => {
          if (dish.id === dishId) {
            return { ...dish, isDone: !dish.isDone };
          }
          return dish;
        }),
      },
    };
    setMeals(newMeals);
  };

  const handleSubmit = (selectedDishesIds, mealId) => {
    const unduplicatedDishesIds = selectedDishesIds.filter((id) => {
      return !meals[mealId].dishes.some((dish) => dish.id === id);
    });
    const unduplicatedDishes = unduplicatedDishesIds.map((id) => {
      return { id: id, isDone: false };
    });
    const newMeals = {
      ...meals,
      [mealId]: {
        ...meals[mealId],
        dishes: meals[mealId].dishes.concat(unduplicatedDishes),
      },
    };
    setMeals(newMeals);

    const newDishes = { ...dishes };
    selectedDishesIds.forEach((id) => {
      newDishes[id] = { ...getDishById(recipes, id) };
    });
    setDishes(newDishes);
  };

  return (
    <MenuPage>
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
                toggleDishIsDone={toggleDishIsDone}
                day={`${day.weekDayName}, ${day.date}`}
              />
            </DayMenu>
          );
        })}
      </MenuBoard>
    </MenuPage>
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

// const returnNextDays = () => {
//   const weekDaysNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

//   const today = new Date();
//   let nextDays = [];

//   for (let i = 0; i < 7; i++) {
//     let newDayDate = new Date();
//     newDayDate.setDate(today.getDate() + i);

//     let newDayMonth = newDayDate.getMonth() + 1;
//     if (newDayMonth < 10) {
//       newDayMonth = "0" + newDayMonth;
//     }

//     const newDay = {
//       date: newDayDate.getDate(),
//       weekDayName: weekDaysNames[newDayDate.getDay()],
//       dateString: `${newDayDate.getFullYear()}-${newDayMonth}-${newDayDate.getDate()}`,
//       isWeekend: newDayDate.getDay() === 0 || newDayDate.getDay() === 6,
//     };

//     nextDays.push(newDay);
//   }

//   return nextDays;
// };

const MenuPage = styled.div`
  padding: 24px 0;
  flex: 1;
  background-color: ${({ theme }) => theme.bg.baseLight};
`;

const MenuBoard = styled.div`
  display: flex;
  overflow: auto;
`;

const DayMenu = styled.div`
  width: 260px;
  min-width: 240px;
  padding: 0 4px;
  display: flex;
  flex-direction: column;

  &:first-child {
    padding-left: 8px;
  }

  &:last-child {
    padding-right: 8px;
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
    color: ${({ theme }) => theme.text.primary};
  }
`;

export default Menu;
