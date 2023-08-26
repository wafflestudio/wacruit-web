import { useEffect, useState } from "react";
import { useAnimatedTransition } from "./useAnimatedTransition";
import { useLoaderData } from "../../refinedReactRouterDom/useLoaderData";

export const usePage = <T>() => {
  const [isInitialMount, setIsInitialMount] = useState<boolean>(true);
  const [isTransitionActive, setIsTransitionActive] = useState<boolean>(false);
  const data = useLoaderData<T>();
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
