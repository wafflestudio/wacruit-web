import { styled } from "styled-components";
import { spacer, SpacerProps } from "../../../lib/spacer";
import { ReactNode, useState } from "react";

export interface TestCase {
  input: string;
  output: string;
}

export const Text = styled.p<SpacerProps>`
  ${spacer}
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 1.6;
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const HorizontalLine = styled.hr<SpacerProps>`
  ${spacer}
  height: 1px;
  border: 0;
  background-color: ${({ theme }) => theme.colors.black[200]};
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
  grid-template-columns: 4rem 1fr 1fr;
  gap: 0.6rem;
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
    padding: 0.8rem 1.2rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
  > th {
    background-color: transparent;
  }
  > td pre {
    font-family: monospace;
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
    padding: 0.8rem 1.2rem;
    border-radius: 0.4rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
  > td:focus-within {
    background-color: ${({ theme }) => theme.colors.black[200]};
  }
`;

const DeletableTh = styled.th`
  background-color: transparent;
  > button,
  p {
    width: 100%;
    height: 100%;
    color: ${({ theme }) => theme.colors.black[900]};
    border-radius: 0.4rem;
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
    background-color: ${({ theme }) => theme.colors.black[900]};
    color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
    &:hover {
      transition: inherit;
      background-color: ${({ theme }) => theme.colors.black[700]};
      cursor: pointer;
    }
  }
  > p {
    padding: 0.8rem 1.2rem;
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;
