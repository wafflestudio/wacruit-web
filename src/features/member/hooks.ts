import { useEffect, useState } from "react";
import type { CorePos } from "./constants";
import { POSITION_LABEL } from "./constants";

export function useIsMobile(breakpoint = 767) {
  const getInitial = () =>
    typeof window === "undefined"
      ? false
      : window.matchMedia(`(max-width: ${breakpoint}px)`).matches;

  const [isMobile, setIsMobile] = useState<boolean>(getInitial());
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, [breakpoint]);

  return isMobile;
}

export function parseGeneration(gen: string): number {
  const n = parseFloat(gen);
  return Number.isFinite(n) ? n : -Infinity;
}

export function formatPositionLabel(pos: CorePos, isMobile: boolean) {
  const label = POSITION_LABEL[pos];
  if (!isMobile) return label;
  if (pos === "frontend") return "Front";
  if (pos === "backend") return "Back";
  return label;
}
