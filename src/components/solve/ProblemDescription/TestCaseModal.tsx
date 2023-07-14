import styled from "styled-components";
import TestCaseTable from "./TestCaseTable";
import { TestCase } from "./ProblemDescription";
import {
  BoldText,
  HorizontalLine,
  Table,
  TableItem,
  Text,
} from "./styledComponents";
import { Dispatch, SetStateAction, useState } from "react";

type TestCaseModalProps = {
  setCustomTestCases: Dispatch<SetStateAction<TestCase[]>>;
  onClose: () => void;
  defaultTestCases: TestCase[];
  customTestCases: TestCase[];
};

export default function TestCaseModal({
  setCustomTestCases,
  onClose,
  defaultTestCases,
  customTestCases,
}: TestCaseModalProps) {
  const [inputOutputData, setInputOutputData] = useState<TestCase[]>([]);

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
        />

        {customTestCases.length === 0 && <HorizontalLine margin="20px 0" />}

        {/* add testcase textareas */}
        {inputOutputData.length !== 0 && (
          <Table margin={`${customTestCases.length === 0 ? 0 : "10px 0 0 0"}`}>
            <tbody>
              {inputOutputData.map((data, idx) => (
                <TableItem key={idx}>
                  <BoldText as="th">
                    {defaultTestCases.length + customTestCases.length + idx + 1}
                  </BoldText>
                  <td>
                    <TestCaseInput
                      value={data.input}
                      onChange={(e) => {
                        setInputOutputData(
                          inputOutputData.map((_, i) =>
                            i === idx ? { ..._, input: e.target.value } : _,
                          ),
                        );
                      }}
                      placeholder="입력값을 입력해주세요."
                      spellCheck="false"
                    />
                  </td>
                  <td>
                    <TestCaseInput
                      value={data.output}
                      onChange={(e) => {
                        setInputOutputData(
                          inputOutputData.map((_, i) =>
                            i === idx ? { ..._, output: e.target.value } : _,
                          ),
                        );
                      }}
                      placeholder="출력값을 입력해주세요."
                      spellCheck="false"
                    />
                  </td>
                </TableItem>
              ))}
            </tbody>
          </Table>
        )}

        {/* custom test case는 최대 20개 */}
        {inputOutputData.length <= 20 && (
          <AddTestCaseButton
            onClick={() =>
              setInputOutputData((prev) => [...prev, { input: "", output: "" }])
            }
            marginTop={
              inputOutputData.length !== 0 || customTestCases.length !== 0
            }
          >
            <Text>테스트 케이스 추가하기</Text>
          </AddTestCaseButton>
        )}

        <SubmitButton
          onClick={() => {
            const newData: TestCase[] = inputOutputData.filter(
              (data) => data.input !== "" && data.output != "",
            );
            setCustomTestCases((prev: TestCase[]) => [...prev, ...newData]);
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
  width: 1200px;
  height: 655px;
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
  height: 601px;
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

const AddTestCaseButton = styled.button<{ marginTop: boolean }>`
  padding: 0;
  margin-top: ${(props) => (props.marginTop ? "10px" : 0)};
  width: 100%;
  height: 70px;
  min-height: 70px;
  background: #f6f6f6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #e6e6e6;
  }
`;

const TestCaseInput = styled.textarea`
  width: 100%;
  height: 100%;
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
  cursor: pointer;
  &:active {
    box-shadow: 2px 2px #323232;
    transform: translate(2px, 2px);
  }
  &:hover {
    background: #fff;
  }
`;
