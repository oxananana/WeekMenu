import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import * as firebase from "firebase/app";
import "firebase/database";
import { StateContext } from "../../App";
import recipesAPI from "../../api/recipesAPI";
import { recipePropTypes } from "./prop-types";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const EditRecipe = (props) => {
  const { recipe, categories, toggleEditMode } = props;
  const history = useHistory();
  const { setRecipes } = useContext(StateContext);

  const handleSubmit = (formData) => {
    updateRecipe({ ...recipe, ...formData });
  };

  const updateRecipe = (recipe) => {
    const db = firebase.database();

    db.ref(`recipes/${recipe.id}`).set(recipe, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("success edit recipe");
        recipesAPI
          .getRecipes()
          .then((response) => {
            setRecipes(response);
          })
          .then(() => {
            history.push(`/recipes/${recipe.categoryId}/${recipe.id}`);
            toggleEditMode();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <AddEditRecipeForm
      {...recipe}
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
  recipe: PropTypes.exact(recipePropTypes),
  toggleEditMode: PropTypes.func.isRequired,
  categories: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
};

export default EditRecipe;
