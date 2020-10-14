import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/database";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const AddRecipe = (props) => {
  let history = useHistory();
  const { categories } = props;
  // debugger;

  const handleSubmit = (formData) => {
    createNewRecipe(formData);
  };

  const createNewRecipe = (recipe) => {
    const db = firebase.database();
    const recipeId = db.ref().child("recipes").push().key;
    const schedule = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day) => {
      return { name: day, isActive: false };
    });
    const newRecipe = { ...recipe, id: recipeId, schedule };

    let updates = {};
    updates[`recipes/${recipeId}`] = newRecipe;
    updates[`categories/${recipe.categoryId}/recipes/${recipeId}`] = true;

    console.log(updates);
    debugger;

    db.ref().update(updates, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success");
        history.push(`/recipes/${recipe.categoryId}/${recipeId}`);
      }
    });
  };

  return (
    <AddRecipeContainer>
      <Heading>Добавление нового рецепта</Heading>
      {categories ? (
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
      ) : (
        <div>Нет категорий - нет формы</div>
      )}
    </AddRecipeContainer>
  );
};

AddRecipe.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

AddRecipe.defaultProps = {
  categories: null,
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
