import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Union } from "../../types/commonTypes";

const modalStates = ["open", "closed", "closing"] as const;
export type ModalState = Union<typeof modalStates>;

export default function useModal(
  closingTime = 300,
  afterClosed = () => void 0,
) {
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
    }, closingTime);
  }, [afterClosed, closingTime]);

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
