import { styled } from "styled-components";
import { spacer, spacerProps } from "./spacer";

export const Text = styled.p<spacerProps>`
  margin: 0;
  font-size: 18px;
  line-height: 160%;
  ${spacer}
`;

export const BoldText = styled(Text)`
  font-weight: bold;
`;

export const HorizontalLine = styled.hr<spacerProps>`
  height: 1px;
  ${spacer}
`;

export const Table = styled.table<spacerProps>`
  width: 100%;
  > tbody {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  ${spacer}
`;

export const TableHeader = styled.tr`
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  gap: 10px;
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
