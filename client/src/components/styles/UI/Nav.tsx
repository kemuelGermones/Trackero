import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  height: 100vh;
  width: 10rem;
  box-sizing: border-box;
  padding: 1rem;
  background-color: var(--white);
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
`;

export const NavBrand = styled.div`
  font-size: 1.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  padding: 0 0 0.5rem 0;
  text-align: center;
  color: var(--primary);
`;

export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

type TCustomNavItemProp = {
  $isActive: boolean;
}

export const NavItem = styled(NavLink)<TCustomNavItemProp>`
  text-decoration: none;
  color: ${props => props.$isActive ? "var(--primary)" : "black"};
  padding: 1rem 0;

  &:hover {
    color: var(--primary);
  }
`;
