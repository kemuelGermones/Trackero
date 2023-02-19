import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch } from "../../store";
import { useAppSelector } from "../../store";
import { getProjects } from "../../store/project-action";
import { logoutUser } from "../../store/user-action";
import { getUsers } from "../../store/user-action";

let logoutTimer: number;

function ProtectedRoutes() {
  const dispatch = useAppDispatch();
  const { login, expiration, userRole } = useAppSelector((state) => state.user);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (login && expiration! > currentTime) {
      dispatch(getProjects());
      if (userRole === "Administrator") {
        dispatch(getUsers());
      }
      logoutTimer = setTimeout(() => {
        dispatch(logoutUser());
      }, expiration! - currentTime);
    } else {
      dispatch(logoutUser());
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);

  return login ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
