import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
} from "react";
import { DeletableTableItem, TestCase } from "./common";
import { styled } from "styled-components";
import { Union } from "../../../types/commonTypes";

const inputDataTypes = ["input", "output"] as const;
type InputDataType = Union<typeof inputDataTypes>;

interface TestCaseInputsProps {
  newCustomTestCaseInputs: TestCase[];
  startIdx: number;
  setNewCustomTestCaseInputs: Dispatch<SetStateAction<TestCase[]>>;
}

export default function TestCaseInputs({
  newCustomTestCaseInputs,
  startIdx,
  setNewCustomTestCaseInputs,
}: TestCaseInputsProps) {
  const deleteNewCustomTestCaseInput = useCallback(
    (deleteIdx: number) =>
      setNewCustomTestCaseInputs((prev) =>
        prev.filter((_, idx) => deleteIdx !== idx),
      ),
    [setNewCustomTestCaseInputs],
  );

  return (
    <tbody>
      {newCustomTestCaseInputs.map((newCustomTestCaseInput, idx) => (
        <DeletableTableItem
          key={idx}
          index={startIdx + idx}
          deleteItem={() => deleteNewCustomTestCaseInput(idx)}
        >
          {inputDataTypes.map((dataType) => (
            <TestCaseInput
              key={dataType}
              data={newCustomTestCaseInput[dataType]}
              dataType={dataType}
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
        </DeletableTableItem>
      ))}
    </tbody>
  );
}

interface TestCaseInputProps {
  data: string;
  dataType: InputDataType;
  onTextareaChange: ChangeEventHandler<HTMLTextAreaElement>;
}

function TestCaseInput({
  data,
  dataType,
  onTextareaChange,
}: TestCaseInputProps) {
  /* code start: textarea 내용 길이에 따라 자동높이조절 */
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 내용이 줄어들었을 때 높이 줄이기 위해 필요
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용이 넘칠 때 높이 늘리기 위해 필요
    }
  }, []);
  /* end */

  // td를 클릭해도 내부 textarea를 focus해준다
  const onTdClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <td onClick={onTdClick} style={{ cursor: "text" }}>
      <TestCaseInputTextarea
        ref={textareaRef}
        onChange={(e) => {
          onTextareaChange(e);
          handleResizeHeight();
        }}
        rows={1}
        value={data}
        placeholder={`${
          dataType === "input" ? "입력" : "출력"
        }값을 입력해주세요.`}
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
  font-size: 1.8rem;
  line-height: 160%;
  resize: none;

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
