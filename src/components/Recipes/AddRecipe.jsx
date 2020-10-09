import React from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const AddRecipe = (props) => {
  let history = useHistory();
  const handleSubmit = (formData) => {
    const newId = uuidv4();
    const schedule = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => {
      return { name: day, isActive: false };
    });
    props.addRecipe({ ...formData, id: newId, schedule });
    history.push(`/recipes/${formData.categoryId}/${newId}`);
  };

  return (
    <AddRecipeContainer>
      <Heading>Добавление нового рецепта</Heading>
      <AddEditRecipeForm
        action="add"
        onSubmit={handleSubmit}
        title=""
        recipe=""
        ingredients=""
        categories={props.categories}
        buttons={
          <>
            <Button type="submit">Добавить</Button>
            <Button invert to="/recipes">
              Отмена
            </Button>
          </>
        }
      />
    </AddRecipeContainer>
  );
};

const AddRecipeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Heading = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default AddRecipe;
