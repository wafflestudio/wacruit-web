import { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { TestCase } from "./ProblemDescription";
import { BoldText, TableItem } from "./styledComponents";
import { styled } from "styled-components";

type TestCaseInputProps = {
  data: string;
  onTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TestCaseInput({ data, onTextareaChange }: TestCaseInputProps) {
  /* code start: textarea 내용 길이에 따라 자동높이조절 */
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 높이 줄이기 위해 필요
      textarea.style.height = `${textarea.scrollHeight}px`; // 높이 늘리기 위해 필요
    }
  }, []);
  /* end */

  return (
    <td>
      <TestCaseInputTextarea
        ref={textareaRef}
        onChange={(e) => {
          onTextareaChange(e);
          handleResizeHeight();
        }}
        rows={1}
        value={data}
        placeholder="입력값을 입력해주세요."
        spellCheck="false"
      />
    </td>
  );
}

const TestCaseInputTextarea = styled.textarea`
  padding: 0;
  width: 100%;
  background: transparent;
  border: none;
  font-size: 18px;
  line-height: 160%;
  resize: none;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  &::placeholder {
    color: #a1a1a1;
  }

  &:focus {
    outline: none;
    background: #e6e6e6;
    text-decoration-line: none;
    &::placeholder {
      color: transparent;
    }
  }
`;

type TestCaseInputsProps = {
  newCustomTestCaseInputs: TestCase[];
  startIdx: number;
  setNewCustomTestCaseInputs: Dispatch<SetStateAction<TestCase[]>>;
};

export default function TestCaseInputs({
  newCustomTestCaseInputs,
  startIdx,
  setNewCustomTestCaseInputs,
}: TestCaseInputsProps) {
  const inputDataTypes = ["input", "output"] as const;

  return (
    <tbody>
      {newCustomTestCaseInputs.map((newCustomTestCaseInput, idx) => (
        <TableItem key={idx}>
          <BoldText as="th">{startIdx + idx}</BoldText>
          {inputDataTypes.map((dataType) => (
            <TestCaseInput
              key={dataType}
              data={newCustomTestCaseInput[dataType]}
              onTextareaChange={(e) => {
                setNewCustomTestCaseInputs(
                  // 바뀐 부분의 dataType prop만 수정
                  newCustomTestCaseInputs.map((_, i) => {
                    return i === idx ? { ..._, [dataType]: e.target.value } : _;
                  }),
                );
              }}
            />
          ))}
        </TableItem>
      ))}
    </tbody>
  );
}