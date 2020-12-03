import * as firebase from "firebase/app";
import "firebase/database";

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
  getRecipeSlugs() {
    const db = firebase.database();

    return db
      .ref("recipeSlugs")
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      });
  },
  getNewKey() {
    const db = firebase.database();
    return db.ref().child("recipes").push().key;
  },
  updateRecipeAndSlug(updates) {
    const db = firebase.database();

    return db.ref().update(updates);
  },
};

export default recipesAPI;
