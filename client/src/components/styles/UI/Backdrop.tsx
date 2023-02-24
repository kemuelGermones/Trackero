import styled from "styled-components";

interface IBackdropCustomProp {
  $hasBackground: boolean;
}

const Backdrop = styled.div<IBackdropCustomProp>`
  backdrop-filter: blur(5px);
  background: ${(state) =>
    state.$hasBackground ? "rgba(0, 0, 0, 0.3)" : "transparent"};
  cursor: pointer;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
`;

export default Backdrop;
