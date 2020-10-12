import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
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
import useBatchQueries from "./hooks/useBatchQueries";

const App = () => {
  // const [recipes, setRecipes] = useState(null);
  // const [categories, setCategories] = useState(null);

  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ isAuth: false });

  const [data, isLoading] = useBatchQueries(() => {
    const db = firebase.database();
    let newData = [];
    let categoriesPromise = db
      .ref("categories")
      .orderByChild("priority")
      .once(
        "value",
        (snapshot) => {
          console.log("categories");
          let obj = {};
          snapshot.forEach(function (child) {
            obj[child.key] = child.val();
          });
          newData.push(obj);
        },
        (error) => {
          console.log("get recipes error", error);
          newData.push(null);
        }
      );
    let recipesPromise = db.ref("recipes").on(
      "value",
      (snapshot) => {
        console.log("recipes", snapshot.val());
        newData.push(snapshot.val());
      },
      (error) => {
        console.log("get recipes error", error);
        newData.push(null);
      }
    );
    let menuPromise = db.ref("menu").on(
      "value",
      (snapshot) => {
        console.log("menu", snapshot.val());
        newData.push(snapshot.val());
      },
      (error) => {
        console.log("get menu error", error);
        newData.push(null);
      }
    );

    return Promise.all([categoriesPromise, recipesPromise, menuPromise]).then(
      () => {
        console.log("all");
        return newData;
      }
    );
  });

  const [categories, recipes, menu] = data || [];

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
              <Menu menu={menu} recipes={recipes} categories={categories} />
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
