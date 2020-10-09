import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import cn from "classnames";
import { iconForBg } from "./Icon";
import { FormContext } from "./Form";
import { useEffect } from "react";
import { useState } from "react";

const Control = (props) => {
  const { fieldType, validators, ...rest } = props;
  const state = useContext(FormContext);
  const [value, setValue] = useState(
    state.values && state.values[props.name] ? state.values[props.name] : ""
  );

  useEffect(() => {
    if (validators) {
      state.setValidators((prevValidators) => {
        return { ...prevValidators, [props.name]: validators };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(value);
    state.setValues({ ...state.values, [name]: value });
  };

  return React.createElement(props.fieldType, {
    ...rest,
    value: value,
    onChange: handleChange,
  });
};

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
        {props.children}
      </Control>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Field>
  );
};

Control.propTypes = {
  fieldType: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
};

Control.defaultProps = {
  fieldType: "input",
  type: "text",
  name: "text",
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
    background-color: ${({ theme }) => theme.bg.baseLight};
    border: 1px solid ${({ theme }) => theme.border.input};
    border-radius: 4px;
    width: 100%;
    color: inherit;

    &:hover {
      border-color: ${({ theme }) => theme.text.grayLight};
    }

    &.error {
      border-color: red;
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
