import { useState } from "react";
import styled from "styled-components";

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

const mockFaqData: FaqItem[] = [
  { id: 1, question: "질문 예시 하드코딩 1", answer: "답변 예시 1" },
  { id: 2, question: "질문 예시 하드코딩 2", answer: "답변 예시 2" },
  { id: 3, question: "질문 예시 하드코딩 3", answer: "답변 예시 3" },
  { id: 4, question: "질문 예시 하드코딩 4", answer: "답변 예시 4" },
  { id: 5, question: "질문 예시 하드코딩 5", answer: "답변 예시 5" },
];

export const FaqAccordion = () => {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  const toggleOpen = (id: number) => {
    setOpenIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <FaqContainer>
      {mockFaqData.map(({ id, question, answer }) => (
        <FaqBox>
          <FaqItem key={id}>
            <FaqQuestion 
              onClick={() => { toggleOpen(id); }}
              $isOpen={openIds.has(id)}
            >
              <QuestionText>{question}</QuestionText>
              <ToggleButton $isOpen={openIds.has(id)}>
                <DropdownIcon />
              </ToggleButton>
            </FaqQuestion>
            {openIds.has(id) && (
              <FaqAnswer>
                {answer}
              </FaqAnswer>
            )}
          </FaqItem>
        </FaqBox>
      ))}
    </FaqContainer>
  );
};

const FaqContainer = styled.div`
  display: flex;
  max-width: 1000px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  width: 100%;
`;

const FaqItem = styled.div`
  display: flex;
  padding: 16px 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.grey100};
`;
const FaqBox = styled.div`
  display: flex;
  max-width: 1000px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const FaqQuestion = styled.button<{ $isOpen: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 15px 32px;
  background: ${({ $isOpen }) => 
    $isOpen ? 'var(--yellow, #F4FF61)' : '#F1F2F5'};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
`;


const QuestionText = styled.span`
  color: var(--black-900, #121212);
  font-size: 18px;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.18px;
  text-align: left;
`;

const ToggleButton = styled.div<{ $isOpen: boolean }>`
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  
`;

const DropdownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
    <mask id="mask0_2121_2756" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32">
      <rect width="32" height="32" fill="#D9D9D9"/>
    </mask>
    <g mask="url(#mask0_2121_2756)">
      <path d="M16.016 22.2185L22.1537 16.0808L20.3949 14.3225L17.2792 17.4383V9.76505H14.7368V17.4383L11.6211 14.3225L9.86232 16.0808L16.016 22.2185ZM16.0029 32C13.7899 32 11.7098 31.5801 9.76253 30.7402C7.8153 29.9004 6.12154 28.7606 4.68126 27.3208C3.24098 25.8811 2.10063 24.1881 1.26021 22.2417C0.42007 20.2953 0 18.2157 0 16.0029C0 13.7899 0.41993 11.7098 1.25979 9.76253C2.09965 7.8153 3.23944 6.12154 4.67916 4.68126C6.11888 3.24098 7.81193 2.10063 9.75832 1.26021C11.7047 0.42007 13.7843 0 15.9971 0C18.2101 0 20.2902 0.419929 22.2375 1.25979C24.1847 2.09965 25.8785 3.23944 27.3187 4.67916C28.759 6.11888 29.8994 7.81193 30.7398 9.75832C31.5799 11.7047 32 13.7843 32 15.9971C32 18.2101 31.5801 20.2902 30.7402 22.2375C29.9004 24.1847 28.7606 25.8785 27.3208 27.3187C25.8811 28.759 24.1881 29.8994 22.2417 30.7398C20.2953 31.5799 18.2157 32 16.0029 32Z" fill="#83004C"/>
    </g>
  </svg>
);

const FaqAnswer = styled.div`
  display: flex;
  padding: 16px 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  align-self: stretch;
  background: var(--black-100, #F1F2F5);
  margin-top: -32px;

`;