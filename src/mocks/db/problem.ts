import { Problem } from "../../types/apiTypes";

const bodySample = (num: number) => `
  # 문제 ${num}
  정수 a와 b가 주어집니다. 
  각 수를 입력받아 입출력 예와 같은 형식으로 출력하는 코드를 작성해 보세요. 
  - 정수 a와 b가 주어집니다. 
  - 각 수를 입력받아 입출력 예와 같은 형식으로 출력하는 코드를 작성해 보세요.`;

const problem: (Problem & { id: number })[] = [
  {
    id: 0,
    num: 1,
    body: bodySample(1),
    testcases: [
      {
        expected_output: "이게 들어간다",
        stdin: "이게 나온다",
      },
    ],
  },
  {
    id: 1,
    num: 2,
    body: bodySample(2),
    testcases: [
      {
        expected_output: "이게 들어간다",
        stdin: "이게 나온다",
      },
    ],
  },
  {
    id: 2,
    num: 3,
    body: bodySample(3),
    testcases: [
      {
        expected_output: "이게 들어간다",
        stdin: "이게 나온다",
      },
    ],
  },
];

export const getMockProblem = (id: number) =>
  problem.find((problem) => problem.id === id);
