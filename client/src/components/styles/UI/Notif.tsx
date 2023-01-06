import styled from "styled-components";

import { ShowToRight, HideToLeft } from "../utils/Animation";

interface INotifCustomProps {
  $show: boolean;
};

interface INotifHeaderCustomProps {
  $isError: boolean;
};

export const Notif = styled.div<INotifCustomProps>`
  min-height: 5rem;
  width: 15rem;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 20;
  animation: ${(props) => (props.$show ? ShowToRight : HideToLeft)} 0.4s
    ease-out forwards;
`;

export const NotifHeader = styled.div<INotifHeaderCustomProps>`
  width: 1rem;
  box-sizing: border-box;
  background-color: ${(props) =>
    props.$isError ? "var(--danger)" : "var(--success)"};
`;

export const NotifBody = styled.div`
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
`;

export const NotifTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h1 {
    margin: 0;
    font-size: 1rem;
  }
`;

export const NotifDescription = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.75rem;
`;
