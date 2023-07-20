import { ChangeEventHandler } from "react";
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
  return (
    <Wrapper>
      <Question>{`${index}. ${question}`}</Question>
      <TextArea value={value} onChange={onChange} />
      <Count>{`${value.length} / ${max}`}</Count>
    </Wrapper>
  );
}

const Wrapper = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Question = styled.div`
  color: #404040;
  font-size: 20px;
  font-weight: 400;
  line-height: 160%; /* 32px */
  letter-spacing: 0.8px;
`;
const TextArea = styled.textarea`
  height: 214px;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background: #f6f6f6;
  resize: none;
  font: inherit;
`;
const Count = styled.div`
  position: absolute;
  right: 32px;
  bottom: 15px;
  color: #737373;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
`;
