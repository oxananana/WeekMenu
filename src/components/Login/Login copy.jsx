import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import * as firebase from "firebase/app";
import "firebase/auth";
import { required } from "../../helpers/validate";
import Button from "../Common/Button";
import FormField from "../Common/FormField";
import Form from "../Common/Form";

const errorFromCode = {
  "auth/invalid-email": {
    message: "Некорректный e-mail.",
    isCommon: false,
    field: "email",
  },
  "auth/wrong-password": {
    message: "Неверный e-mail или пароль.",
    isCommon: true,
  },
  "auth/user-not-found": {
    message: "Неверный e-mail или пароль.",
    isCommon: true,
  },
  "auth/too-many-requests": {
    message: "Превышено количество попыток входа. Попробуйте войти позже.",
    isCommon: true,
  },
};

const Login = (props) => {
  const [state, setState] = useState({
    // email: "",
    // password: "",
    // required: ["email", "password"],
    errors: null,
    commonError: null,
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setState({ ...state, [name]: value });
  // };

  const handleSubmit = (formData) => {
    login(formData);

    // const requiredFields = state.required;

    // if (requiredFields.some((field) => !state[field].length)) {
    //   setState({ ...state, isError: true });
    // } else {
    //   setState({ ...state, isError: false });
    //   login(state.email, state.password);
    // }
  };

  const login = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((serverError) => {
        const error = errorFromCode[serverError.code];
        const errorMessage = error ? error.message : serverError.message;
        const isCommonError = error ? error.isCommon : true;

        if (isCommonError) {
          setState({
            ...state,
            commonError: errorMessage,
            // isError: true,
            errors: null,
          });
        } else {
          setState({
            ...state,
            // isError: true,
            commonError: null,
            errors: { email: errorMessage },
          });
        }
      });
  };

  return props.isAuth ? (
    <Redirect to="/account" />
  ) : (
    <>
      <Form
        onSubmit={handleSubmit}
        commonError={state.commonError}
        fieldErrors={state.errors}
      >
        <FormField
          fieldType="input"
          type="text"
          // value={state.email}
          name="email"
          label="E-mail"
          // onChange={handleChange}
          validator={[required]}
          // error={state.isError ? required(state.email) : undefined}
          autoFocus
        />
        <FormField
          fieldType="input"
          type="password"
          // value={state.password}
          name="password"
          label="Пароль"
          validator={[required]}
          // onChange={handleChange}
          // error={state.isError ? required(state.password) : undefined}
        />
        <Button full>Войти</Button>
      </Form>
      {/* <LoginForm onSubmit={handleSubmit}>
      <Title>Войти</Title>
      {state.isCommonError && <ErrorMessage></ErrorMessage>}
      <FormField
        fieldType="input"
        type="text"
        value={state.email}
        name="email"
        label="E-mail"
        onChange={handleChange}
        validate={[required, validateEmail]}
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
    </LoginForm> */}
    </>
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
