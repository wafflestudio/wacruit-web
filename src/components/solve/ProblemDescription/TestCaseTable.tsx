import { styled } from "styled-components";
import {
  BoldText,
  HorizontalLine,
  Table,
  TableHeader,
  TableItem,
  TestCase,
  Text,
} from "./common";
import { ReactNode, useState } from "react";

interface DeletableTableItemProps {
  index: number;
  deleteItem: () => void;
  children: ReactNode;
}

function DeletableTableItem({
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
      <Th>
        {isHover ? (
          <button onClick={deleteItem}>삭제</button>
        ) : (
          <BoldText>{index}</BoldText>
        )}
      </Th>
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
`;

const Th = styled.th`
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
    padding: 13.5px 17.5px;
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
