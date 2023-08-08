import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Union } from "../../types/commonTypes";

const modalStates = ["open", "closed", "closing"] as const;
export type ModalState = Union<typeof modalStates>;
type ModalHandle = {
  state: ModalState;
  openModal: () => void;
  closeModal: () => void;
};

export default function useModals(
  closingTime = 300,
  afterClosed = () => void 0,
): [ModalHandle[], (states: ModalState[]) => void] {
  const [states, setStates] = useState<ModalState[]>([]);

  const openModalById = useCallback(
    (id: number) => () => {
      setStates((prev) => prev.map((_, idx) => (id === idx ? "open" : _)));
    },
    [],
  );

  const timeoutId = useRef<number>();
  const closeModalById = useCallback(
    (id: number) => () => {
      setStates((prev) => prev.map((_, idx) => (id === idx ? "closing" : _)));
      timeoutId.current = window.setTimeout(() => {
        setStates((prev) => prev.map((_, idx) => (id === idx ? "closed" : _)));
        afterClosed();
      }, closingTime);
    },
    [afterClosed, closingTime],
  );

  // clean up timeout on unmount
  useEffect(() => () => window.clearTimeout(timeoutId.current), []);

  return useMemo(
    () => [
      states.map((state, id) => {
        const openModal = openModalById(id);
        const closeModal = closeModalById(id);
        return { state, openModal, closeModal };
      }),
      setStates,
    ],
    [openModalById, closeModalById, states],
  );
}
