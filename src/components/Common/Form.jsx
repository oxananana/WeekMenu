import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import { validate } from "../../helpers/validate";

export const FormContext = createContext();

const Form = (props) => {
  const { children, onSubmit, commonError, fieldErrors, initialValues } = props;

  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState(null);
  const [validators, setValidators] = useState(null);

  useEffect(() => {
    setErrors(fieldErrors);
  }, [fieldErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors;
    if (validators) {
      Object.entries(validators).forEach(([name, fieldValidators]) => {
        if (fieldValidators) {
          const error = validate(values[name], fieldValidators);
          if (error) {
            errors = { ...(errors || {}), [name]: error };
          }
        }
      });
      setErrors(errors);
    }

    if (!errors) {
      onSubmit(values);
    }
  };

  return (
    <FormContext.Provider
      value={{
        values,
        validators,
        errors,
        setValues,
        setValidators,
      }}
    >
      <form onSubmit={handleSubmit} className={props.className}>
        {commonError && <ErrorMessageCommon>{commonError}</ErrorMessageCommon>}
        {children}
      </form>
    </FormContext.Provider>
  );
};

const ErrorMessageCommon = styled.div`
  color: ${({ theme }) => theme.text.error};
  margin-bottom: 12px;
  font-size: 14px;
`;

export default Form;
