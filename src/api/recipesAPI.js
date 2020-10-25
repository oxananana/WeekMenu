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
  setNewRecipe(recipe) {
    const db = firebase.database();
    const recipeId = db.ref().child("recipes").push().key;
    const newRecipe = { ...recipe, id: recipeId };

    return db.ref(`recipes/${recipeId}`).set(newRecipe);
  },
};

export default recipesAPI;
