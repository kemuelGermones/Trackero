import styled from "styled-components";

const Backdrop = styled.div`
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.75);
  cursor: pointer;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export default Backdrop;
