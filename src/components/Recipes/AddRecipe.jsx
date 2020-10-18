import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/database";
import { StateContext } from "../../App";
import recipesAPI from "../../api/recipesAPI";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const AddRecipe = (props) => {
  let history = useHistory();
  const { categories } = props;

  const { setRecipes } = useContext(StateContext);

  const handleSubmit = (formData) => {
    createNewRecipe(formData);
  };

  const createNewRecipe = (recipe) => {
    const db = firebase.database();
    const recipeId = db.ref().child("recipes").push().key;
    const newRecipe = { ...recipe, id: recipeId };

    db.ref(`recipes/${recipeId}`).set(newRecipe, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success add recipe");
        recipesAPI
          .getRecipes()
          .then((response) => {
            setRecipes(response);
          })
          .then(() => {
            history.push(`/recipes/${recipe.categoryId}/${recipeId}`);
          })
          .catch((error) => {
            console.log(error);
          });
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
          description=""
          ingredients=""
          categories={categories}
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
