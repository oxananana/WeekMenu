import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import GlobalStyle from "./theme/GlobalStyle";
import "./App.css";
import { Container } from "./components/Common/Container";
import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Menu/Menu";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipePage from "./components/Recipes/RecipePage";
import AddRecipe from "./components/Recipes/AddRecipe";
import { getCategoryValues } from "./selectors/selectors";
import menu from "./data/menu";
import categories from "./data/categories";
import recipesData from "./data/recipes";

const App = () => {
  const [recipes, setRecipes] = useState(recipesData);

  const addRecipe = (newRecipe) => {
    setRecipes({ ...recipes, [newRecipe.id]: newRecipe });
  };

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Route path="/" exact>
        <Redirect to="/menu" />
      </Route>
      <Route path="/menu">
        <Menu
          menu={menu}
          recipes={recipes}
          categories={categories}
          docTitle="Меню на неделю"
        />
      </Route>
      <Container>
        <Switch>
          <Route path="/recipes/new-recipe" exact>
            <AddRecipe
              categoryValues={getCategoryValues(categories)}
              addRecipe={addRecipe}
            />
          </Route>
          <Route path="/recipes/:categoryId/:recipeId">
            <RecipePage
              recipes={recipes}
              categoryValues={getCategoryValues(categories)}
            />
          </Route>
          <Route path="/recipes/:categoryId">
            <Recipes categories={categories} recipes={recipes} />
          </Route>
          <Route path="/recipes/">
            <Redirect to="/recipes/soups" />
          </Route>
        </Switch>
      </Container>
    </>
  );
};

export default App;
