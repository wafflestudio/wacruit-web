import styled from "styled-components";
import { ModalState } from "./useModals";
import { ReactNode } from "react";
import { createPortal } from "react-dom";
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
  if (handle.state === "closed") return null;

  // body로 포털하지 않으면 모달을 연 쪽(헤더 등)의 스택 컨텍스트에 갇혀
  // 페이지 콘텐츠에 가려질 수 있다
  return createPortal(
    <ModalContainer
      onClick={onBackgroundClicked ?? handle.closeModal}
      $state={handle.state}
      $backgroundColor={modalContainerBackgroundColor || "transparent"}
    >
      <ModalDiv onClick={(e) => e.stopPropagation()}>{children}</ModalDiv>
    </ModalContainer>,
    document.body,
  );
}

const ModalContainer = styled.div<{
  $state: ModalState;
  $backgroundColor: string;
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
    "background-color": props.$backgroundColor,
  })};

  ${(props) =>
    props.$state === "closing" &&
    `opacity: 0; transition: 300ms; *{pointer-events: none;}`}

  @keyframes modal-container-appear {
    from {
      opacity: 0;
    }
  }
`;

const ModalDiv = styled.div``;
