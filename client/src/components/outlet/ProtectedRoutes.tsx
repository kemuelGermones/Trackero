import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../store";

function ProtectedRoutes() {
  const isLoggedIn = useAppSelector((state) => state.user.login);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
