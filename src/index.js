import React, { useState, createContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase/app";
import firebaseConfig from "./firebaseConfig";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

firebase.initializeApp(firebaseConfig);

// const NotContext = Reac.createContext();

// function NotContProvider() {
//   const [not, setNot] = React.useState([]),

//   function success(message) {
//     setNot([...not, { type: 'success', message }])
//   }

//   function error(message) {
//     setNot([...not, { type: 'error', message }])
//   }

//   return <NotContext.Provider value={{}}>{props.children}</NotContext.Provider>;
// }

// function useNot() {
//   const ctx = React.useContext(NotCont);

//   if (ctx === undefined) {
//     throw new Error('Нужен провайдер')
//   }

//   return ctx;
// }
export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  // const not = useNot()
  // const [] = React.useState({})

  // function update() {
  //   // apicall

  //   try {
  //     not.success('!')
  //   } catch(e) {
  //     not.error('!')
  //   }
  // }
  const [recipes, setRecipes] = useState();

  return (
    <RecipesContext.Provider value={{ recipes, setRecipes }}>
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
