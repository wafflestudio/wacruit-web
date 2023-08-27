import { css } from "styled-components";
import {
  createAlternateKeyframes,
  createAnimationSetup,
} from "./createAnimation";

export const defaultOpacityAnimation = (
  ms: number,
  isDisappearing: boolean,
) => css`
  ${createAnimationSetup(ms)}
  animation-name: ${isDisappearing ? decreaseOpacity : increaseOpacity};
`;

export const [increaseOpacity, decreaseOpacity] = createAlternateKeyframes(
  `opacity: 0;`,
  `opacity: 1;`,
);

/**
 * slide animations
 */

export const slide = (x = "0", y = "0") =>
  createAlternateKeyframes(
    `transform: translate(${x},${y});`,
    `transform: translate(0,0)`,
  );

export const [slideFromBottom, slideToBottom] = slide("0", "100%");
export const [slideFromTop, slideToTop] = slide("0", "-100%");
