import React from "react";
import { Route, Redirect } from "react-router-dom";
import GlobalStyle from "./theme/GlobalStyle";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Menu from "./components/Menu/Menu";
import menu from "./JSON/menu.json";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Route path="/" exact>
        <Redirect to="/menu" />
      </Route>
      <Route path="/menu">
        <Menu menu={menu} />
      </Route>
    </>
  );
};

export default App;
