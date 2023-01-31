import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { logoutUser } from "../../store/user-action";
import {
  BsFolder,
  BsExclamationTriangle,
  BsPerson,
  BsPeople,
  BsBoxArrowInLeft,
} from "react-icons/bs";

import { Nav, NavBrand, NavMenu, NavItem, NavUnit } from "../styles/UI/Nav";

function SideBar() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.userId);

  const logoutHandler = () => {
    dispatch(logoutUser());
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
        <NavItem
          to={`/users/${userId}`}
          $isActive={location.pathname === `/users/${userId}`}
        >
          <BsPerson /> Profile
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
