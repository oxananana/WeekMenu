import React, { useState } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import { lightTheme, darkTheme } from "./theme/themes";
import InnerPage from "./components/Common/InnerPage";
import NoMatch from "./components/Common/NoMatch";
import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipePage from "./components/Recipes/RecipePage";
import AddRecipe from "./components/Recipes/AddRecipe";
import { getCategoryValues } from "./selectors/selectors";
import menu from "./data/menu";
import categories from "./data/categories";
import recipesData from "./data/recipes";

const App = () => {
  const [recipes, setRecipes] = useState(recipesData);
  const [theme, setTheme] = useState("light");
  const [isAuth, setIsAuth] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const addRecipe = (newRecipe) => {
    setRecipes({ ...recipes, [newRecipe.id]: newRecipe });
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/menu" />
        </Route>
        <Route path="/menu">
          <Menu menu={menu} recipes={recipes} categories={categories} />
        </Route>
        <Route path="/login">
          <InnerPage>
            <Login isAuth={isAuth} />
          </InnerPage>
        </Route>
        <Route path="/account">
          <InnerPage>
            <Account />
          </InnerPage>
        </Route>
        <Route path="/recipes/new-recipe" exact>
          <InnerPage>
            <AddRecipe
              categoryValues={getCategoryValues(categories)}
              addRecipe={addRecipe}
            />
          </InnerPage>
        </Route>
        <Route path="/recipes/:categoryId/:recipeId">
          <InnerPage>
            <RecipePage
              recipes={recipes}
              categoryValues={getCategoryValues(categories)}
            />
          </InnerPage>
        </Route>
        <Route path="/recipes/:categoryId">
          <InnerPage>
            <Recipes categories={categories} recipes={recipes} />
          </InnerPage>
        </Route>
        <Route path="/recipes/">
          <Redirect to="/recipes/soups" />
        </Route>
        <Route path="*">
          <InnerPage>
            <NoMatch />
          </InnerPage>
        </Route>
      </Switch>
    </ThemeProvider>
  );
};

export default App;
