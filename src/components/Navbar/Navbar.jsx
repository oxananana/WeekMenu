import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import mediaQuery from "../../theme/mediaQuery";
import { Container } from "../Common/Container";
import Logo from "./Logo";
import Icon from "../Common/Icon";

const Navbar = (props) => {
  return (
    <NavbarContainer>
      <Container>
        <StyledNavbar>
          <NavbarLeft>
            <NavLink to="/">
              <Logo />
            </NavLink>
            <Nav>
              <NavItem>
                <NavLink to="/menu">Меню</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/recipes">Рецепты</NavLink>
              </NavItem>
            </Nav>
          </NavbarLeft>
          <NavbarRight>
            <NavLink to="/account">Аккаунт</NavLink>
            <ThemeSwitch onClick={props.toggleTheme}>
              {props.theme === "light" ? (
                <Icon name="sun" />
              ) : (
                <Icon name="moon" />
              )}
            </ThemeSwitch>
          </NavbarRight>
        </StyledNavbar>
      </Container>
    </NavbarContainer>
  );
};

Navbar.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

const NavbarContainer = styled.div`
  background-color: ${({ theme }) => theme.bg.base};
  box-shadow: ${({ theme }) => theme.shadow.navbar};
  position: relative;
`;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text.primary};
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavLinkCss = (borderColor) => css`
  display: block;
  padding: 16px 0 14px;
  border-bottom: 2px solid transparent;

  &.active {
    border-color: ${borderColor};
  }

  &:hover {
    opacity: 0.8;
  }
`;

const NavItem = styled.li`
  a {
    margin-left: 16px;
    ${NavLinkCss(({ theme }) => theme.bg.primary)};

    ${mediaQuery.greaterThen("small")`
      margin-left: 20px;
   `}

    ${mediaQuery.greaterThen("medium")`
      margin-left: 32px;
   `}
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a {
    ${NavLinkCss(({ theme }) => theme.bg.primary)};
  }
`;

const ThemeSwitch = styled.span`
  border-radius: 50%;
  margin-left: 16px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  &.active {
    border-color: ${({ theme }) => theme.bg.primary};
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default Navbar;
