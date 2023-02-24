import {
  BsBoxArrowInLeft,
  BsExclamationTriangle,
  BsFolder,
  BsPeople,
  BsPerson,
} from "react-icons/bs";
import { useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store";
import { logoutRequest } from "../../store/user-action";
import { Nav, NavBrand, NavItem, NavMenu, NavUnit } from "../styles/UI/Nav";

function SideBar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.user.userRole);

  const logoutHandler = () => {
    dispatch(logoutRequest());
  };

  return (
    <Nav>
      <NavBrand>Trackero</NavBrand>
      <NavMenu>
        <NavItem
          to="/projects"
          $isActive={location.pathname.slice(0, 9) === "/projects"}
        >
          <BsFolder /> Projects
        </NavItem>
        <NavItem to="/issues" $isActive={location.pathname === "/issues"}>
          <BsExclamationTriangle /> Issues
        </NavItem>
        <NavItem to={"/profile"} $isActive={location.pathname === "/profile"}>
          <BsPerson /> Profile
        </NavItem>
        {userRole === "Administrator" ? (
          <NavItem to="/users" $isActive={location.pathname === "/users"}>
            <BsPeople /> Users
          </NavItem>
        ) : null}
        <NavUnit onClick={logoutHandler}>
          <BsBoxArrowInLeft /> Logout
        </NavUnit>
      </NavMenu>
    </Nav>
  );
}

export default SideBar;
