import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validate } from "../../../helpers/validate";
import { FormContext } from "./Form";

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
  }, []); // eslint-disable-line

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(value);
    state.setValues({ ...state.values, [name]: value });

    if (validators && state.wasFirstSubmit) {
      state.setErrors((prevErrors) => {
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
