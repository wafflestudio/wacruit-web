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
  white-space: pre-line;
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
  margin-top: 3rem;
`;

const ConfirmButton = styled.button`
  padding: 1.2rem 2.4rem;
  border: 0.1rem solid #f0745f;
  border-radius: 0.5rem;
  background: #f0745f;
  color: #fff;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #e05c46;
    border-color: #e05c46;
  }
`;
