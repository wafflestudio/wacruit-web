import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAnimatedTransition } from "./useAnimatedTransition";

export const usePage = <T>() => {
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const [isTransitionActive, setIsTransitionActive] = useState<boolean>(false);
  const data = useLoaderData() as T;
  const { transitionStatus } = useAnimatedTransition((state) => state);

  useEffect(() => {
    if (isInitialMount) {
      //on initial mount
      setIsInitialMount(false);
    } else {
      // on transition request
      if (transitionStatus === "request") {
        setIsTransitionActive(true);
      } else {
        setIsTransitionActive(false);
      }
    }
  }, [transitionStatus, isInitialMount]);

  return { isTransitionActive, data };
};
