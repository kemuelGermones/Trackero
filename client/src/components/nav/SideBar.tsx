import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { Nav, NavBrand, NavMenu, NavItem, NavUnit } from "../styles/UI/Nav";
import {
  BsFolder,
  BsExclamationTriangle,
  BsPeople,
  BsBoxArrowInLeft,
} from "react-icons/bs";
import { logout } from "../../store/user-slice";

function SideBar() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

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
        <NavUnit onClick={logoutHandler}>
          <BsBoxArrowInLeft /> Logout
        </NavUnit>
      </NavMenu>
    </Nav>
  );
}

export default SideBar;
