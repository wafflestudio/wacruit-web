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
            <td>
              <Text as="pre">{testCaseItem.input}</Text>
            </td>
            <td>
              <Text as="pre">{testCaseItem.output}</Text>
            </td>
          </TableItem>
        ))}

        {/* custom test cases */}
        {customTestCases.length !== 0 && (
          <tr style={{ width: "100%" }}>
            <td style={{ display: "block", width: "100%" }}>
              <HorizontalLine margin="5px 0" />
            </td>
          </tr>
        )}
        {customTestCases.map((testCaseItem, idx) => (
          <TableItem key={idx}>
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
