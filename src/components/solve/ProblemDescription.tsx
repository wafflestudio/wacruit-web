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
        출력하는 코드를 작성해 보세요. 정수 a와 b가 주어집니다. 각 수를 입력받아
        입출력 예와 같은 형식으로 출력하는 코드를 작성해 보세요.
      </Text>
      <HorizontalLine $marginTopInPX="25px" $marginBottomInPX="14px" />

      <BoldText>제한사항</BoldText>
      <Text>-100,000 ≤ a, b ≤ 100,000</Text>
      <HorizontalLine $marginTopInPX="17px" $marginBottomInPX="14px" />

      <BoldText>입출력 예시</BoldText>
      <TestCaseTable>
        <TestCaseHeaderTableRow>
          <th>
            <BoldText>#</BoldText>
          </th>
          <th>
            <BoldText>Input</BoldText>
          </th>
          <th>
            <BoldText>Output</BoldText>
          </th>
        </TestCaseHeaderTableRow>
        <TestCaseItemTableRow>
          <th>
            <BoldText>1</BoldText>
          </th>
          <td>
            <Text>4, 5</Text>
          </td>
          <td>
            <Text>
              a=4 <br />
              b=5
            </Text>
          </td>
        </TestCaseItemTableRow>
        <TestCaseItemTableRow>
          <th>
            <BoldText>2</BoldText>
          </th>
          <td>
            <Text>4, 5</Text>
          </td>
          <td>
            <Text>
              a=4 <br />
              b=5
            </Text>
          </td>
        </TestCaseItemTableRow>
        <TestCaseItemTableRow>
          <th>
            <BoldText>3</BoldText>
          </th>
          <td>
            <Text>4, 5</Text>
          </td>
          <td>
            <Text>
              a=4 <br />
              b=5
            </Text>
          </td>
        </TestCaseItemTableRow>
        {/* TODO: 테스트 케이스 추가 과정 디자인 요청 & 작업 */}
      </TestCaseTable>
      <AddTestCaseButton
        onClick={() => {
          alert("add");
        }}
      >
        <img src="/icon/AddTestCase.svg" alt="+" />
        <Text>테스트 케이스 추가하기</Text>
      </AddTestCaseButton>
    </Section>
  );
}

const Section = styled.section`
  border: 4px solid #373737;
  border-radius: 5px;
  padding: 28px 26px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 37px; // border-left 15px, border-right 15px를 뺀 7px가 보이는 두께
  }
  &::-webkit-scrollbar-thumb {
    background: #373737;
    border-radius: 30px;
    border: 15px solid #fff; // 컨텐츠 배경색과 같은 흰색 border를 줌으로써 스크롤바 오른쪽 여백을 구현
    // 스크롤바의 border-radius까지 figma대로 구현하려면 위처럼 상하좌우 전체에 border를 주고 border-radius를 적용시켜야 함.
  }
  // 스크롤바 위아래 여백
  &::-webkit-scrollbar-button:vertical:start:decrement, // 위 여백
  &::-webkit-scrollbar-button:vertical:end:decrement // 아래 여백
  {
    display: block;
    height: 13px; // 위아래 여백을 28px 주어야 하는데, border-top, border-bottom이 15px 있으므로 13px만
  }

  /* Solve page layout */
  flex: 1;

  * {
    margin: 0;
    padding: 0;
    font-family: Pretendard, sans-serif;
    color: #323232;
    list-style-type: none;
    text-decoration: none;
    border-collapse: collapse;
    box-sizing: border-box;
  }

  a {
    text-decoration: inherit;
    color: inherit;
  }
`;

const ProblemTitle = styled.h1`
  font-weight: bold;
  font-size: 40px;
  margin-bottom: 28px;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 160%;
`;

const BoldText = styled(Text)`
  font-weight: bold;
`;

const HorizontalLine = styled.hr<{
  $marginTopInPX?: string;
  $marginBottomInPX?: string;
}>`
  margin-top: ${(props) => props.$marginTopInPX || 0};
  margin-bottom: ${(props) => props.$marginBottomInPX || 0};
  height: 1px;
`;

const TestCaseTable = styled.table`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TestCaseTableRow = styled.tr`
  display: grid;
  grid-template-columns: 2fr 11fr 11fr;
  gap: 10px;
`;
const TestCaseHeaderTableRow = styled(TestCaseTableRow)``;
const TestCaseItemTableRow = styled(TestCaseTableRow)`
  > th,
  td {
    background-color: #f6f6f6;
    padding: 10px 15px;
    border-radius: 5px;
  }
`;

const AddTestCaseButton = styled.button`
  box-sizing: border-box;
  float: right;
  margin-top: 16px;
  padding: 8px;
  width: 216px;
  height: 39px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  background-color: #fff;
  border: 2px solid #373737;
  border-radius: 6px;
  cursor: pointer;

  > img {
    width: 24px;
    height: 24px;
  }

  > p {
    font-weight: 500;
  }
`;
