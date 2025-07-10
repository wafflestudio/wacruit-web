import type { RefObject } from "react";
import { useEffect, useState } from "react";

export const useIsVisible = (ref: RefObject<HTMLElement>): boolean => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current !== null) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry?.isIntersecting ?? false);
        },
        { rootMargin: "-10px" },
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return isIntersecting;
};
