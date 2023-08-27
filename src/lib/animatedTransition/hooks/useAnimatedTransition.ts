import { create } from "zustand";

type AnimatedTransitionStore = {
  transitionStatus: "stable" | "request";
  lastRequestTarget: string | null;
  setTransitionStatus: (
    status: AnimatedTransitionStore["transitionStatus"],
  ) => void;
  startTransition: (target: string) => void;
  endTransition: () => void;
};

export const useAnimatedTransition = create<AnimatedTransitionStore>()(
  (set) => ({
    transitionStatus: "stable",
    lastRequestTarget: null,
    setTransitionStatus: (status) => set({ transitionStatus: status }),
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
  }),
);
