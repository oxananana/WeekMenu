import React from "react";
import { Redirect } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";

const Account = (props) => {
  const { isAuth, email } = props.user;
  const handleClick = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => console.log("error" + error));
  };

  return isAuth ? (
    <>
      <div>Здравствуйте, товарищ {email}</div>
      <span onClick={handleClick}>Выйти</span>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

export default Account;
