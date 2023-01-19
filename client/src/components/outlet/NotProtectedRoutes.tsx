import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

function NotProtectedRoutes() {
  const isLoggedIn = useAppSelector((state) => state.user.login);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/projects" />;
}

export default NotProtectedRoutes;