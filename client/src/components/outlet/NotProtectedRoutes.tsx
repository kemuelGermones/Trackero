import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../store";

function NotProtectedRoutes() {
  const login = useAppSelector((state) => state.user.login);

  return !login ? <Outlet /> : <Navigate to="/projects" />;
}

export default NotProtectedRoutes;
