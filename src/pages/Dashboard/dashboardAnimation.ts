import { css } from "styled-components";
import {
  commonOpacityAnimator,
  slideFromBottom,
  slideToBottom,
} from "../../lib/animatedTransition/functions/commonAnimation";
import { createAnimationSetup } from "../../lib/animatedTransition/functions/createAnimation";
import { Animator } from "../../lib/animatedTransition/hooks/usePageAnimation";

export const dashboardMainAnimator: Animator = (args) => css`
  ${commonOpacityAnimator(args)}
  .fromBottom {
    ${createAnimationSetup(args.duration)}
    animation-name: ${args.animationStatus === "unmount"
      ? slideToBottom
      : slideFromBottom}
  }
`;
