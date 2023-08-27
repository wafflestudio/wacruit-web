import { css } from "styled-components";
import { defaultOpacityAnimation } from "../../lib/animatedTransition/functions/commonAnimation";

export const resultAnimationDuration = 500;

export const resultAnimation = (isTransitionActive: boolean) => css`
  ${defaultOpacityAnimation(resultAnimationDuration, isTransitionActive)}
`;
