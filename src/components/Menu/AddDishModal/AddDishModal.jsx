import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import mediaQuery from "../../../theme/mediaQuery";
import { arrayToEnumString } from "../../../helpers/helpers";
import { defaultCategoryId, weekDaysNames } from "../../../constants";
import { RecipesContext, CategoriesContext } from "../../../index";
import Modal from "../../Common/Modal";
import CategoryFilter from "./CategoryFilter";
import Category from "./Category";

const AddDishModal = (props) => {
  const { isOpen, onClose, onSubmit, day, mealId, mealTitle } = props;

  const { recipes } = useContext(RecipesContext);
  const { categories } = useContext(CategoriesContext);

  const dishes = recipes;

  const [activeCategoryId, setActiveCategoryId] = useState(defaultCategoryId);
  const [selectedDishesIds, setSelectedDishesIds] = useState([]);

  const handleChangeFilter = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const handleSelectDish = (dishId) => {
    if (selectedDishesIds.includes(dishId)) {
      setSelectedDishesIds(
        selectedDishesIds.filter((id) => {
          return id !== dishId;
        })
      );
    } else {
      setSelectedDishesIds([...selectedDishesIds, dishId]);
    }
  };

  const handleSubmit = () => {
    setSelectedDishesIds([]);
    setActiveCategoryId(defaultCategoryId);
    onSubmit(day, mealId, selectedDishesIds);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Добавление блюда — ${mealTitle}, ${formattingDay(day)}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Dishes>
        <CategoryFilter
          categories={categories}
          activeCategoryId={activeCategoryId}
          changeFilter={handleChangeFilter}
        />
        <Category
          categoryId={activeCategoryId}
          dishes={dishes}
          selectDish={handleSelectDish}
          selectedDishesIds={selectedDishesIds}
        />
      </Dishes>
      {selectedDishesIds.length > 0 && (
        <SelectedDishes>
          <SelectedDishesTitle>Выбранные блюда: </SelectedDishesTitle>
          <div>
            {selectedDishesIds &&
              arrayToEnumString(
                selectedDishesIds.map((id) => {
                  return dishes[id].title;
                })
              )}
          </div>
        </SelectedDishes>
      )}
    </Modal>
  );
};

const formattingDay = (day) => {
  const date = new Date(day);
  // const today = new Date();

  // const day = {
  //   date: date.getDate(),
  //   weekDayName: weekDaysNames[date.getDay()],
  //   isWeekend: date.getDay() === 0 || date.getDay() === 6,
  //   isToday: today.toDateString() === date.toDateString(),
  // };

  return `${weekDaysNames[date.getDay()]}, ${date.getDate()}`;
};

AddDishModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  categories: PropTypes.object,
  day: PropTypes.string,
  mealId: PropTypes.string,
  recipes: PropTypes.object,
};

const Dishes = styled.div`
  ${mediaQuery.greaterThen("medium")`
    display: flex;
  `}
`;

const SelectedDishes = styled.div`
  margin-top: 16px;
`;

const SelectedDishesTitle = styled.div`
  color: ${({ theme }) => theme.text.gray};
  margin-bottom: 8px;
`;

export default AddDishModal;
