import React from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import authAPI from "../../api/authAPI";

const Account = (props) => {
  const { isAuth, email } = props.user;
  const handleClick = () => {
    authAPI.logout().catch((error) => console.log("error" + error));
  };

  return isAuth ? (
    <>
      <h2>Здравствуйте, товарищ {email}!</h2>
      <SignOutBtn onClick={handleClick}>Выйти</SignOutBtn>
    </>
  ) : (
    <Redirect to="/login" />
  );
};

const SignOutBtn = styled.div`
  display: inline-block;
  margin-top: 20px;
  color: ${({ theme }) => theme.text.primary};

  &:hover,
  &:focus {
    cursor: pointer;
    color: ${({ theme }) => theme.text.primaryHover};
  }
`;

export default Account;
