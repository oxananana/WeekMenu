import React, { useState, useEffect, useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { defaultCategoryId } from "./constants";
import { noop } from "./helpers/noop";
import InnerPage from "./components/Common/InnerPage";
import PageNotFound from "./components/Common/PageNotFound";
import Notification from "./components/Common/Notification";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Common/Loader";
import Menu from "./components/Menu/Menu";
import Account from "./components/Account/Account";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipePage from "./components/Recipes/RecipePage";
import AddRecipe from "./components/Recipes/AddRecipe";
import CheckSlugContainer from "./components/Common/CheckSlugContainer";
import useQuery from "./hooks/useQuery";
import api from "./api/api";
import menuAPI from "./api/menuAPI";
import { RecipesContext } from "./index";

const AuthenticatedApp = (props) => {
  const { theme, toggleTheme, user } = props;
  const { recipeSlugs, setRecipes, setRecipeSlugs } = useContext(
    RecipesContext
  );
  const [categories, setCategories] = useState();

  const [data, isLoading] = useQuery(() => {
    return api.getInitialData();
  }, {});

  const [menu, setMenu] = useState(data.menu);

  useEffect(() => {
    setMenu(data.menu);
    setCategories(data.categories);
    setRecipes(data.recipes);
    setRecipeSlugs(data.recipeSlugs);
  }, [data, setRecipes, setRecipeSlugs]);

  const changeMenu = (...updates) => {
    let menuUpdates = {};
    let apiUpdates = {};

    updates.forEach((update) => {
      const currentMeals = menu[update.day].meals;
      const currentMeal = currentMeals[update.mealId];

      menuUpdates[update.day] = {
        meals: {
          ...currentMeals,
          [update.mealId]: { ...currentMeal, dishes: update.newDishes },
        },
      };

      apiUpdates[`menu/${update.day}/meals/${update.mealId}/dishes`] =
        update.newDishes;
    });

    setMenu({
      ...menu,
      ...menuUpdates,
    });

    menuAPI.updateDishes(apiUpdates).catch(noop);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (menu && categories) {
    return (
      <>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/menu" />
          </Route>
          <Route path="/account">
            <InnerPage>
              <Account user={user} />
            </InnerPage>
          </Route>
          <Route path="/menu" exact>
            {menu ? (
              <Menu
                menu={menu}
                categories={categories}
                changeMenu={changeMenu}
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
          <Route path="/recipes/:categoryId/:recipeSlug">
            <InnerPage>
              <CheckSlugContainer slug="recipeSlug" controlList={recipeSlugs}>
                <RecipePage categories={categories} />
              </CheckSlugContainer>
            </InnerPage>
          </Route>
          <Route path="/recipes/:categoryId">
            <InnerPage>
              <CheckSlugContainer slug="categoryId" controlList={categories}>
                <Recipes categories={categories} />
              </CheckSlugContainer>
            </InnerPage>
          </Route>
          <Route path="/recipes/">
            <Redirect to={`/recipes/${defaultCategoryId}`} />
          </Route>
          <Route path="*">
            <InnerPage>
              <PageNotFound />
            </InnerPage>
          </Route>
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Switch>
          <Route path="/account">
            <InnerPage>
              <Account user={user} />
            </InnerPage>
          </Route>
          <Route path="/">
            <InnerPage>
              <Notification type="warning">
                Что-то пошло не так. Попробуйте обновить страницу или зайти
                позже.
              </Notification>
            </InnerPage>
          </Route>
        </Switch>
      </>
    );
  }
};

AuthenticatedApp.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default AuthenticatedApp;
