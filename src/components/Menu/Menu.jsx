import React, { useState, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import mediaQuery from "../../theme/mediaQuery";
// import { getWeekDayName } from "../../helpers/helpers";
import { getMealsByDay } from "../../selectors/selectors";
import { weekDaysNames } from "../../constants";
import menuAPI from "../../api/menuAPI";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import DayMenu from "./DayMenu";
import AddDishModal from "./AddDishModal/AddDishModal";

const Menu = (props) => {
  useDocumentTitle(props.docTitle);
  const { menu, setMenu } = props;
  const weekDays = returnNextDays();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editableDay, setEditableDay] = useState("");
  const [editableMeal, setEditableMeal] = useState("");
  const [editableMealTitle, setEditableMealTitle] = useState("");

  const updateDishes = (day, mealId, newDishes) => {
    let updates = {};
    updates[`menu/${day}/meals/${mealId}/dishes`] = newDishes;
    // updates[`recipes/${dishId}/schedule/${getWeekDayName(day)}`] = false;

    menuAPI
      .updateDishes(updates)
      .then(() => {
        console.log("success update dishes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeDish = (day, mealId, dishId) => {
    const currentMeals = getMealsByDay(menu, day);
    const currentMeal = currentMeals[mealId];
    const currentDishes = currentMeal.dishes || [];

    const newDishes = currentDishes.filter((dish) => {
      return dish.id !== dishId;
    });

    setMenu({
      ...menu,
      [day]: {
        meals: {
          ...currentMeals,
          [mealId]: { ...currentMeal, dishes: newDishes },
        },
      },
    });
    // setRecipes(response.recipes);

    updateDishes(day, mealId, newDishes);
  };

  const toggleDishIsDone = (day, mealId, dishId) => {
    const currentMeals = getMealsByDay(menu, day);
    const currentMeal = currentMeals[mealId];
    const currentDishes = currentMeal.dishes || [];

    const newDishes = currentDishes.map((dish) => {
      if (dish.id === dishId) {
        return { ...dish, isDone: !dish.isDone };
      }
      return dish;
    });

    setMenu({
      ...menu,
      [day]: {
        meals: {
          ...currentMeals,
          [mealId]: { ...currentMeal, dishes: newDishes },
        },
      },
    });

    updateDishes(day, mealId, newDishes);
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
    const currentMeals = getMealsByDay(menu, day);
    const currentMeal = currentMeals[mealId];
    const currentDishes = currentMeal.dishes || [];

    const newDishes = [
      ...currentDishes,
      ...selectedDishesIds.map((id) => {
        return {
          id: id,
          isDone: false,
        };
      }),
    ];

    setMenu({
      ...menu,
      [day]: {
        meals: {
          ...currentMeals,
          [mealId]: { ...currentMeal, dishes: newDishes },
        },
      },
    });

    updateDishes(day, mealId, newDishes);
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

      if (prevMealId === newMealId) {
        const currentMeals = getMealsByDay(menu, prevDay);
        const currentMeal = currentMeals[prevMealId];
        const mealDishes = currentMeal.dishes;

        const [removed] = mealDishes.splice(oldIndex, 1);
        mealDishes.splice(newIndex, 0, removed);

        setMenu({
          ...menu,
          [prevDay]: {
            meals: {
              ...currentMeals,
              [prevMealId]: { ...currentMeal, dishes: mealDishes },
            },
          },
        });

        updateDishes(newDay, newMealId, mealDishes);
      } else {
        const currentMealsPrevDay = getMealsByDay(menu, prevDay);
        const currentMealPrevDay = currentMealsPrevDay[prevMealId];
        const prevMealDishes = currentMealPrevDay.dishes;

        const currentMealsNewDay = getMealsByDay(menu, newDay);
        const currentMealNewDay = currentMealsNewDay[newMealId];
        const newMealDishes = currentMealNewDay.dishes || [];

        const [removed] = prevMealDishes.splice(oldIndex, 1);
        newMealDishes.splice(newIndex, 0, removed);

        setMenu({
          ...menu,
          [prevDay]: {
            meals: {
              ...currentMealsPrevDay,
              [prevMealId]: { ...currentMealPrevDay, dishes: prevMealDishes },
            },
          },
          [newDay]: {
            meals: {
              ...currentMealsNewDay,
              [newMealId]: { ...currentMealNewDay, dishes: newMealDishes },
            },
          },
        });

        updateDishes(prevDay, prevMealId, prevMealDishes);
        updateDishes(newDay, newMealId, newMealDishes);
      }
    },
    [setMenu, menu]
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
