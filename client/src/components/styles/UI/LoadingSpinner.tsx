import styled from "styled-components";
import { ShowToBottom, HideToTop } from "../utils/Animation";

interface ILoadingSpinnerContainerCustomProps {
  $show: boolean;
}

export const LoadingSpinner = styled.div`
  width: 25px;
  height: 25px;
  position: relative;
  top: 9px;
  left: 9px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 10px solid transparent;
    border-top-color: var(--primary);
  }

  &:before {
    z-index: 100;
    animation: spin 1s infinite;
  }

  &:after {
    border: 10px solid #ccc;
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const LoadingSpinnerContainer = styled.div<ILoadingSpinnerContainerCustomProps>`
  width: 4rem;
  height: 4rem;
  border-radius: 5rem;
  background-color: white;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  animation: ${(props) => (props.$show ? ShowToBottom : HideToTop)} 0.4s
    ease-out forwards;
`;
