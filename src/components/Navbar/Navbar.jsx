import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Container } from "../Common/Container";
import Logo from "./Logo";
import Icon from "../Common/Icon";

const Navbar = (props) => {
  return (
    <NavbarContainer>
      <Container>
        <StyledNavbar>
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
          <NavbarRight>
            {props.isAuth ? (
              <NavLink to="/account">Аккаунт</NavLink>
            ) : (
              <NavLink to="/login">Войти</NavLink>
            )}
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
  toggleTheme: PropTypes.func,
};

Navbar.defaultProps = {
  toggleTheme: () => {},
};

const NavbarContainer = styled.div`
  background-color: ${({ theme }) => theme.bg.primary};
`;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text.navbar};
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
`;

const NavItem = styled.li`
  a {
    display: block;
    padding: 16px 24px;
    opacity: 0.6;
    text-transform: uppercase;
    font-weight: bold;

    &.active {
      opacity: 1;
    }

    &:hover {
      opacity: 0.8;
    }
  }
`;

const NavbarRight = styled.div`
  display: flex;
  align-items: center;
`;
const ThemeSwitch = styled.span`
  border-radius: 50%;
  padding: 4px;
  margin-left: 16px;

  &:hover {
    cursor: pointer;
    opacity: 0.9;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default Navbar;
