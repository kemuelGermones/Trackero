import { Outlet } from "react-router-dom";

import SideBar from "../nav/SideBar";
import Container from "../styles/utils/Container";

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
