import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import * as firebase from "firebase/app";
import "firebase/auth";
import { required } from "../../helpers/validate";
import Button from "../Common/Button";
import FormField from "../Common/FormField";

const Login = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    required: ["email", "password"],
    isError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = state.required;

    if (requiredFields.some((field) => !state[field].length)) {
      setState({ ...state, isError: true });
    } else {
      setState({ ...state, isError: false });
      login(state.email, state.password);
    }
  };

  const login = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setState({ ...state, isError: true });
      });
  };

  return props.isAuth ? (
    <Redirect to="/account" />
  ) : (
    <LoginForm onSubmit={handleSubmit}>
      <Title>Войти</Title>
      {state.isCommonError && <ErrorMessage></ErrorMessage>}
      <FormField
        fieldType="input"
        type="text"
        value={state.email}
        name="email"
        label="E-mail"
        onChange={handleChange}
        error={state.isError ? required(state.email) : undefined}
        autoFocus
      />
      <FormField
        fieldType="input"
        type="password"
        value={state.password}
        name="password"
        label="Пароль"
        onChange={handleChange}
        error={state.isError ? required(state.password) : undefined}
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
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.text.error};
  font-size: 12px;
`;

export default Login;
