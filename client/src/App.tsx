import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Fallback from "./components/fallback/Fallback";
import IsAdmin from "./components/outlet/IsAdmin";
import NotProtectedRoutes from "./components/outlet/NotProtectedRoutes";
import ProtectedRoutes from "./components/outlet/ProtectedRoutes";
import WithNav from "./components/outlet/WithNav";
import WithoutNav from "./components/outlet/WithoutNav";
import GlobalStyle from "./components/styles/base/GlobalStyle";
import { useAppDispatch, useAppSelector } from "./store";
import { getData } from "./store/data-action";
import { logout } from "./store/user-slice";

const Projects = React.lazy(() => import("./pages/Projects"));
const Issues = React.lazy(() => import("./pages/Issues"));
const Users = React.lazy(() => import("./pages/Users"));
const Error = React.lazy(() => import("./pages/Error"));
const Login = React.lazy(() => import("./pages/Login"));
const ShowProject = React.lazy(() => import("./pages/ShowProject"));
const Profile = React.lazy(() => import("./pages/Profile"));

let logoutTimer: number;

function App() {
  const dispatch = useAppDispatch();
  const { accessToken, expiration, login } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (accessToken && expiration && expiration > currentTime) {
      dispatch(getData(accessToken));
    }
  }, [accessToken]);

  useEffect(() => {
    if (login) {
      const currentTime = new Date().getTime();
      if (expiration && expiration > currentTime) {
        logoutTimer = setTimeout(() => {
          dispatch(logout());
        }, expiration - currentTime);
      } else {
        dispatch(logout());
      }
    } else {
      clearTimeout(logoutTimer);
    }
  }, [login]);

  return (
    <>
      <GlobalStyle />
      <ToastContainer position="bottom-left" />
      <Routes>
        <Route element={<NotProtectedRoutes />}>
          <Route element={<WithoutNav />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Fallback />}>
                  <Login />
                </Suspense>
              }
            />
          </Route>
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<WithNav />}>
            <Route path="/projects">
              <Route
                index
                element={
                  <Suspense fallback={<Fallback />}>
                    <Projects />
                  </Suspense>
                }
              />
              <Route
                path=":projectId"
                element={
                  <Suspense fallback={<Fallback />}>
                    <ShowProject />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/issues"
              element={
                <Suspense fallback={<Fallback />}>
                  <Issues />
                </Suspense>
              }
            />
            <Route path="/users">
              <Route element={<IsAdmin />}>
                <Route
                  index
                  element={
                    <Suspense fallback={<Fallback />}>
                      <Users />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route path="/profile">
              <Route
                index
                element={
                  <Suspense fallback={<Fallback />}>
                    <Profile />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/error"
              element={
                <Suspense fallback={<Fallback />}>
                  <Error />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/error" />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
