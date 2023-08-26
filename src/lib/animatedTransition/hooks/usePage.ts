import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAnimatedTransition } from "./useAnimatedTransition";

export const usePage = <T>() => {
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const [isTransitionActive, setIsTransitionActive] = useState<boolean>(false);
  const data = useLoaderData() as T;
  const { transitionStatus, setTransitionStatus } = useAnimatedTransition(
    (state) => state,
  );

  useEffect(() => {
    if (isInitialMount) {
      //on initial mount
      setTransitionStatus("stable");
      setIsInitialMount(false);
    } else {
      // on transition request
      if (transitionStatus === "request") {
        setIsTransitionActive(true);
      }
    }
  }, [transitionStatus, isInitialMount]);

  useEffect(() => {
    return () => {
      setIsInitialMount(true);
      setIsTransitionActive(false);
    };
  }, []);

  return { isTransitionActive, data };
};
