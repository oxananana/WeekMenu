import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import * as firebase from "firebase/app";
import "firebase/auth";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import { lightTheme, darkTheme } from "./theme/themes";
import InnerPage from "./components/Common/InnerPage";
import NoMatch from "./components/Common/NoMatch";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Common/Loader";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipePage from "./components/Recipes/RecipePage";
import AddRecipe from "./components/Recipes/AddRecipe";
import useQuery from "./hooks/useQuery";
import api from "./api/api";
import { RecipesContext, CategoriesContext } from "./index";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ isAuth: false });

  const [data, isLoading] = useQuery(() => {
    return api.getInitialData();
  }, {});

  const { recipes, setRecipes } = useContext(RecipesContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  const [menu, setMenu] = useState(data.menu);

  useEffect(() => {
    setMenu(data.menu);
    setCategories(data.categories);
    setRecipes(data.recipes);
  }, [data, setRecipes, setCategories]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ ...user, isAuth: true });
      } else {
        setUser({ isAuth: false });
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // const not = useNot()

  // const update = async () ={
  //   try {
  //     /// api call
  //     not.success('213')
  //   } catch(E) {
  //     not.error('123')
  //   }
  // }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Navbar toggleTheme={toggleTheme} theme={theme} isAuth={user.isAuth} />
      {isLoading ? (
        <Loader />
      ) : (
        <Switch>
          <Route path="/" exact>
            <Redirect to="/menu" />
          </Route>
          <Route path="/login">
            <InnerPage>
              <Login isAuth={user.isAuth} />
            </InnerPage>
          </Route>
          <Route path="/account">
            <InnerPage>
              <Account user={user} />
            </InnerPage>
          </Route>
          <Route path="/menu">
            {menu ? (
              <Menu
                menu={menu}
                recipes={recipes}
                categories={categories}
                setMenu={setMenu}
                setRecipes={setRecipes}
              />
            ) : (
              <div>Меню пустое</div>
            )}
          </Route>
          <Route path="/recipes/new-recipe" exact>
            <InnerPage>
              <AddRecipe categories={categories} />
            </InnerPage>
          </Route>
          <Route path="/recipes/:categoryId/:recipeId">
            <InnerPage>
              <RecipePage recipes={recipes} categories={categories} />
            </InnerPage>
          </Route>
          <Route path="/recipes/:categoryId">
            <InnerPage>
              {categories ? (
                <Recipes categories={categories} recipes={recipes} />
              ) : (
                <div>Нет рецептов или категорий</div>
              )}
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
      )}
    </ThemeProvider>
  );
};

export default App;
