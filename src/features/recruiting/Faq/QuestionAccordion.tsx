import { useState } from "react";
import styled from "styled-components";
import { QuestionResponse } from "../../../types/apiTypes";
import { DropdownIcon } from "./DropdownIcon";

type FaqAccordionProps = {
  questions: QuestionResponse[];
};

export const FaqAccordion = ({ questions }: FaqAccordionProps) => {
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
      {questions.map(({ id, question, answer }) => (
        <FaqItem key={id}>
          <FaqQuestion
            onClick={() => {
              toggleOpen(id);
            }}
            $isOpen={openIds.has(id)}
          >
            <QuestionText>{question}</QuestionText>
            <ToggleButton $isOpen={openIds.has(id)}>
              <DropdownIcon />
            </ToggleButton>
          </FaqQuestion>
          {openIds.has(id) && <FaqAnswer>{answer}</FaqAnswer>}
        </FaqItem>
      ))}
    </FaqContainer>
  );
};

const FaqContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const FaqItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  gap: 0;
`;

const FaqQuestion = styled.button<{ $isOpen: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  gap: 20px;
  background: ${({ $isOpen, theme }) =>
    $isOpen ? theme.colors.yellow : theme.colors.black[100]};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    padding: 14px 24px;
  }
`;

const QuestionText = styled.span`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.18px;
  text-align: left;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[16]};
    letter-spacing: -0.16px;
  }
`;

const ToggleButton = styled.div<{ $isOpen: boolean }>`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease;
  flex-shrink: 0;
`;

const FaqAnswer = styled.div`
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.16px;

  @media (max-width: 768px) {
    padding: 14px 24px;
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;
