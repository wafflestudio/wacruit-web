import styled from "styled-components";
import { ModalState } from "./useModal";
import React, { ReactNode } from "react";

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
}

export default function Modal({
  handle,
  children,
  onBackgroundClicked,
}: ModalProps) {
  return (
    handle.state !== "closed" && (
      <ModalContainer
        onClick={onBackgroundClicked ?? handle.closeModal}
        state={handle.state}
      >
        <ModalDiv onClick={(e) => e.stopPropagation()}>{children}</ModalDiv>
      </ModalContainer>
    )
  );
}

const ModalContainer = styled.div<{ state: ModalState }>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
  animation: modal-container-appear 300ms;
  overflow: auto;

  ${(props) =>
    props.state === "closing" &&
    `opacity: 0; transition: 300ms; *{pointer-events: none;}`}

  @keyframes modal-container-appear {
    from {
      opacity: 0;
    }
  }
`;

const ModalDiv = styled.div`
  min-width: 62.5%;
`;
