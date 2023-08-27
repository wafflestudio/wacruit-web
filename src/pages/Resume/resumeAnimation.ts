import { css } from "styled-components";
import { defaultOpacityAnimation } from "../../lib/animatedTransition/functions/commonAnimation";

export const resumeAnimationDuration = 500;

export const resumeAnimation = (isTransitionActive: boolean) => css`
  ${defaultOpacityAnimation(resumeAnimationDuration, isTransitionActive)}
`;
