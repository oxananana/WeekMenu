import * as firebase from "firebase/app";
import "firebase/database";

const categoriesAPI = {
  getCategories() {
    const db = firebase.database();

    return db
      .ref("categories")
      .orderByChild("priority")
      .once("value")
      .then((snapshot) => {
        if (snapshot.val() !== null) {
          let obj = {};
          snapshot.forEach(function (child) {
            obj[child.key] = child.val();
          });
          return obj;
        }
        return null;
      });
  },
};

export default categoriesAPI;
