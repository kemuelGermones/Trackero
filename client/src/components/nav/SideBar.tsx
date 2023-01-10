import { Nav, NavBrand, NavMenu, NavItem } from "../styles/UI/Nav";
import { BsFolder, BsExclamationTriangle, BsPeople } from "react-icons/bs";

function SideBar() {
  return (
    <Nav>
      <NavBrand>Trackero</NavBrand>
      <NavMenu>
        <NavItem to="/projects" $isActive={location.pathname === "/projects"}>
          <BsFolder /> Projects
        </NavItem>
        <NavItem to="/issues" $isActive={location.pathname === "/issues"}>
          <BsExclamationTriangle /> Issues
        </NavItem>
        <NavItem to="/users" $isActive={location.pathname === "/users"}>
          <BsPeople /> Users
        </NavItem>
      </NavMenu>
    </Nav>
  );
}

export default SideBar;
