import { styled } from "styled-components";
import { spacer, SpacerProps } from "../../../lib/spacer";
import { ReactNode, useState } from "react";

export interface TestCase {
  input: string;
  output: string;
}

export const Text = styled.p<SpacerProps>`
  ${spacer}
  font-size: 1.8rem;
  line-height: 160%;
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const HorizontalLine = styled.hr<SpacerProps>`
  ${spacer}
  height: 0.1rem;
`;

export const Table = styled.table<SpacerProps>`
  ${spacer}
  width: 100%;
  > tbody {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TableHeader = styled.tr`
  display: grid;
  grid-template-columns: 6rem 1fr 1fr;
  gap: 1rem;
  > td {
    > pre {
      font-family: Pretendard;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
`;

export const TableItem = styled(TableHeader)`
  > th,
  td {
    background-color: #f6f6f6;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
  }
  > td:focus-within {
    background-color: #e6e6e6;
  }
`;

interface DeletableTableItemProps {
  index: number;
  deleteItem: () => void;
  children: ReactNode;
}

export function DeletableTableItem({
  index,
  deleteItem,
  children,
}: DeletableTableItemProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <DeletableTableRow
      onMouseEnter={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      <DeletableTh>
        {isHover ? (
          <button onClick={deleteItem}>삭제</button>
        ) : (
          <BoldText>{index}</BoldText>
        )}
      </DeletableTh>
      {children}
    </DeletableTableRow>
  );
}

const DeletableTableRow = styled(TableHeader)`
  td {
    background-color: #f6f6f6;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
  }
  > td:focus-within {
    background-color: #e6e6e6;
  }
`;

const DeletableTh = styled.th`
  background-color: transparent;
  > button,
  p {
    width: 100%;
    height: 100%;
    color: #323232;
    border-radius: 0.5rem;
    animation: appear 300ms;
    @keyframes appear {
      from {
        opacity: 0;
      }
    }
  }
  > button {
    display: block;
    padding: 1.3199999999999998rem 1.75rem;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 160%;
    letter-spacing: 5%;
    border: none;
    background-color: #f0745f;
    transition: 0.3s;
    &:hover {
      transition: inherit;
      background-color: #e6e6e6;
      cursor: pointer;
    }
  }
  > p {
    padding: 1rem 1.5rem;
    background-color: #f6f6f6;
  }
`;
