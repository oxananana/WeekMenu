import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import GlobalStyle from "./theme/GlobalStyle";
import "./App.css";

import { Container } from "./components/Common/Container";
import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Menu/Menu";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipePage from "./components/Recipes/RecipePage/RecipePage";
import menu from "./data/menu";
import categories from "./data/categories";
import recipes from "./data/recipes";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Route path="/" exact>
        <Redirect to="/menu" />
      </Route>
      <Route path="/menu">
        <Menu menu={menu} recipes={recipes} categories={categories} />
      </Route>
      <Container>
        <Switch>
          <Route path="/recipes/:categoryId/:recipeId">
            <RecipePage recipes={recipes} />
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
