import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch } from "./store";
import GlobalStyle from "./components/styles/base/GlobalStyle";
import Projects from "./pages/Projects";
import Issues from "./pages/Issues";
import Users from "./pages/Users";
import Error from "./pages/Error";
import Login from "./pages/Login";
import ShowProject from "./pages/ShowProject";
import { getProjects } from "./store/project-action";
import Notification from "./components/notification/Notification";
import Loading from "./components/loading/Loading";
import WithoutNav from "./components/outlet/WithoutNav";
import WithNav from "./components/outlet/WithNav";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Loading />
      <Notification />
      <Routes>
        <Route element={<WithoutNav />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<WithNav />}>
          <Route path="/projects">
            <Route index element={<Projects />} />
            <Route path=":id" element={<ShowProject />} />
          </Route>
          <Route path="/issues" element={<Issues />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
