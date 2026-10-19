import {
  BoldText,
  Table,
  TableHeader,
  TableItem,
  TestCase,
  Text,
} from "./common";

interface TestCaseTableProps {
  defaultTestCases: TestCase[];
}

export default function TestCaseTable({
  defaultTestCases,
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
