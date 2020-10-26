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
  setRecipe(recipe) {
    const db = firebase.database();

    return db.ref(`recipes/${recipe.id}`).set(recipe);
  },
  getNewKey() {
    const db = firebase.database();
    return db.ref().child("recipes").push().key;
  },
};

export default recipesAPI;
