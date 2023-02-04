import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store";

function IsAdmin() {
  const userRole = useAppSelector((state) => state.user.userRole);

  return userRole === "Administrator" ? <Outlet /> : <Navigate to="/error" />;
}

export default IsAdmin;
