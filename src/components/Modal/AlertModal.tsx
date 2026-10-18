import styled from "styled-components";

type AlertModalProps = {
  title: string;
  description?: string;
  onClose: () => void;
};

export default function AlertModal({
  title,
  description,
  onClose,
}: AlertModalProps) {
  return (
    <Dialog
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="alert-title"
      aria-describedby={description ? "alert-description" : undefined}
    >
      <Title id="alert-title">{title}</Title>
      {description && (
        <Description id="alert-description">{description}</Description>
      )}
      <Buttons>
        <ConfirmButton type="button" onClick={onClose} autoFocus>
          확인
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
  white-space: pre-line;
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
  margin-top: 2.8rem;
`;

const ConfirmButton = styled.button`
  padding: 1rem 1.8rem;
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.black[700]};
    border-color: ${({ theme }) => theme.colors.black[700]};
  }
`;
