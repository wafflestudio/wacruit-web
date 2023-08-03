import { styled } from "styled-components";
import { spacer, SpacerProps } from "../../../lib/spacer";
import { ReactNode, useState } from "react";

export interface TestCase {
  input: string;
  output: string;
}

export const Text = styled.p<SpacerProps>`
  ${spacer}
  font-size: 18px;
  line-height: 160%;
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const HorizontalLine = styled.hr<SpacerProps>`
  ${spacer}
  height: 1px;
`;

export const Table = styled.table<SpacerProps>`
  ${spacer}
  width: 100%;
  > tbody {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const TableHeader = styled.tr`
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  gap: 10px;
  > td {
    > pre {
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
`;

export const TableItem = styled(TableHeader)`
  > th,
  td {
    background-color: #f6f6f6;
    padding: 10px 15px;
    border-radius: 5px;
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
    padding: 10px 15px;
    border-radius: 5px;
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
    border-radius: 5px;
    animation: appear 300ms;
    @keyframes appear {
      from {
        opacity: 0;
      }
    }
  }
  > button {
    display: block;
    padding: 13.2px 17.5px;
    font-size: 14px;
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
    padding: 10px 15px;
    background-color: #f6f6f6;
  }
`;
