import {
  BoldText,
  DeletableTableItem,
  HorizontalLine,
  Table,
  TableHeader,
  TableItem,
  TestCase,
  Text,
} from "./common";

interface TestCaseTableProps {
  defaultTestCases: TestCase[];
  customTestCases: TestCase[];
  deleteCustomTestCase: (idx: number) => void;
}

export default function TestCaseTable({
  defaultTestCases,
  customTestCases,
  deleteCustomTestCase,
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

        {/* horizontal line */}
        {customTestCases.length !== 0 && (
          <tr style={{ width: "100%" }}>
            <td style={{ display: "block", width: "100%" }}>
              <HorizontalLine margin="5px 0" />
            </td>
          </tr>
        )}

        {/* custom test cases */}
        {customTestCases.map((testCaseItem, idx) => (
          <DeletableTableItem
            key={idx}
            index={defaultTestCases.length + idx + 1}
            deleteItem={() => deleteCustomTestCase(idx)}
          >
            <td>
              <Text as="pre">{testCaseItem.input}</Text>
            </td>
            <td>
              <Text as="pre">{testCaseItem.output}</Text>
            </td>
          </DeletableTableItem>
        ))}
      </tbody>
    </Table>
  );
}
