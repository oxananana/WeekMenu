import * as firebase from "firebase/app";
import "firebase/auth";

const authAPI = {
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },
  logout() {
    return firebase.auth().signOut();
  },
};

export default authAPI;
