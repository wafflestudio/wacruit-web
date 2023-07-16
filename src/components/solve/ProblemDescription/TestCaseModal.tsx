import styled from "styled-components";
import TestCaseTable from "./TestCaseTable";
import { TestCase } from "./ProblemDescription";
import { HorizontalLine, Table, Text } from "./styledComponents";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import TestCaseInputs from "./TestCaseInputs";

interface TestCaseModalProps {
  setCustomTestCases: Dispatch<SetStateAction<TestCase[]>>;
  deleteCustomTestCase: (idx: number) => void;
  onClose: () => void;
  defaultTestCases: TestCase[];
  customTestCases: TestCase[];
}

export default function TestCaseModal({
  setCustomTestCases,
  deleteCustomTestCase,
  onClose,
  defaultTestCases,
  customTestCases,
}: TestCaseModalProps) {
  const [newCustomTestCaseInputs, setNewCustomTestCaseInputs] = useState<
    TestCase[]
  >([]);

  const addNewCustomTestCase = useCallback(() => {
    // input & output 모두 빈칸이 아닌 데이터만 추가
    const validData: TestCase[] = newCustomTestCaseInputs.filter(
      (data) => data.input !== "" && data.output != "",
    );
    setCustomTestCases((prev: TestCase[]) => [...prev, ...validData]);
  }, [newCustomTestCaseInputs, setCustomTestCases]);

  /* code start: '테스트 케이스 추가하기' button click 시 scroll event */
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const scrollToBottom = useCallback(
    // submitButton이 가능한 한 화면의 위에 오도록 아래로 scroll
    () => submitButtonRef.current?.scrollIntoView(true),
    [],
  );
  // '테스트 케이스 추가하기' button click => newCustomTestCaseInputs 변경 => scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [newCustomTestCaseInputs, scrollToBottom]);
  /* end */

  return (
    <Article>
      <Nav>
        <CloseButton onClick={onClose}>
          <img src="/icon/CloseModal.svg" alt="X" width="35px" height="35px" />
        </CloseButton>
      </Nav>

      <Main>
        <Title>테스트 케이스</Title>
        <TestCaseTable
          defaultTestCases={defaultTestCases}
          customTestCases={customTestCases}
          deleteCustomTestCase={deleteCustomTestCase}
        />

        {/* 추가된 customTestCases가 없는 경우 위 TestCaseTable component에 hr 구분선이 없다 */}
        {/* 해당 경우에만 따로 구분선 추가 */}
        {customTestCases.length === 0 && <HorizontalLine margin="20px 0" />}

        {/* textareas table*/}
        {newCustomTestCaseInputs.length !== 0 && (
          // 추가된 customeTestCase가 아직 없는 경우만 디자인을 위해 margin-top 적용
          <Table margin={`${customTestCases.length === 0 ? 0 : "10px 0 0 0"}`}>
            <TestCaseInputs
              newCustomTestCaseInputs={newCustomTestCaseInputs}
              startIdx={defaultTestCases.length + customTestCases.length + 1}
              setNewCustomTestCaseInputs={setNewCustomTestCaseInputs}
            />
          </Table>
        )}

        {/* '테스트 케이스 추가' button */}
        {newCustomTestCaseInputs.length <= 20 && ( // custom test case는 최대 20개
          <AddTestCaseButton
            $marginTop={
              newCustomTestCaseInputs.length !== 0 ||
              customTestCases.length !== 0
            }
            onClick={() => {
              // 입력을 저장할 새 index 추가
              setNewCustomTestCaseInputs((prev) => [
                ...prev,
                { input: "", output: "" },
              ]);
            }}
          >
            <Text>테스트 케이스 추가하기</Text>
          </AddTestCaseButton>
        )}

        <SubmitButton
          ref={submitButtonRef}
          onClick={() => {
            addNewCustomTestCase();
            onClose();
          }}
        >
          확인
        </SubmitButton>
      </Main>
    </Article>
  );
}

const Article = styled.article`
  // TODO : 크기 반응형으로
  width: 1200px;
`;

const Nav = styled.nav`
  height: 54px;
  padding: 9.5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 4px solid #373737;
  border-radius: 5px 5px 0 0;
  background-color: #f0745f;
`;

const CloseButton = styled.button`
  width: 35px;
  height: 35px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Main = styled.div`
  // TODO : 크기 반응형으로
  height: 646px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  border: 4px solid #373737;
  border-top: none;
  border-radius: 0 0 5px 5px;
  background-color: #fff;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  margin: 0 0 23px 0;
  font-weight: bold;
  font-size: 40px;
`;

const AddTestCaseButton = styled.button<{ $marginTop: boolean }>`
  padding: 0;
  margin-top: ${(props) => (props.$marginTop ? "10px" : 0)};
  width: 100%;
  height: 70px;
  min-height: 70px;
  background: #f6f6f6;
  border: none;
  border-radius: 5px;
  color: #373737;
  cursor: pointer;
  &:hover {
    background: #e6e6e6;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  font-weight: 600;
  width: 80px;
  padding: 9px 20px;
  margin-top: 40px;
  border: 4px solid #373737;
  border-radius: 5px;
  box-shadow: 4px 4px #323232;
  font-size: 18px;
  line-height: 160%;
  letter-spacing: 5%;
  background: #f0745f;
  color: #323232;
  cursor: pointer;
  &:active {
    box-shadow: 2px 2px #323232;
    transform: translate(2px, 2px);
  }
  &:hover {
    background: #fff;
  }
`;
