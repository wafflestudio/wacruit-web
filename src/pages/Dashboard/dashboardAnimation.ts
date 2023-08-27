import { css } from "styled-components";
import {
  defaultOpacityAnimation,
  slideFromBottom,
  slideToBottom,
} from "../../lib/animatedTransition/functions/commonAnimation";
import { createAnimationSetup } from "../../lib/animatedTransition/functions/createAnimation";

export const dashboardAnimationDuration = 500;

export const dashboardAnimationCss = (isTransitionActive: boolean) => css`
  ${defaultOpacityAnimation(dashboardAnimationDuration, isTransitionActive)}
  .fromBottom {
    ${createAnimationSetup(dashboardAnimationDuration)}
    animation-name: ${isTransitionActive ? slideToBottom : slideFromBottom}
  }
`;
