import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import cn from "classnames";
import { iconForBg } from "../Icon";
import Control from "./Control";
import { FormContext } from "./Form";

const FormField = (props) => {
  const { label, children, ...rest } = props;
  const state = useContext(FormContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (state.errors && state.errors[props.name]) {
      setError(state.errors[props.name]);
    } else {
      setError(null);
    }
  }, [state.errors, props.name]);

  return (
    <Field>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Control {...rest} className={cn({ error: error })}>
        {children}
      </Control>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Field>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  validators: PropTypes.arrayOf(PropTypes.func),
};

const Field = styled.div`
  & + &,
  & + button {
    margin-top: 16px;
  }

  input[type="text"],
  input[type="password"],
  textarea,
  select {
    background-color: ${({ theme }) => theme.bg.base};
    border: 1px solid ${({ theme }) => theme.border.input};
    border-radius: 4px;
    width: 100%;
    color: inherit;

    &:hover {
      border-color: ${({ theme }) => theme.text.grayLight};
    }

    &.error {
      border-color: ${({ theme }) => theme.text.error};
    }

    &:-webkit-autofill {
    }
  }

  input[type="text"],
  input[type="password"],
  select {
    height: 40px;
    padding: 0 16px;
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    background: ${iconForBg("chevron_bottom")} no-repeat calc(100% - 10px)
      center;
    background-size: 16px;
  }

  textarea {
    padding: 12px 16px;
    min-height: 150px;
    resize: vertical;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text.gray};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.text.error};
  margin-top: 4px;
  font-size: 14px;
`;

export default FormField;
