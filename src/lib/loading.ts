import { css, keyframes } from "styled-components";

const LoadingBackgroundBlinkKeyframe = keyframes`
  0% {
    background-color: rgba(0,0,0,0.4);
  }
  100% {
    background-color: rgba(0,0,0,0.15);
  }
`;

export const LoadingBackgroundBlink = css`
  ${LoadingBackgroundBlinkKeyframe} 0.8s ease-in-out infinite alternate
`;
