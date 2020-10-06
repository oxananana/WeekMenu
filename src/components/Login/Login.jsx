import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../Common/Button";
import FormField from "../Common/FormField";

const Login = (props) => {
  const [state, setState] = useState({
    login: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <LoginForm>
      <Title>Войти</Title>
      <FormField
        fieldType="input"
        type="text"
        value={state.login}
        name="login"
        label="Логин"
        onChange={handleChange}
      />
      <FormField
        fieldType="input"
        type="password"
        value={state.password}
        name="password"
        label="Пароль"
        onChange={handleChange}
      />
      <Button full>Войти</Button>
    </LoginForm>
  );
};

const LoginForm = styled.form`
  max-width: 400px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.bg.baseLight};
  border-radius: 8px;
  padding: 32px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;

export default Login;
