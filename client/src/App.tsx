import { Fragment } from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiOutlineWarning } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";

import SideNav from "./components/SideNav";
import Container from "./components/Container";

function App() {
  return (
    <Fragment>
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
      <Container>
        <div>
          <BsPlusLg size="1.5em" />
          <h1>Add project</h1>
        </div>
        <div>
          <h1>Project Two</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            nostrum voluptas, et quod rem ipsam reiciendis.
          </p>
        </div>
        <div>
          <h1>Project One</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            nostrum voluptas, et quod rem ipsam reiciendis facere quaerat quae
            voluptatum autem molestiae numquam animi, veritatis nemo earum
            reprehenderit doloribus voluptatem!
          </p>
        </div>
        <div>
          <h1>Project Two</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            nostrum voluptas, et quod rem ipsam reiciendis.
          </p>
        </div>
      </Container>
    </Fragment>
  );
}

export default App;
