import styled from "styled-components";

interface Props {
  problemNumber: number;
}

export default function ProblemDescription(props: Props) {
  return (
    // TODO: 데이터 api 연결
    <Section>
      <ProblemTitle>문제 {props.problemNumber}</ProblemTitle>
      <Text>
        정수 a와 b가 주어집니다. 각 수를 입력받아 입출력 예와 같은 형식으로
        출력하는 코드를 작성해 보세요.
      </Text>
      <HorizontalLine $marginTopInPX="30px" />

      <Text $heading>제한사항</Text>
      <Text>-100,000 ≤ a, b ≤ 100,000</Text>
      <HorizontalLine $marginTopInPX="20px" />

      <Text $heading>입출력 예시</Text>
      <TestCaseList>
        <ListHeader>
          <div></div>
          <Text $heading>Input</Text>
          <Text $heading>Output</Text>
        </ListHeader>
        {/* TODO: map 함수로 array => ListItem */}
        <ListItem>
          <Text $heading>#1</Text>
          <Text>4, 5</Text>
          <Text>
            a=4 <br /> b=5
          </Text>
        </ListItem>
        <ListItem>
          <Text $heading>#2</Text>
          <Text>4, 5</Text>
          <Text>
            a=4 <br /> b=5
          </Text>
        </ListItem>
        <ListItem>
          <Text $heading>#3</Text>
          <Text>4, 5</Text>
          <Text>
            a=4 <br /> b=5
          </Text>
        </ListItem>
        {/* TODO: 테스트 케이스 추가 과정 디자인 요청 & 작업 */}
        <AddTestCaseButton
          onClick={() => {
            alert("add");
          }}
        >
          <img src="/icon/AddTestCase.svg" alt="+" />
          <Text>테스트 케이스 추가하기</Text>
        </AddTestCaseButton>
      </TestCaseList>
    </Section>
  );
}

const Section = styled.section`
  border: 4px solid #373737;
  border-radius: 5px;
  padding: 28px 26px;
  overflow-y: auto;
  /* TODO: 스크롤바 디자인 */
  /* &::-webkit-scrollbar {
    display: none;
  } */

  /* Solve page layout */
  flex: 1;

  * {
    margin: 0;
    padding: 0;
    font-family: Inter;
    color: #323232;
    list-style-type: none;
    text-decoration: none;
    border-collapse: collapse;
    box-sizing: border-box;
    letter-spacing: -0.5px;
  }
  a {
    text-decoration: inherit;
    color: inherit;
  }
`;

const ProblemTitle = styled.h1`
  font-weight: 600;
  font-size: 47px;
  margin-bottom: 33px;
`;

const Text = styled.p<{ $heading?: boolean }>`
  font-weight: ${(props) => (props.$heading ? 600 : 500)};
  font-size: 21px;
  line-height: 160%;
`;

const HorizontalLine = styled.hr<{ $marginTopInPX?: string }>`
  margin-top: ${(props) => props.$marginTopInPX || 0};
  margin-bottom: 17px;
`;

const TestCaseList = styled.ol`
  p {
    text-align: center;
  }
  margin-top: 13px;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const ListHeader = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 1fr;
  padding: 0 19px;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 24px 1fr 1fr;
  padding: 7px 19px;
  background-color: #f6f6f6;
  border-radius: 6px;
`;

const AddTestCaseButton = styled.button`
  align-self: flex-end;
  width: 275px;
  height: 46px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  background-color: #fff;
  border: 2px solid #373737;
  border-radius: 6px;
  cursor: pointer;
`;
