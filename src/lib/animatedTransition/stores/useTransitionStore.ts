import { create } from "zustand";
import { CompositeLoaderArgs } from "../functions/createCompositeLoader";

type TransitionStore = {
  transitionStatus: "stable" | "request";
  lastRequestTarget: CompositeLoaderArgs | null;
  startTransition: (target: CompositeLoaderArgs) => void;
  endTransition: () => void;
};

export const useTransitionStore = create<TransitionStore>()((set) => ({
  transitionStatus: "stable",
  lastRequestTarget: null,
  startTransition: (target) =>
    set((state) => {
      // prevent transition when target is same as previous
      if (state.lastRequestTarget === target) return state;

      // request transition
      return {
        transitionStatus: "request",
        lastRequestTarget: target,
      };
    }),
  endTransition: () => {
    set({ transitionStatus: "stable" });
  },
}));
