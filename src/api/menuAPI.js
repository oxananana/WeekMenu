import * as firebase from "firebase/app";
import "firebase/database";

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
  updateDishes(updates) {
    const db = firebase.database();

    return db.ref().update(updates);
  },
};

export default menuAPI;
