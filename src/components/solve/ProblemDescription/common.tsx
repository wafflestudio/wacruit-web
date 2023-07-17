import { styled } from "styled-components";
import { spacer, SpacerProps } from "../../../lib/spacer";

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
