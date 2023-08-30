import { css } from "styled-components";
import {
  createAlternateKeyframes,
  createAnimationSetup,
} from "./createAnimation";
import { Animator } from "../hooks/usePageAnimation";

/**
 * opacity를 조절하는 가장 기본적인 애니메이션입니다. 대충 넣으면 페이지가 자연스럽게 넘어갑니다.
 *
 * @param ms 지속시간
 * @param isDisappearing true면 사라
 * @returns styled-components에서 사용 가능한 css 문자열
 */
export const defaultOpacityAnimation = (
  ms: number,
  isDisappearing: boolean,
) => css`
  ${createAnimationSetup(ms)}
  animation-name: ${isDisappearing ? decreaseOpacity : increaseOpacity};
`;

export const commonOpacityAnimator: Animator = ({
  duration,
  animationStatus,
}) => css`
  ${createAnimationSetup(duration)}
  animation-name: ${animationStatus === "unmount"
    ? decreaseOpacity
    : increaseOpacity};
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
