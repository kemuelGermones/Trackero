import styled from "styled-components";
import { ShowToBottom, HideToTop } from "../utils/Animation";

interface ICircleLoadingSpinnerContainerCustomProps {
  $show: boolean;
}

export const SquareLoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  margin: auto;
  position: relative;

  &:before {
    content: "";
    width: 48px;
    height: 5px;
    background-color: rgba(65, 92, 242, 0.5);
    position: absolute;
    top: 60px;
    left: 0;
    border-radius: 50%;
    animation: shadow324 0.5s linear infinite;
  }

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    background: var(--tertiary);
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 4px;
    animation: jump7456 0.5s linear infinite;
  }

  @keyframes jump7456 {
    15% {
      border-bottom-right-radius: 3px;
    }

    25% {
      transform: translateY(9px) rotate(22.5deg);
    }

    50% {
      transform: translateY(18px) scale(1, 0.9) rotate(45deg);
      border-bottom-right-radius: 40px;
    }

    75% {
      transform: translateY(9px) rotate(67.5deg);
    }

    100% {
      transform: translateY(0) rotate(90deg);
    }
  }

  @keyframes shadow324 {
    0%,
    100% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.2, 1);
    }
  }
`;

export const CircleLoadingSpinner = styled.div`
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
    border-top-color: var(--tertiary);
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

export const CircleLoadingSpinnerContainer = styled.div<ICircleLoadingSpinnerContainerCustomProps>`
  width: 4rem;
  height: 4rem;
  border-radius: 5rem;
  background-color: white;
  box-shadow: 0 1px 25px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 5%;
  left: 47%;
  transform: translate(-50%, -50%);
  z-index: 20;
  animation: ${(props) => (props.$show ? ShowToBottom : HideToTop)} 0.4s
    ease-out forwards;
`;
