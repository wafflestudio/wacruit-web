import { styled } from "styled-components";
import { BoldText, HorizontalLine, Text } from "./styledComponents";
import { useState } from "react";

interface TestCase {
  input: string;
  output: string;
}

export default function TestCaseTable() {
  const [customTestCases, setCustomTestCases] = useState<TestCase[]>([]);
  return (
    <Table>
      <tbody>
        <TableHeader>
          <BoldText as="th">#</BoldText>
          <BoldText as="th">Input</BoldText>
          <BoldText as="th">Output</BoldText>
        </TableHeader>
        {/* TODO: Array 업데이트 */}
        {/* default test cases */}
        {[1, 2, 3].map((idx) => (
          <TestCase key={idx}>
            <BoldText as="th">{idx}</BoldText>
            <Text as="td">4, 5</Text>
            <Text as="td">
              a=4
              <br />
              b=5
            </Text>
          </TestCase>
        ))}

        {/* custom test cases */}
        {customTestCases.length !== 0 && (
          <HorizontalLine $marginTopInPX="20px" $marginBottomInPX="20px" />
        )}
      </tbody>
    </Table>
  );
}

// TODO: export 지우기
export const Table = styled.table`
  width: 100%;
  margin-top: 16px;
  > tbody {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const TableHeader = styled.tr`
  display: grid;
  grid-template-columns: 2fr 11fr 11fr;
  gap: 10px;
`;
export const TestCase = styled(TableHeader)`
  > th,
  td {
    background-color: #f6f6f6;
    padding: 10px 15px;
    border-radius: 5px;
  }
`;
