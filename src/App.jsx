import React, { useState, useEffect, useRef } from "react";
import { Route, useHistory, useLocation } from "react-router-dom";
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
  const [isUserLoading, setIsUserLoading] = useState(true);
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
      setIsUserLoading(false);
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
        {isUserLoading ? (
          <Loader />
        ) : (
          <>
            <Route path="/login">
              <Login />
            </Route>
            {user.isAuth && (
              <AuthenticatedApp
                theme={theme}
                toggleTheme={toggleTheme}
                user={user}
              />
            )}
          </>
        )}
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
