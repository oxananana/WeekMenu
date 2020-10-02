import React, { useState } from "react";
import styled from "styled-components";
import { arrayToEnumString } from "../../../helpers/helpers";
import { getCategoryRecipes } from "../../../selectors/selectors";
import Modal from "../../Common/Modal";
import CategoryFilter from "./CategoryFilter";
import Category from "./Category";

const AddDishModal = (props) => {
  const { isOpen, onClose, onSubmit, categories, day, mealId } = props;
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
      <Dishes>
        <CategoryFilter
          categories={categories}
          activeCategoryId={activeCategoryId}
          changeFilter={handleChangeFilter}
        />
        <Category
          title={categories[activeCategoryId].title}
          activeCategoryId={activeCategoryId}
          dishes={getCategoryRecipes(Object.values(dishes), activeCategoryId)}
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

const Dishes = styled.div`
  display: flex;
`;

const SelectedDishes = styled.div`
  margin-top: 16px;
`;

const SelectedDishesTitle = styled.div`
  color: ${({ theme }) => theme.text.gray};
  margin-bottom: 8px;
`;

export default AddDishModal;
