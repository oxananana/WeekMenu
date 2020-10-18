import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as firebase from "firebase/app";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyC9JAOcrsM4B_M2ya44yb2gv97Rv9Kt-zg",
  authDomain: "weekmenu-715a1.firebaseapp.com",
  databaseURL: "https://weekmenu-715a1.firebaseio.com",
  projectId: "weekmenu-715a1",
  storageBucket: "weekmenu-715a1.appspot.com",
  messagingSenderId: "642275803469",
  appId: "1:642275803469:web:13394dd5374eca8d6db704",
};

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

// function RecipeProvider() {
//   const not = useNot()
//   const [] = React.useState({})

//   function update() {
//     // apicall

//     try {
//       not.success('!')
//     } catch(e) {
//       not.error('!')
//     }
//   }
// }

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <NotContProvider>
        <RecipeProvider> */}
      <App />
      {/* </RecipeProvider>
      </NotContProvider> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
