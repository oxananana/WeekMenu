import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { bgColors } from "../../theme/variables";
import { Container } from "../Common/Container";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <NavbarContainer>
      <Container>
        <StyledNavbar>
          <Logo />
          <Nav>
            <NavItem>
              <NavLink to="/menu">Меню</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/recipes">Рецепты</NavLink>
            </NavItem>
          </Nav>
          <Account>Аккаунт</Account>
        </StyledNavbar>
      </Container>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  background-color: ${bgColors.primary};
`;

const StyledNavbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    color: #fff;
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

const Account = styled.a`
  color: #fff;
`;

export default Navbar;
