import { css, keyframes } from "styled-components";
import { commonOpacityAnimator } from "../../lib/animatedTransition/functions/commonAnimation";
import {
  createAlternateKeyframes,
  createAnimationSetup,
} from "../../lib/animatedTransition/functions/createAnimation";
import { Animator } from "../../lib/animatedTransition/hooks/usePageAnimation";

export const dashboardMainAnimator: Animator = (args) => {
  return css`
    ${commonOpacityAnimator(args)}
  `;
};

const cardKeyframes = createAlternateKeyframes(
  `transform: translate(0, 100%); opacity: 0;`,
  `transform: translate(0, 0); opacity: 1;`,
);
const selectedCardKeyframes = keyframes`
from { transform: translateY(-10px) }
to { transform: translateY(-50%) } 
`;

export const progressCardAnimator =
  (index: number, pathname?: string): Animator =>
  ({ url, duration, animationStatus }) => {
    if (pathname && url.pathname.endsWith(pathname)) {
      return css`
        ${createAnimationSetup(duration)}
        animation-name: ${selectedCardKeyframes}
      `;
    }

    return css`
      ${createAnimationSetup(duration, "backwards")}
      animation-delay: ${index / 10}s;
      animation-name: ${animationStatus === "unmount"
        ? cardKeyframes[1]
        : cardKeyframes[0]};
    `;
  };
