import styled from "styled-components";
import TestCaseTable from "./TestCaseTable";
import { HorizontalLine, Table, TestCase, Text } from "./common";
import { useCallback, useEffect, useRef, useState } from "react";
import TestCaseInputs from "./TestCaseInputs";

interface TestCaseModalProps {
  addNewCustomTestCase: (newInputs: TestCase[]) => void;
  deleteCustomTestCase: (idx: number) => void;
  onClose: () => void;
  defaultTestCases: TestCase[];
  customTestCases: TestCase[];
}

export default function TestCaseModal({
  addNewCustomTestCase,
  deleteCustomTestCase,
  onClose,
  defaultTestCases,
  customTestCases,
}: TestCaseModalProps) {
  const [newCustomTestCaseInputs, setNewCustomTestCaseInputs] = useState<
    TestCase[]
  >([]);

  /* code start: '테스트 케이스 추가하기' 버튼 클릭시 스크롤도 가장 아래로 내려준다 */
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const scrollToBottom = useCallback(
    // submitButton이 가능한 한 화면의 위에 오도록 아래로 스크롤
    () => submitButtonRef.current?.scrollIntoView(true),
    [],
  );
  // '테스트 케이스 추가하기' 버튼 클릭 => newCustomTestCaseInputs 변경 => 스크롤
  useEffect(() => {
    scrollToBottom();
  }, [newCustomTestCaseInputs, scrollToBottom]);
  /* end */

  return (
    <Article>
      <Nav>
        <CloseButton onClick={onClose}>
          <img
            src="/icon/CloseModal.svg"
            alt="X"
            width="3.5rem"
            height="3.5rem"
          />
        </CloseButton>
      </Nav>

      <Main>
        <Title>테스트 케이스</Title>
        <TestCaseTable
          defaultTestCases={defaultTestCases}
          customTestCases={customTestCases}
          deleteCustomTestCase={deleteCustomTestCase}
        />

        {/* 추가된 customTestCases가 없는 경우 위 TestCaseTable 컴포넌트에 hr 구분선이 없다 */}
        {/* 해당 경우에만 따로 구분선 추가 */}
        {customTestCases.length === 0 && <HorizontalLine margin="2.0rem 0" />}

        {/* textareas table*/}
        {newCustomTestCaseInputs.length !== 0 && (
          // 추가된 customeTestCase가 아직 없는 경우만 디자인을 위해 margin-top 적용
          <Table
            margin={`${customTestCases.length === 0 ? 0 : "1.0rem 0 0 0"}`}
          >
            <TestCaseInputs
              newCustomTestCaseInputs={newCustomTestCaseInputs}
              startIdx={defaultTestCases.length + customTestCases.length + 1}
              setNewCustomTestCaseInputs={setNewCustomTestCaseInputs}
            />
          </Table>
        )}

        {/* '테스트 케이스 추가' 버튼 */}
        {customTestCases.length + newCustomTestCaseInputs.length < 20 && ( // custom test case는 최대 20개
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
            addNewCustomTestCase(newCustomTestCaseInputs);
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
  width: 70vw;
  height: 70vh;
`;

const Nav = styled.nav`
  height: 5.4rem;
  padding: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border: 0.4rem solid #373737;
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: #f0745f;
`;

const CloseButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  border: 0.4rem solid #373737;
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: #fff;

  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.h1`
  margin: 0 0 2.3rem 0;
  font-weight: bold;
  font-size: 4rem;
`;

const AddTestCaseButton = styled.button<{ $marginTop: boolean }>`
  padding: 0;
  margin-top: ${(props) => (props.$marginTop ? "1.0rem" : 0)};
  width: 100%;
  height: 7rem;
  min-height: 7rem;
  background: #f6f6f6;
  border: none;
  border-radius: 0.5rem;
  color: #373737;
  cursor: pointer;
  &:hover {
    background: #e6e6e6;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  font-weight: 600;
  width: 8rem;
  padding: 0.9rem 2rem;
  margin-top: 4rem;
  border: 0.4rem solid #373737;
  border-radius: 0.5rem;
  box-shadow: 0.4rem 0.4rem #323232;
  font-size: 1.8rem;
  line-height: 160%;
  letter-spacing: 5%;
  background: #f0745f;
  color: #323232;
  cursor: pointer;
  &:active {
    box-shadow: 0.2rem 0.2rem #323232;
    transform: translate(0.2rem, 0.2rem);
  }
  &:hover {
    background: #fff;
  }
`;
