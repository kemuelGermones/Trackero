import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store";
import { getProjectsRequest } from "../../store/project-action";
import { getUsersRequest } from "../../store/user-action";
import { logoutRequest } from "../../store/user-action";

let logoutTimer: number;

function ProtectedRoutes() {
  const dispatch = useAppDispatch();
  const { login, expiration, userRole } = useAppSelector((state) => state.user);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (login && expiration! > currentTime) {
      dispatch(getProjectsRequest());
      if (userRole === "Administrator") dispatch(getUsersRequest());
      logoutTimer = setTimeout(() => {
        dispatch(logoutRequest());
      }, expiration! - currentTime);
    } else {
      dispatch(logoutRequest());
    }

    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);

  return login ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
