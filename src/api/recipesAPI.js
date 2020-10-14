import * as firebase from "firebase/app";
import "firebase/database";
// import { db } from "./api";

const recipesAPI = {
  getRecipes() {
    const db = firebase.database();

    return db
      .ref("recipes")
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  },
};

export default recipesAPI;
