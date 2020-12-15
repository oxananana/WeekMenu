import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { validate } from "../../../helpers/validators";
import { FormContext } from "./Form";

const Control = (props) => {
  const { fieldType, validators, ...rest } = props;
  const formContext = useContext(FormContext);
  const value = formContext.values[props.name] || "";

  useEffect(() => {
    if (validators) {
      formContext.setValidators((prevValidators) => {
        return { ...prevValidators, [props.name]: validators };
      });
    }
  }, []); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;
    formContext.setValues({ ...formContext.values, [name]: value });

    if (validators && formContext.wasFirstSubmit) {
      formContext.setErrors((prevErrors) => {
        return { ...prevErrors, [name]: validate(value, validators) };
      });
    }
  };

  return React.createElement(props.fieldType, {
    ...rest,
    value: value,
    onChange: handleChange,
  });
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

export default Control;
