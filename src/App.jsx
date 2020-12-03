import React, { useState, useEffect, useRef } from "react";
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
  // TODO: Я бы назвал переменную isUserLoading, т.е мы загружаем пользователя, а не авторизацию
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();

  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ ...user, isAuth: true });
        if (prevPathRef.current === "/login") {
          history.push("/menu");
        } else {
          history.push(prevPathRef.current);
        }
      } else {
        setUser({ isAuth: false });
        history.push("/login");
      }
      setIsAuthLoading(false);
    });
  }, [history]);

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
            {/* TODO: Тут не нужен Route, у тебя он уже есть внутри AuthenticatedApp */}
            <Route path="/">
              {/* TODO: Тебе не нужна эта логика тут, у нас же в хуке есть редирект на login */}
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
