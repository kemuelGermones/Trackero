import { useEffect } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "./store";
import GlobalStyle from "./components/styles/base/GlobalStyle";
import { Nav, NavBrand, NavMenu, NavItem } from "./components/styles/UI/Nav";
import Projects from "./pages/Projects";
import Tickets from "./pages/Tickets";
import Users from "./pages/Users";
import Error from "./pages/Error";
import ShowProject from "./pages/ShowProject";
import Container from "./components/styles/layout/Container";
import { getProjects } from "./store/project-action";
import Notification from "./components/notification/Notification";
import Loading from "./components/loading/Loading";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Loading />
      <Notification />
      <Nav>
        <NavBrand>Trackero</NavBrand>
        <NavMenu>
          <NavItem to="/projects" $isActive={location.pathname === "/projects"}>
            <MdOutlineDashboardCustomize /> Projects
          </NavItem>
          <NavItem to="/issues" $isActive={location.pathname === "/issues"}>
            <AiOutlineWarning /> Issues
          </NavItem>
          <NavItem to="/users" $isActive={location.pathname === "/users"}>
            <FiUsers /> Users
          </NavItem>
        </NavMenu>
      </Nav>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/projects" />} />
          <Route path="/projects">
            <Route index element={<Projects />} />
            <Route path=":id" element={<ShowProject />} />
          </Route>
          <Route path="/issues" element={<Tickets />} />
          <Route path="/users" element={<Users />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
