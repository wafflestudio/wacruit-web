import { css } from "styled-components";
import {
  CompositeLoaderArgs,
  CompositeLoaderConfig,
} from "../functions/createCompositeLoader";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const { transitionStatus, lastRequestTarget } = useTransitionStore(
    (state) => state,
  );
  const getAnimationStatus = useMemo(() => {
    if (isInitialMount) return "mount";
    return transitionStatus === "request" ? "unmount" : "mount";
  }, [transitionStatus, isInitialMount]);

  useEffect(() => {
    setIsInitialMount(false);
  }, []);

  return lastRequestTarget
    ? animatorRef.current({
        animationStatus: getAnimationStatus,
        ...lastRequestTarget,
      })
    : animatorRef.current({
        animationStatus: getAnimationStatus,
        transitionType: "phased",
        duration: 0,
        url: new URL(location.href),
        params: {},
      });
};
