import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../store";
import { getDataRequest } from "../../store/project-action";
import { logoutRequest } from "../../store/user-action";

let logoutTimer: number;

function ProtectedRoutes() {
  const dispatch = useAppDispatch();
  const { login, expiration } = useAppSelector((state) => state.user);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (login && expiration! > currentTime) {
      dispatch(getDataRequest());
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
