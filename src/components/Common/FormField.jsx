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
  const { label, ...rest } = props;
  return (
    <Field>
      {label && <Label htmlFor={props.name}>{label}</Label>}
      <Control {...rest} className={cn({ error: props.error })}></Control>
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
  textarea {
    border: 1px solid ${borderColors.input};
    border-radius: 4px;
    width: 100%;
    color: inherit;

    &.error {
      border-color: red;
    }
  }

  input[type="text"] {
    height: 40px;
    padding: 0 16px;
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
