import React, { useState, useEffect } from "react";
import {
  Route,
  Redirect,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import * as firebase from "firebase/app";
import "firebase/auth";
import "./App.css";
import GlobalStyle from "./theme/GlobalStyle";
import { lightTheme, darkTheme } from "./theme/themes";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import Login from "./components/Login/Login";
import AuthenticatedApp from "./AuthenticatedApp";
import Loader from "./components/Common/Loader";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState({ isAuth: false });
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ ...user, isAuth: true });
        if (location.pathname === "/login") {
          history.push("/menu");
        } else {
          history.push(location.pathname);
        }
      } else {
        setUser({ isAuth: false });
        history.push("/login");
      }
      setIsAuthLoading(false);
    });
    // не передаю history и location, чтобы не войти в бесконечный цикл
  }, []); // eslint-disable-line

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
      <ErrorBoundary>
        {isAuthLoading ? (
          <Loader />
        ) : (
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              {user.isAuth ? (
                <AuthenticatedApp
                  theme={theme}
                  toggleTheme={toggleTheme}
                  user={user}
                />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        )}
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
