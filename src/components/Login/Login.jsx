import React, { useState } from "react";
import styled from "styled-components";
import mediaQuery from "../../theme/mediaQuery";
import authAPI from "../../api/authAPI";
import { required } from "../../helpers/validate";
import Button from "../Common/Button";
import FormField from "../Common/Form/FormField";
import Form from "../Common/Form/Form";
import Loader from "../Common/Loader";

const Login = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    fieldErrors: null,
    commonError: null,
  });

  const handleSubmit = (formData) => {
    login(formData);
  };

  const login = ({ email, password }) => {
    setIsLoading(true);

    authAPI
      .login(email, password)
      .then(() => {
        setIsLoading(false);
      })
      .catch((serverError) => {
        setIsLoading(false);
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

  return (
    <>
      {isLoading && <Loader />}
      <LoginPage>
        <LoginForm
          onSubmit={handleSubmit}
          commonError={errors.commonError}
          fieldErrors={errors.fieldErrors}
        >
          <Title>Войти в приложение</Title>
          <FormField
            fieldType="input"
            type="text"
            name="email"
            label="E-mail"
            validators={[required]}
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
      </LoginPage>
    </>
  );
};

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

const LoginPage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 20px;

  ${mediaQuery.greaterThen("small")`
    padding: 32px;
  `}
`;

const LoginForm = styled(Form)`
  max-width: 360px;
  margin: 0 auto;
  width: 100%;
  background-color: ${({ theme }) => theme.bg.base};
  border-radius: 8px;
  padding: 20px;

  ${mediaQuery.greaterThen("small")`
    padding: 32px;
  `}
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export default Login;
