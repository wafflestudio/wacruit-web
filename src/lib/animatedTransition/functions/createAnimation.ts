import { css, keyframes } from "styled-components";

export const createAnimationSetup = (
  ms: number,
  timingFunction = "ease",
) => css`
  animation-fill-mode: both;
  animation-duration: ${ms / 1000}s;
  animation-timing-function: ${timingFunction};
`;

export const createAlternateKeyframes = (start: string, end: string) => [
  keyframes`from { ${start} } to { ${end} }`,
  keyframes`from { ${end} } to { ${start} }`,
];
