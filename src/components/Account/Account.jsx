import React from "react";
import { Redirect } from "react-router-dom";
import authAPI from "../../api/authAPI";

const Account = (props) => {
  const { isAuth, email } = props.user;
  const handleClick = () => {
    authAPI.logout().catch((error) => console.log("error" + error));
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
