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

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
