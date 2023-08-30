import { css } from "styled-components";
import {
  CompositeLoaderArgs,
  CompositeLoaderConfig,
} from "../functions/createCompositeLoader";
import { useEffect, useRef, useState } from "react";
import { useTransitionStore } from "../stores/useTransitionStore";

type AnimationStatus = "mount" | "unmount";

type Css = ReturnType<typeof css>;

export type Animator = (
  args: {
    url: URL;
    params: CompositeLoaderArgs["params"];
    animationStatus: AnimationStatus;
  } & CompositeLoaderConfig,
) => Css;

export const usePageAnimation = (animator: Animator) => {
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const animatorRef = useRef(animator);
  const [internalStatus, setInternalStatus] =
    useState<AnimationStatus>("mount");
  const { transitionStatus, lastRequestTarget } = useTransitionStore(
    (state) => state,
  );

  useEffect(() => {
    if (isInitialMount) {
      //on initial mount
      setIsInitialMount(false);
    } else {
      if (transitionStatus === "request") {
        setInternalStatus("unmount");
      } else {
        setInternalStatus("mount");
      }
    }
  }, [transitionStatus, isInitialMount]);

  return lastRequestTarget
    ? animatorRef.current({
        animationStatus: internalStatus,
        ...lastRequestTarget,
      })
    : animatorRef.current({
        animationStatus: internalStatus,
        transitionType: "phased",
        duration: 0,
        url: new URL(location.href),
        params: {},
      });
};
