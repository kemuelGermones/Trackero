import { NavLink } from "react-router-dom";
import styled from "styled-components";


interface ICustomNavItemProp {
  $isActive: boolean;
}

export const Nav = styled.nav`
  height: 100vh;
  width: 10rem;
  box-sizing: border-box;
  padding: 1rem;
  background-color: var(--secondary);
  text-transform: uppercase;
  position: fixed;
  top: 0;
  left: 0;
`;

export const NavBrand = styled.div`
  font-size: 1.5rem;
  box-sizing: border-box;
  border-bottom: 1px solid black;
  padding-bottom: 0.5rem;
  text-align: center;
  color: var(--quaternary);
`;

export const NavMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavItem = styled(NavLink)<ICustomNavItemProp>`
  text-decoration: none;
  margin: 1rem 0;
  color: ${(props) => (props.$isActive ? "var(--quaternary)" : "black")};

  &:hover {
    color: var(--quaternary);
  }
`;

export const NavUnit = styled.div`
  cursor: pointer;
  margin: 1rem 0;

  &:hover {
    color: var(--quaternary);
  }
`;