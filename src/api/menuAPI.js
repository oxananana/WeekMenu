import * as firebase from "firebase/app";
import "firebase/database";
// import { db } from "./api";

const menuAPI = {
  getMenu() {
    const db = firebase.database();

    return db
      .ref("menu")
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  },
};

export default menuAPI;
