import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/database";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const EditRecipe = (props) => {
  const { state, recipeId, categoryId, categories, toggleEditMode } = props;

  let history = useHistory();

  const handleSubmit = (formData) => {
    updateRecipe({ ...state, ...formData });
  };

  const updateRecipe = (recipe) => {
    const db = firebase.database();

    let updates = {};
    updates[`recipes/${recipeId}`] = recipe;

    if (categoryId !== recipe.categoryId) {
      updates[`categories/${categoryId}/recipes/${recipeId}`] = null;
      updates[`categories/${recipe.categoryId}/recipes/${recipeId}`] = true;
    }
    console.log(updates);
    debugger;

    db.ref().update(updates, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success");
        if (categoryId !== recipe.categoryId) {
          history.push(`/recipes/${recipe.categoryId}/${recipeId}`);
          toggleEditMode();
        } else {
          toggleEditMode();
        }
      }
    });
  };

  return (
    <AddEditRecipeForm
      {...state}
      onSubmit={handleSubmit}
      action="edit"
      categories={categories}
      buttons={
        <>
          <Button type="submit">Сохранить</Button>
          <Button invert onClick={toggleEditMode}>
            Отмена
          </Button>
        </>
      }
    />
  );
};

EditRecipe.propTypes = {
  state: PropTypes.exact({
    id: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    imgSrc: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    title: PropTypes.string.isRequired,
    recipe: PropTypes.string.isRequired,
    schedule: PropTypes.array.isRequired,
    ingredients: PropTypes.array.isRequired,
  }),
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

EditRecipe.defaultProps = {
  categories: null,
};

export default EditRecipe;
