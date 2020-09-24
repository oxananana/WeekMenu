import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styled from "styled-components";
import { textColors, bgColors } from "../../theme/variables";

const Button = (props) => {
  const { children, onClick, disabled, active, invert, ...attrs } = {
    ...props,
  };
  const handleOnClick = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };
  const classes = cn({ active }, { invert });

  return (
    <StyledButton
      className={classes}
      disabled={disabled}
      onClick={handleOnClick}
      {...attrs}
    >
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

Button.defaultProps = {
  children: "Кнопка",
  onClick: () => {},
  disabled: false,
  active: false,
};

const StyledButton = styled.button`
  padding: 0 24px;
  border-radius: 4px;
  height: 40px;
  color: #fff;
  line-height: 38px;
  background-color: ${bgColors.primary};
  border: 1px solid ${bgColors.primary};

  &:hover {
    opacity: 0.8;
  }

  &.invert {
    color: ${textColors.primary};
    background-color: transparent;
  }
`;

export default Button;
