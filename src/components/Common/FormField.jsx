import React from "react";
import styled from "styled-components";
import cn from "classnames";
import { textColors, borderColors } from "../../theme/variables";

const Control = (props) => {
  const { fieldType, ...rest } = props;
  return React.createElement(props.fieldType, {
    ...rest,
  });
};

const FormField = (props) => {
  const { label, children, ...rest } = props;
  return (
    <Field>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Control {...rest} className={cn({ error: props.error })}>
        {props.children}
      </Control>
      {props.error && <ErrorMessage>{props.error}</ErrorMessage>}
    </Field>
  );
};

const Field = styled.div`
  & + &,
  & + button {
    margin-top: 16px;
  }

  input[type="text"],
  textarea,
  select {
    border: 1px solid ${borderColors.input};
    border-radius: 4px;
    width: 100%;
    color: inherit;

    &:hover {
      border-color: ${textColors.grayLight};
    }

    &.error {
      border-color: red;
    }

    &:-webkit-autofill {
      background-color: #fff !important;
    }
  }

  input[type="text"],
  select {
    height: 40px;
    padding: 0 16px;
  }

  select {
    /* -webkit-appearance: none;
    -moz-appearance: none; */
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
  color: ${textColors.gray};
`;
const ErrorMessage = styled.div`
  color: red;
  margin-top: 4px;
  font-size: 12px;
`;

export default FormField;
