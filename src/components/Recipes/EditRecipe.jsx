import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import recipesAPI from "../../api/recipesAPI";
import { RecipesContext } from "../../index";
import { getRecipeTitles } from "../../selectors/selectors";
import { recipePropTypes, categoriesPropTypes } from "../../prop-types";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const EditRecipe = (props) => {
  const { recipe, categories, toggleEditMode } = props;
  const history = useHistory();

  const { recipes, setRecipes } = useContext(RecipesContext);
  const recipeTitles = getRecipeTitles(recipes);

  const handleSubmit = (formData) => {
    const updatedRecipe = { ...recipe, ...formData };

    setRecipes({ ...recipes, [recipe.id]: updatedRecipe });
    recipesAPI.setRecipe(updatedRecipe).catch((error) => {
      console.log(error);
    });
    history.push(`/recipes/${updatedRecipe.categoryId}/${updatedRecipe.id}`);
    toggleEditMode();
  };

  return (
    <AddEditRecipeForm
      {...recipe}
      onSubmit={handleSubmit}
      action="edit"
      categories={categories}
      recipeTitles={recipeTitles}
      buttons={
        <>
          <Button invert onClick={toggleEditMode}>
            Отмена
          </Button>
          <Button type="submit">Сохранить</Button>
        </>
      }
    />
  );
};

EditRecipe.propTypes = {
  recipe: PropTypes.exact(recipePropTypes),
  toggleEditMode: PropTypes.func.isRequired,
  categories: categoriesPropTypes,
};

export default EditRecipe;
