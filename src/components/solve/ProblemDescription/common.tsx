import { styled } from "styled-components";
import { spacer, SpacerProps } from "../../../lib/spacer";

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
