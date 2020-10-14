import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { required, minLength } from "../../helpers/validate";
import Button from "../Common/Button";
import FormField from "../Common/Form/FormField";
import Form from "../Common/Form/Form";
import authAPI from "../../api/authAPI";

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
  const [errors, setErrors] = useState({
    fieldErrors: null,
    commonError: null,
  });

  const handleSubmit = (formData) => {
    login(formData);
  };

  const login = ({ email, password }) => {
    authAPI.login(email, password).catch((serverError) => {
      const error = errorFromCode[serverError.code];
      const errorMessage = error ? error.message : serverError.message;
      const isCommonError = error ? error.isCommon : true;

      if (isCommonError) {
        setErrors({
          ...errors,
          commonError: errorMessage,
          fieldErrors: null,
        });
      } else {
        setErrors({
          ...errors,
          commonError: null,
          fieldErrors: { email: errorMessage },
        });
      }
    });
  };

  return props.isAuth ? (
    <Redirect to="/account" />
  ) : (
    <LoginForm
      onSubmit={handleSubmit}
      commonError={errors.commonError}
      fieldErrors={errors.fieldErrors}
    >
      <Title>Войти</Title>
      <FormField
        fieldType="input"
        type="text"
        name="email"
        label="E-mail"
        validators={[required, minLength]}
        autoFocus
      />
      <FormField
        fieldType="input"
        type="password"
        name="password"
        label="Пароль"
        validators={[required]}
      />
      <Button full>Войти</Button>
    </LoginForm>
  );
};

const LoginForm = styled(Form)`
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

export default Login;
