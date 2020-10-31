import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import InnerPage from "./components/Common/InnerPage";
import NoMatch from "./components/Common/NoMatch";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Common/Loader";
import Menu from "./components/Menu/Menu";
import Account from "./components/Account/Account";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipePage from "./components/Recipes/RecipePage";
import AddRecipe from "./components/Recipes/AddRecipe";
import Login from "./components/Login/Login";
import useQuery from "./hooks/useQuery";
import api from "./api/api";
import { RecipesContext, CategoriesContext } from "./index";

const AuthenticatedApp = (props) => {
  const { theme, toggleTheme, user } = props;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const { categories, setCategories } = useContext(CategoriesContext);

  const [data, isLoading] = useQuery(() => {
    return api.getInitialData();
  }, {});

  const [menu, setMenu] = useState(data.menu);

  useEffect(() => {
    setMenu(data.menu);
    setCategories(data.categories);
    setRecipes(data.recipes);
  }, [data, setRecipes, setCategories]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
              <Redirect to="/menu" />
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
                <InnerPage>Меню пустое</InnerPage>
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
        </>
      )}
    </>
  );
};

AuthenticatedApp.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default AuthenticatedApp;
