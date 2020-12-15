import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import recipesAPI from "../../api/recipesAPI";
import { RecipesContext } from "../../index";
import { getRecipeTitles } from "../../selectors/selectors";
import { noop } from "../../helpers/noop";
import { recipePropTypes, categoriesPropTypes } from "../../prop-types";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const EditRecipe = (props) => {
  const { recipe, categories, toggleEditMode } = props;
  const history = useHistory();

  const { recipes, recipeSlugs, setRecipes, setRecipeSlugs } = useContext(
    RecipesContext
  );
  const recipeTitles = getRecipeTitles(recipes);

  const handleSubmit = (formData) => {
    const updatedRecipe = { ...recipe, ...formData };

    setRecipes({ ...recipes, [recipe.id]: updatedRecipe });

    let updates = {};
    updates[`recipes/${recipe.id}`] = updatedRecipe;

    if (recipe.slug !== updatedRecipe.slug) {
      const newSlug = {
        slug: updatedRecipe.slug,
        id: updatedRecipe.id,
      };

      delete recipeSlugs[recipe.slug];
      setRecipeSlugs({ ...recipeSlugs, [updatedRecipe.slug]: newSlug });

      updates[`recipeSlugs/${recipe.slug}`] = null;
      updates[`recipeSlugs/${updatedRecipe.slug}`] = newSlug;
    }
    recipesAPI.updateRecipeAndSlug(updates).catch(noop);
    history.push(`/recipes/${updatedRecipe.categoryId}/${updatedRecipe.slug}`);
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
