import { Outlet, Navigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../store";

function IsYourProfile() {
  const { userId: paramsId } = useParams();
  const userId = useAppSelector((state) => state.user.userId);

  return paramsId === userId ? <Outlet /> : <Navigate to="/error" />;
}

export default IsYourProfile;
