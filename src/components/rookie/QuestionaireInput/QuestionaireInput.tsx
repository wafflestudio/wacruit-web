import { ChangeEventHandler, useId, useState } from "react";
import styled from "styled-components";

type QuestionaireInputProps = {
  index: number;
  question: string;
  max: number;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default function QuestionaireInput({
  index,
  question,
  max,
  value,
  onChange,
}: QuestionaireInputProps) {
  const [isLimit, setIsLimit] = useState(false);
  const id = useId();
  return (
    <Wrapper>
      <QuestionNumber>문항 {index}</QuestionNumber>
      <Question htmlFor={id}>{question}</Question>
      <TextArea
        id={id}
        value={value}
        placeholder="답변을 입력해주세요."
        onChange={(e) => {
          if (e.target.value.length > max) {
            setIsLimit(true);
          } else {
            setIsLimit(false);
            onChange(e);
          }
        }}
      />
      <Count $isLimit={isLimit}>
        {isLimit ? `${max}자를 초과할 수 없습니다` : `${value.length} / ${max}`}
      </Count>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const QuestionNumber = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const Question = styled.label`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[16]};
  }
`;

const TextArea = styled.textarea`
  height: 21.4rem;
  padding: 1.4rem 1.6rem;
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 1.7;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.oak};
  }
`;

const Count = styled.p<{ $isLimit: boolean }>`
  align-self: flex-end;
  margin: 0;
  color: ${({ $isLimit, theme }) =>
    $isLimit ? theme.colors.pink : theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ $isLimit, theme }) =>
    $isLimit ? theme.fontWeights.semibold : theme.fontWeights.medium};
  font-variant-numeric: tabular-nums;
`;
