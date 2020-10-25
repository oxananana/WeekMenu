import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { RecipesContext } from "../../index";
import recipesAPI from "../../api/recipesAPI";
import Button from "../Common/Button";
import AddEditRecipeForm from "./AddEditRecipeForm";

const AddRecipe = (props) => {
  let history = useHistory();
  const { categories } = props;

  const { recipes, setRecipes } = useContext(RecipesContext);

  const handleSubmit = (recipe) => {
    setRecipes({ ...recipes, [recipe.id]: recipe });
    recipesAPI.setNewRecipe(recipe).catch((error) => {
      console.log(error);
    });
    history.push(`/recipes/${recipe.categoryId}/${recipe.id}`);
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
