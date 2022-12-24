import { keyframes } from "styled-components";

export const ShowToRight = keyframes`
    0% {
        opacity: 0;
        transform: translateX(-100%);
    }
    50% {
        opacity: 1;
        transform: translateX(30%);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const HideToLeft = keyframes`
    0% {
        opacity: 1;
        transform: translateX(0);
    }
    50% {
        opacity: 0.8;
        transform: translateX(30%);
    }
    100% {
        opacity: 0;
        transform: translateX(-100%);
    }
`;

export const ShowToBottom = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-100%);
    }
    50% {
        opacity: 1;
        transform: translateY(30%);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const HideToTop = keyframes`
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    50% {
        opacity: 0.8;
        transform: translateY(30%);
    }
    100% {
        opacity: 0;
        transform: translateY(-100%);
    }
`;
