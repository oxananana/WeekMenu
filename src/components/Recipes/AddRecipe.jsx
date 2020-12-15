import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { categoriesPropTypes } from "../../prop-types";
import { RecipesContext } from "../../index";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { getRecipeTitles } from "../../selectors/selectors";
import { noop } from "../../helpers/noop";
import recipesAPI from "../../api/recipesAPI";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const AddRecipe = (props) => {
  let history = useHistory();
  useDocumentTitle("Добавление нового рецепта");
  const { categories } = props;

  const { recipes, recipeSlugs, setRecipes, setRecipeSlugs } = useContext(
    RecipesContext
  );
  const recipeTitles = getRecipeTitles(recipes);

  const handleSubmit = async (formData) => {
    const newRecipeId = await recipesAPI.getNewKey();
    const newRecipe = { id: newRecipeId, ...formData };

    setRecipes({ ...recipes, [newRecipe.id]: newRecipe });

    const newSlug = {
      slug: newRecipe.slug,
      id: newRecipe.id,
    };
    setRecipeSlugs({ ...recipeSlugs, [newRecipe.slug]: newSlug });

    const updates = {
      [`recipes/${newRecipe.id}`]: newRecipe,
      [`recipeSlugs/${newRecipe.slug}`]: newSlug,
    };

    recipesAPI.updateRecipeAndSlug(updates).catch(noop);
    history.push(`/recipes/${newRecipe.categoryId}/${newRecipe.slug}`);
  };

  return (
    <AddRecipeContainer>
      <Heading>Добавление нового рецепта</Heading>
      <AddEditRecipeForm
        action="add"
        onSubmit={handleSubmit}
        categories={categories}
        recipeTitles={recipeTitles}
        buttons={
          <>
            <Button invert to="/recipes">
              Отмена
            </Button>
            <Button type="submit">Добавить</Button>
          </>
        }
      />
    </AddRecipeContainer>
  );
};

AddRecipe.propTypes = {
  categories: categoriesPropTypes,
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
