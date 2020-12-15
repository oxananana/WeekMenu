import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { noop } from "../../helpers/noop";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import authAPI from "../../api/authAPI";

const Account = (props) => {
  const { email } = props.user;
  const handleClick = () => {
    authAPI.logout().catch(noop);
  };
  useDocumentTitle("Аккаунт");

  return (
    <>
      <h2>Здравствуйте, товарищ {email}!</h2>
      <SignOutBtn onClick={handleClick}>Выйти</SignOutBtn>
    </>
  );
};

Account.propTypes = {
  user: PropTypes.object.isRequired,
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
