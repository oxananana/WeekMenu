import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import * as firebase from "firebase/app";
import "firebase/database";
// import { getWeekDayName } from "../../helpers/helpers";
import { getMealDishesByDay } from "../../selectors/selectors";
import { weekDaysNames } from "../../constants";
import api from "../../api/api";
import menuAPI from "../../api/menuAPI";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import DayMenu from "./DayMenu";
import AddDishModal from "./AddDishModal/AddDishModal";

const Menu = (props) => {
  useDocumentTitle(props.docTitle);
  const { menu, setMenu, setRecipes } = props;
  const weekDays = returnNextDays();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableDay, setEditableDay] = useState("");
  const [editableMeal, setEditableMeal] = useState("");
  const [editableMealTitle, setEditableMealTitle] = useState("");

  const removeDish = (day, mealId, dishId) => {
    const currentDishes = getMealDishesByDay(menu, day, mealId);

    const newDishes = currentDishes.filter((dish) => {
      return dish.id !== dishId;
    });

    let updates = {};
    updates[`menu/${day}/meals/${mealId}/dishes`] = newDishes;
    // updates[`recipes/${dishId}/schedule/${getWeekDayName(day)}`] = false;

    const db = firebase.database();

    db.ref().update(updates, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success delete dish");
        api
          .getMenuAndRecipes()
          .then((response) => {
            setMenu(response.menu);
            setRecipes(response.recipes);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const toggleDishIsDone = (day, mealId, dishId) => {
    const db = firebase.database();

    const currentDishes = getMealDishesByDay(menu, day, mealId);

    const newDishes = currentDishes.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, isDone: !dish.isDone };
      }
      return dish;
    });

    db.ref(`menu/${day}/meals/${mealId}/dishes`).set(newDishes, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success toggle dish");
        menuAPI
          .getMenu()
          .then((response) => {
            setMenu(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
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
    let updates = {};

    const currentDishes = getMealDishesByDay(menu, day, mealId);

    const newDishes = [
      ...currentDishes,
      ...selectedDishesIds.map((id) => {
        return {
          id: id,
          isDone: false,
        };
      }),
    ];

    updates[`menu/${day}/meals/${mealId}/dishes`] = newDishes;
    // updates[`recipes/${id}/schedule/${getWeekDayName(day)}`] = true;

    const db = firebase.database();

    db.ref().update(updates, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success add dishes");
        api
          .getMenuAndRecipes()
          .then((response) => {
            setMenu(response.menu);
            setRecipes(response.recipes);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const onDragEnd = useCallback(
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

      let updates = {};

      if (prevMealId === newMealId) {
        const mealDishes = getMealDishesByDay(menu, prevDay, prevMealId);

        const [removed] = mealDishes.splice(oldIndex, 1);
        mealDishes.splice(newIndex, 0, removed);

        updates[`menu/${newDay}/meals/${newMealId}/dishes`] = mealDishes;
      } else {
        const prevMealDishes = getMealDishesByDay(menu, prevDay, prevMealId);
        const newMealDishes = getMealDishesByDay(menu, newDay, newMealId);

        const [removed] = prevMealDishes.splice(oldIndex, 1);
        newMealDishes.splice(newIndex, 0, removed);

        updates[`menu/${prevDay}/meals/${prevMealId}/dishes`] = prevMealDishes;
        updates[`menu/${newDay}/meals/${newMealId}/dishes`] = newMealDishes;
      }

      // updates[`recipes/${dishId}/schedule/${prevDay}`] = null;

      const db = firebase.database();

      db.ref().update(updates, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("success move dishes");
          api
            .getMenuAndRecipes()
            .then((response) => {
              setMenu(response.menu);
              setRecipes(response.recipes);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    [setMenu, setRecipes, menu]
  );

  return (
    <MenuPage>
      <AddDishModal
        isOpen={modalIsOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        day={editableDay}
        mealId={editableMeal}
        mealTitle={editableMealTitle}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <MenuBoard>
          {weekDays.map((day, index) => {
            const meals = Object.values(menu[day.dateString].meals);

            return (
              <DayMenu
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
  docTitle: PropTypes.string,
  menu: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  setMenu: PropTypes.func.isRequired,
  setRecipes: PropTypes.func.isRequired,
};

const returnNextDays = () => {
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

const MenuPage = styled.div`
  padding: 24px 0;
  flex: 1;
  background-color: ${({ theme }) => theme.bg.base};
`;

const MenuBoard = styled.div`
  display: flex;
  overflow: auto;
  max-width: calc((260px * 5) + (264px * 2));
  margin: 0 auto;
  padding-bottom: 16px;
`;

export default Menu;
