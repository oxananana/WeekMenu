import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import styled from "styled-components";

const Button = (props) => {
  const { children, onClick, disabled, active, invert, ...attrs } = props;
  const handleOnClick = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };
  const classes = cn({ active }, { invert });

  return attrs.to ? (
    <StyledLink
      className={classes}
      disabled={disabled}
      onClick={handleOnClick}
      {...attrs}
    >
      {children}
    </StyledLink>
  ) : (
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

const buttonCss = `
  padding: 0 24px;
  border-radius: 4px;
  height: 40px;
  line-height: 38px;
 

  &:hover {
    opacity: 0.8;
  }

  &.invert {
    background-color: transparent;
  }
`;

const StyledButton = styled.button`
  ${buttonCss}
  color: ${({ theme }) => theme.text.baseInvert};
  background-color: ${({ theme }) => theme.bg.primary};
  border: 1px solid ${({ theme }) => theme.bg.primary};

  &.invert {
    color: ${({ theme }) => theme.text.primary};
  }
`;

const StyledLink = styled(NavLink)`
  ${buttonCss}
  color: ${({ theme }) => theme.text.baseInvert};
  background-color: ${({ theme }) => theme.bg.primary};
  border: 1px solid ${({ theme }) => theme.bg.primary};

  &.invert {
    color: ${({ theme }) => theme.text.primary};
  }
`;

export default Button;
