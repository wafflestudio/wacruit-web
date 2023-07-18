import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import ProblemDescription from "../components/solve/ProblemDescription/ProblemDescription.tsx";
import CodeEditor from "../components/solve/CodeEditor.tsx";
import TestResultConsole from "../components/solve/TestResultConsole.tsx";
import DragResizable from "../components/solve/DragResizable.tsx";
import { useState } from "react";

function safeNum(_n: string | undefined) {
  const n = Number(_n);
  return Number.isSafeInteger(n) ? n : null;
}

export default function Solve() {
  const params = useParams();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const problemNumber = safeNum(params.problem_number);
  const handleRunTest = () => {
    alert("테스트 실행");
  };
  const handleSubmit = () => {
    alert("제출하기");
  };

  if (problemNumber === null) {
    return <main>invalid problem number</main>;
  }

  return (
    <Container>
      <Main>
        <TopNav>
          <Link to={"/"}>
            <img src="/icon/LeftArrow.svg" alt="&larr;" width={31} />
            Back
          </Link>
        </TopNav>
        <Row $collapseLeft={isFullScreen}>
          <Col>
            <ProblemDescription problemNumber={problemNumber} />
          </Col>
          <Col>
            <Col>
              <CodeEditor
                isFullScreen={isFullScreen}
                setIsFullScreen={setIsFullScreen}
              />
              <DragResizable initialHeight={300}>
                <TestResultConsole />
              </DragResizable>
            </Col>
            <BottomNav>
              <SubmitButton onClick={handleRunTest}>테스트 실행</SubmitButton>
              <SubmitButton onClick={handleSubmit} $primary>
                제출하기
              </SubmitButton>
            </BottomNav>
          </Col>
        </Row>
      </Main>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  background: #fff7e9;
`;
const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  overflow: hidden;
  border: 4px solid #373737;
  box-shadow: 10px 10px #373737;
  border-radius: 5px;
  background: white;
`;
const TopNav = styled.nav`
  display: flex;
  align-items: center;
  padding: 14px;
  background: #f0745f;
  border-bottom: 4px solid #373737;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold;
    font-size: 16px;
    color: #000000;
    text-decoration: none;
  }
`;
const Row = styled.div<{ $collapseLeft?: boolean }>`
  display: flex;
  flex: 1;
  gap: ${(props) => (props.$collapseLeft ? "0" : "16px")};
  padding: 0 16px 16px;
  min-height: 0;
  & > :first-child {
    ${(props) =>
      props.$collapseLeft &&
      `
      flex: 0;
      opacity: 0;`}
    transition: ease 0.3s;
  }
`;
const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
`;
const BottomNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px 0 0;
`;
const SubmitButton = styled.button<{ $primary?: boolean }>`
  padding: 9px 20px;
  border: 4px solid #373737;
  border-radius: 5px;
  box-shadow: 4px 4px #323232;
  font-size: 18px;
  background: ${(props) => (props.$primary ? "#f0745f" : "#ededed")};
  cursor: pointer;
  &:active {
    box-shadow: 2px 2px #323232;
    transform: translate(2px, 2px);
  }
`;
