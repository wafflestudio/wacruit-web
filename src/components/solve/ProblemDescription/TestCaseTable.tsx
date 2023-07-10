import {
  BoldText,
  HorizontalLine,
  Table,
  TableHeader,
  TableItem,
  Text,
} from "./styledComponents";
import { TestCase } from "./ProblemDescription";

interface TestCaseTableProps {
  defaultTestCases: TestCase[];
  customTestCases: TestCase[];
}

export default function TestCaseTable({
  defaultTestCases,
  customTestCases,
}: TestCaseTableProps) {
  return (
    <Table>
      <tbody>
        <TableHeader>
          <BoldText as="th">#</BoldText>
          <BoldText as="th">Input</BoldText>
          <BoldText as="th">Output</BoldText>
        </TableHeader>

        {/* default test cases */}
        {defaultTestCases.map((testCaseItem, idx) => (
          <TableItem key={idx}>
            <BoldText as="th">{idx + 1}</BoldText>
            <Text as="td">4, 5</Text>
            <Text as="td">
              a=4
              <br />
              b=5
            </Text>
          </TableItem>
        ))}

        {/* custom test cases */}
        {customTestCases.length !== 0 && <HorizontalLine margin="20px 0" />}
        {customTestCases?.map((testCaseItem, idx) => (
          <TableItem key={idx}>
            {/* TODO: 아래 3+idx 업데이트 */}
            <BoldText as="th">{defaultTestCases.length + idx + 1}</BoldText>
            <td>
              <Text as="pre">{testCaseItem.input}</Text>
            </td>
            <td>
              <Text as="pre">{testCaseItem.output}</Text>
            </td>
          </TableItem>
        ))}
      </tbody>
    </Table>
  );
}
