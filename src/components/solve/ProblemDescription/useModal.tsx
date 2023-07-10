import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type ValueType = string | number | boolean;
type Union<T extends ReadonlyArray<ValueType>> = T[number];

const modalStates = ["open", "closed", "closing"] as const;
export type ModalState = Union<typeof modalStates>;
// type ModalState = "open" | "closed" | "closing";

export default function useModal(afterClosed = () => void 0) {
  const [state, setState] = useState<ModalState>("closed");
  const openModal = useCallback(() => {
    setState("open");
  }, []);
  const timeoutId = useRef<number>();
  const closeModal = useCallback(() => {
    setState("closing");
    timeoutId.current = window.setTimeout(() => {
      setState("closed");
      afterClosed();
    }, 300);
  }, [afterClosed]);
  // clean up timeout on unmount
  useEffect(() => () => window.clearTimeout(timeoutId.current), []);
  return useMemo(
    () => ({
      state,
      openModal,
      closeModal,
    }),
    [closeModal, openModal, state],
  );
}
