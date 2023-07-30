import styled from "styled-components";
import { ModalState } from "./useModal";
import { ReactNode } from "react";
import { zIndex } from "../../lib/zIndex";

interface ModalProps {
  handle: ReturnType<
    (afterClosed?: () => void) => {
      state: ModalState;
      openModal: () => void;
      closeModal: () => void;
    }
  >;
  children: ReactNode;
  onBackgroundClicked?: () => void;
  modalContainerBackgroundColor?: string;
}

export default function Modal({
  handle,
  children,
  onBackgroundClicked,
  modalContainerBackgroundColor,
}: ModalProps) {
  return (
    handle.state !== "closed" && (
      <ModalContainer
        onClick={onBackgroundClicked ?? handle.closeModal}
        state={handle.state}
        backgroundColor={modalContainerBackgroundColor || "transparent"}
      >
        <ModalDiv onClick={(e) => e.stopPropagation()}>{children}</ModalDiv>
      </ModalContainer>
    )
  );
}

const ModalContainer = styled.div<{
  state: ModalState;
  backgroundColor: string;
}>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.modal};
  animation: modal-container-appear 300ms;
  ${(props) => ({
    "background-color": props.backgroundColor,
  })};

  ${(props) =>
    props.state === "closing" &&
    `opacity: 0; transition: 300ms; *{pointer-events: none;}`}

  @keyframes modal-container-appear {
    from {
      opacity: 0;
    }
  }
`;

const ModalDiv = styled.div``;
