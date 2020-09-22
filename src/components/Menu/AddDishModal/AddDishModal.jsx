import React, { useState } from "react";
import styled from "styled-components";
import { bgColors, textColors } from "../../../theme/variables";
import Modal from "../../Common/Modal";
import CategoryFilter from "./CategoryFilter";
import Category from "./Category";
import { getCategoryRecipes } from "../../../selectors/selectors";

const AddDishModal = (props) => {
  const { isOpen, onClose, categories } = { ...props };
  const dishes = props.recipes;
  const [activeCategoryId, setActiveCategoryId] = useState("soups");
  const [selectedDishes, setSelectedDishes] = useState([]);

  const handleChangeFilter = (categoryId) => {
    setActiveCategoryId(categoryId);
  };

  const handleSelectDish = (dishId) => {
    if (selectedDishes.includes(dishId)) {
      setSelectedDishes(
        selectedDishes.filter((id) => {
          return id !== dishId;
        })
      );
    } else {
      setSelectedDishes([...selectedDishes, dishId]);
    }
  };

  return (
    <Modal isOpen={isOpen} title="Добавление блюда" onClose={onClose}>
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
          selectedDishes={selectedDishes}
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
