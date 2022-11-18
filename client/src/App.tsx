import { Fragment } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

import SideNav from "./components/SideNav";
import Container from "./components/Container";

function App() {
  return (
    <Fragment>
      <Container>
        <SideNav>
          <h1>agendafix</h1>
          <ul>
            <li>
              <MdOutlineDashboardCustomize /> Dashboard
            </li>
            <li>
              <AiOutlineWarning /> Tickets
            </li>
            <li>
              <FiUsers /> Users
            </li>
            <li>
              <IoIosLogOut /> Logout
            </li>
          </ul>
        </SideNav>
      </Container>
    </Fragment>
  );
}

export default App;
