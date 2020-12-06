import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import mediaQuery from "../../theme/mediaQuery";
import { categoriesPropTypes } from "../../prop-types";
import { weekDaysNames } from "../../constants";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import DayMenu from "./DayMenu";
import AddDishModal from "./AddDishModal/AddDishModal";

const Menu = (props) => {
  useDocumentTitle();
  const { menu, changeMenu, categories } = props;
  const weekDays = returnNextDays();

  const [animatedNewDishes, setAnimatedNewDishes] = useState({});

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableDay, setEditableDay] = useState("");
  const [editableMeal, setEditableMeal] = useState("");
  const [editableMealTitle, setEditableMealTitle] = useState("");

  const removeDish = (day, mealId, dishId) => {
    const currentDishes = menu[day].meals[mealId].dishes;

    const newDishes = currentDishes.filter((dish) => {
      return dish.id !== dishId;
    });

    changeMenu({ day, mealId, newDishes });
  };

  const toggleDishIsDone = (day, mealId, dishId) => {
    const currentDishes = menu[day].meals[mealId].dishes;

    const newDishes = currentDishes.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, isDone: !dish.isDone };
      }
      return dish;
    });

    changeMenu({ day, mealId, newDishes });
  };

  const addDish = (day, mealId, mealTitle) => {
    setModalIsOpen(true);
    setEditableDay(day);
    setEditableMeal(mealId);
    setEditableMealTitle(mealTitle);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (day, mealId, selectedDishesIds) => {
    setAnimatedNewDishes({ new: selectedDishesIds.map((id) => mealId + id) });

    const currentDishes = menu[day].meals[mealId].dishes || [];

    const uniqueSelectedDishesIds = selectedDishesIds.filter((id) => {
      return !currentDishes.some((dish) => {
        return dish.id === id;
      });
    });

    const newDishes = [
      ...currentDishes,
      ...uniqueSelectedDishesIds.map((id) => {
        return {
          id: id,
          isDone: false,
        };
      }),
    ];

    changeMenu({ day, mealId, newDishes });
  };

  const handleDragEnd = useCallback(
    (result) => {
      const { destination, source } = result;

      if (!destination) {
        return;
      }

      const sourceParams = JSON.parse(source.droppableId);
      const destinationParams = JSON.parse(destination.droppableId);
      const newIndex = destination.index;
      const oldIndex = source.index;

      const prevMealId = sourceParams.id;
      const newMealId = destinationParams.id;

      if (prevMealId === newMealId && newIndex === oldIndex) {
        return;
      }

      const prevDay = sourceParams.day;
      const newDay = destinationParams.day;

      if (prevMealId === newMealId) {
        const mealDishes = menu[prevDay].meals[prevMealId].dishes;

        const [removed] = mealDishes.splice(oldIndex, 1);
        mealDishes.splice(newIndex, 0, removed);

        changeMenu({ day: prevDay, mealId: prevMealId, newDishes: mealDishes });
      } else {
        const prevMealDishes = menu[prevDay].meals[prevMealId].dishes;
        const newMealDishes = menu[newDay].meals[newMealId].dishes || [];

        const [removed] = prevMealDishes.splice(oldIndex, 1);
        newMealDishes.splice(newIndex, 0, removed);

        changeMenu(
          { day: prevDay, mealId: prevMealId, newDishes: prevMealDishes },
          { day: newDay, mealId: newMealId, newDishes: newMealDishes }
        );
      }
    },
    [changeMenu, menu]
  );

  const handleResetAnimatedNewDishes = () => {
    setAnimatedNewDishes({});
  };

  return (
    <MenuPage>
      <AddDishModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        day={editableDay}
        mealId={editableMeal}
        mealTitle={editableMealTitle}
        categories={categories}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <MenuBoard>
          {weekDays.map((day, index) => {
            const meals = Object.values(menu[day.dateString].meals);

            return (
              <DayMenu
                animatedNewDishes={animatedNewDishes}
                resetAnimatedNewDishes={handleResetAnimatedNewDishes}
                key={index}
                day={day}
                meals={meals}
                toggleDishIsDone={toggleDishIsDone}
                addDish={addDish}
                removeDish={removeDish}
              />
            );
          })}
        </MenuBoard>
      </DragDropContext>
    </MenuPage>
  );
};

Menu.propTypes = {
  categories: categoriesPropTypes,
  docTitle: PropTypes.string,
  menu: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object])
    .isRequired,
  changeMenu: PropTypes.func.isRequired,
};

const returnNextDays = () => {
  const today = new Date();
  let nextDays = [];

  const addZero = (number) => {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  };

  for (let i = 0; i < 7; i++) {
    let newDayDate = new Date();
    newDayDate.setDate(today.getDate() + i);

    const newDayMonth = newDayDate.getMonth() + 1;

    const newDay = {
      date: newDayDate.getDate(),
      weekDayName: weekDaysNames[newDayDate.getDay()],
      dateString: `${newDayDate.getFullYear()}-${addZero(
        newDayMonth
      )}-${addZero(newDayDate.getDate())}`,
      isWeekend: newDayDate.getDay() === 0 || newDayDate.getDay() === 6,
    };

    nextDays.push(newDay);
  }

  return nextDays;
};

const MenuPage = styled.div`
  padding: 24px 0;
  flex: 1;
  background-color: ${({ theme }) => theme.bg.base};
`;

const MenuBoard = styled.div`
  margin: 0 auto;
  padding: 0 16px;

  ${mediaQuery.greaterThen("medium")`
    padding: 0;
    display: flex;
    overflow: auto;
    padding-bottom: 12px;
    max-width: calc((260px * 5) + (264px * 2));
  `}
`;

export default Menu;
