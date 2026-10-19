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
          $irreversible={irreversible}
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
  border-radius: 1.6rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: Pretendard, sans-serif;
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[20]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const Description = styled.p`
  margin: 1rem 0 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 2.8rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const BaseButton = styled.button`
  padding: 1rem 1.8rem;
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    opacity 0.2s ease;
`;

const CloseButton = styled(BaseButton)`
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};

  &:hover {
    background: ${({ theme }) => theme.colors.black[100]};
  }
`;

const ConfirmButton = styled(BaseButton)<{ $irreversible: boolean }>`
  border: 1px solid
    ${({ $irreversible, theme }) =>
      $irreversible ? theme.colors.pink : theme.colors.black[900]};
  background: ${({ $irreversible, theme }) =>
    $irreversible ? theme.colors.pink : theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    ${({ $irreversible, theme }) =>
      $irreversible
        ? "opacity: 0.85;"
        : `background: ${theme.colors.black[700]}; border-color: ${theme.colors.black[700]};`}
  }
`;
