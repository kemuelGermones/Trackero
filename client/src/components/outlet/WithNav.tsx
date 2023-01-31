import { Outlet } from "react-router-dom";

import Container from "../styles/utils/Container";
import SideBar from "../nav/SideBar";

function WithNav() {
  return (
    <>
      <SideBar />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default WithNav;
