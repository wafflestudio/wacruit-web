import styled from "styled-components";

type ConfirmModalProps = {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
  irreversible?: boolean;
};

export default function ConfirmModal({
  title,
  description,
  confirmLabel,
  onConfirm,
  onClose,
  irreversible = false,
}: ConfirmModalProps) {
  return (
    <Dialog
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-description"
    >
      <Title id="confirm-title">{title}</Title>
      <Description id="confirm-description">{description}</Description>
      <Buttons>
        <CloseButton type="button" onClick={onClose} autoFocus={irreversible}>
          닫기
        </CloseButton>
        <ConfirmButton
          type="button"
          onClick={onConfirm}
          autoFocus={!irreversible}
        >
          {confirmLabel}
        </ConfirmButton>
      </Buttons>
    </Dialog>
  );
}

const Dialog = styled.div`
  box-sizing: border-box;
  width: min(44rem, calc(100vw - 4rem));
  padding: 3.2rem;
  border-radius: 0.8rem;
  background: #fff;
  box-shadow: 0 0.4rem 2.4rem rgba(0, 0, 0, 0.18);
  font-family: Pretendard, sans-serif;
`;

const Title = styled.h2`
  margin: 0;
  color: #222;
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 140%;
`;

const Description = styled.p`
  margin: 1.2rem 0 0;
  color: #737373;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.064rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const BaseButton = styled.button`
  padding: 1.2rem 2.4rem;
  border-radius: 0.5rem;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
`;

const CloseButton = styled(BaseButton)`
  border: 0.1rem solid #d1d1d1;
  background: #fff;
  color: #515151;

  &:hover {
    background: #f6f6f6;
  }
`;

const ConfirmButton = styled(BaseButton)`
  border: 0.1rem solid #f0745f;
  background: #f0745f;
  color: #fff;

  &:hover {
    background: #e05c46;
    border-color: #e05c46;
  }
`;
