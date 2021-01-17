import React, { useState, useEffect, createContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { validate } from "../../../helpers/validators";

export const FormContext = createContext();

const Form = (props) => {
  const { children, onSubmit, commonError, fieldErrors, initialValues } = props;

  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [validators, setValidators] = useState(null);
  const [wasFirstSubmit, setWasFirstSubmit] = useState(false);

  useEffect(() => {
    setErrors(fieldErrors || {});
  }, [fieldErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!wasFirstSubmit) {
      setWasFirstSubmit(true);
    }

    let errors = {};
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

    if (Object.keys(errors).length === 0) {
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
        setErrors,
        wasFirstSubmit,
      }}
    >
      <form onSubmit={handleSubmit} className={props.className}>
        {commonError && <ErrorMessageCommon>{commonError}</ErrorMessageCommon>}
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  commonError: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
  fieldErrors: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.object]),
  initialValues: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.object,
  ]),
};

Form.defaultProps = {
  fieldErrors: null,
  initialValues: {},
  commonError: null,
  onSubmit: () => {},
};

const ErrorMessageCommon = styled.div`
  color: ${({ theme }) => theme.text.error};
  margin-bottom: 12px;
  font-size: 14px;
`;

export default Form;
