import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  const { children, onClick, disabled, active, invert, ...attrs } = props;
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

  return attrs.to ? (
    <StyledLink
      active={active}
      invert={invert}
      disabled={disabled}
      onClick={handleClick}
      {...attrs}
    >
      {children}
    </StyledLink>
  ) : (
    <StyledButton
      active={active}
      invert={invert}
      disabled={disabled}
      onClick={handleClick}
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
  invert: PropTypes.bool,
  full: PropTypes.bool,
};

Button.defaultProps = {
  children: "Кнопка",
  onClick: () => {},
  disabled: false,
  active: false,
  invert: false,
};

const buttonCss = `
  padding: 0 24px;
  border-radius: 4px;
  height: 40px;
  line-height: 38px;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }

  `;

const StyledButton = styled.button`
  ${buttonCss}
  color: ${({ theme, invert }) =>
    invert ? theme.text.primary : theme.text.baseInvert};
  background-color: ${({ theme, invert }) =>
    invert ? "transparent" : theme.bg.primary};
  width: ${({ full }) => full && "100%"};
  border: 1px solid ${({ theme }) => theme.bg.primary};
`;

const StyledLink = styled((props) => {
  const { children, invert, active, ...rest } = props;

  return <NavLink {...rest}>{children}</NavLink>;
})`
  ${buttonCss}
  color: ${({ theme, invert }) =>
    invert ? theme.text.primary : theme.text.baseInvert};
  background-color: ${({ theme, invert }) =>
    invert ? "transparent" : theme.bg.primary};
  border: 1px solid ${({ theme }) => theme.bg.primary};
  display: inline-block;
`;

export default Button;
