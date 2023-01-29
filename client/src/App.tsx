import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import { getData } from "./store/data-action";
import { logout } from "./store/user-slice";

import GlobalStyle from "./components/styles/base/GlobalStyle";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import Users from "./pages/Users";
import Error from "./pages/Error";
import Login from "./pages/Login";
import ShowProject from "./pages/ShowProject";
import Notification from "./components/notification/Notification";
import Loading from "./components/loading/Loading";
import WithoutNav from "./components/outlet/WithoutNav";
import WithNav from "./components/outlet/WithNav";
import ProtectedRoutes from "./components/outlet/ProtectedRoutes";
import NotProtectedRoutes from "./components/outlet/NotProtectedRoutes";

let logoutTimer: number;

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.user.login);
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const expirationTime = useAppSelector((state) => state.user.expiration);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (accessToken && expirationTime && expirationTime > currentTime) {
      dispatch(getData(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (isLoggedIn) {
      const currentTime = new Date().getTime();
      if (expirationTime && expirationTime > currentTime) {
        logoutTimer = setTimeout(() => {
          dispatch(logout());
        }, expirationTime - currentTime);
      } else {
        dispatch(logout());
      }
    } else {
      clearTimeout(logoutTimer);
    }
  }, [isLoggedIn]);

  return (
    <>
      <GlobalStyle />
      <Loading />
      <Notification />
      <Routes>
        <Route element={<NotProtectedRoutes />}>
          <Route element={<WithoutNav />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<WithNav />}>
            <Route path="/projects">
              <Route index element={<Projects />} />
              <Route path=":projectId" element={<ShowProject />} />
            </Route>
            <Route path="/issues" element={<Issues />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
