import { ChangeEventHandler, useState } from "react";
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
  return (
    <Wrapper>
      <Question>{`${index}. ${question}`}</Question>
      <TextArea
        value={value}
        onChange={(e) => {
          if (e.target.value.length > max) {
            setIsLimit(true);
          } else {
            setIsLimit(false);
            onChange(e);
          }
        }}
      />
      <Count>
        {isLimit ? `${max}자를 초과할 수 없습니다` : `${value.length} / ${max}`}
      </Count>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
const Question = styled.div`
  color: #404040;
  font-size: 2rem;
  font-weight: 400;
  line-height: 160%; /* 3.2rem */
  letter-spacing: 0.08rem;
`;
const TextArea = styled.textarea`
  height: 21.4rem;
  padding: 1.5rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.1rem solid #d9d9d9;
  background: #f6f6f6;
  resize: none;
  font: inherit;
  &:focus {
    background: #e6e6e6;
    outline: none;
  }
`;
const Count = styled.div`
  position: absolute;
  right: 3.2rem;
  bottom: 1.5rem;
  color: #737373;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 160%; /* 2.56rem */
  letter-spacing: 0.064rem;
`;
