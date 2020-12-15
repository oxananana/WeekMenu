import React, { useState, createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [recipes, setRecipes] = useState();
  const [recipeSlugs, setRecipeSlugs] = useState();

  return (
    <RecipesContext.Provider
      value={{ recipes, recipeSlugs, setRecipes, setRecipeSlugs }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
