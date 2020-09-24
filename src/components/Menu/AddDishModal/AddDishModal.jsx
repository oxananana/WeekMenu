import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../Common/Modal";
import CategoryFilter from "./CategoryFilter";
import Category from "./Category";
import { getCategoryRecipes } from "../../../selectors/selectors";

const AddDishModal = (props) => {
  const { isOpen, onClose, onSubmit, categories, day, mealId } = { ...props };
  const dishes = props.recipes;
  const [activeCategoryId, setActiveCategoryId] = useState("soups");
  const [selectedDishesIds, setDelectedDishesIds] = useState([]);

  const handleChangeFilter = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const handleSelectDish = (dishId) => {
    if (selectedDishesIds.includes(dishId)) {
      setDelectedDishesIds(
        selectedDishesIds.filter((id) => {
          return id !== dishId;
        })
      );
    } else {
      setDelectedDishesIds([...selectedDishesIds, dishId]);
    }
  };

  const handleSubmit = () => {
    setDelectedDishesIds([]);
    setActiveCategoryId("soups");
    onSubmit(selectedDishesIds, mealId);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={`Добавление блюда — ${day}`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Form>
        <CategoryFilter
          categories={categories}
          activeCategoryId={activeCategoryId}
          changeFilter={handleChangeFilter}
        />
        <Category
          title={categories[activeCategoryId].title}
          activeCategoryId={activeCategoryId}
          dishes={getCategoryRecipes(dishes, activeCategoryId)}
          selectDish={handleSelectDish}
          selectedDishesIds={selectedDishesIds}
        />
      </Form>
      <SelectedDishes></SelectedDishes>
    </Modal>
  );
};

const Form = styled.div`
  display: flex;
`;

const SelectedDishes = styled.div``;

export default AddDishModal;
