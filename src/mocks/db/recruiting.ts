import {
  ProblemStatusCode,
  Recruiting,
  RecruitingSummary,
  RecruitingType,
} from "../../types/apiTypes";

const recruiting: Recruiting[] = [
  {
    id: 0,
    name: "2023 루키 전형",
    type: RecruitingType.ROOKIE,
    is_active: true,
    applied: false,
    from_date: "2023-08-04",
    description: "어쩌고 저쩌고",
    problem_status: [
      {
        id: 1,
        num: 1,
        status: ProblemStatusCode.NOT_SUBMITTED,
      },
      {
        id: 2,
        num: 2,
        status: ProblemStatusCode.NOT_SUBMITTED,
      },
      {
        id: 3,
        num: 3,
        status: ProblemStatusCode.NOT_SUBMITTED,
      },
    ],
  },
  {
    id: 1,
    name: "2023 디자이너 전형",
    type: RecruitingType.DESIGNER,
    is_active: true,
    applied: false,
    from_date: "2023-08-04",
    description: "어쩌고 저쩌고",
    problem_status: [
      {
        id: 4,
        num: 1,
        status: 0,
      },
    ],
  },
];

export const toMockRecruitingItem = (
  recruiting: Recruiting,
): RecruitingSummary => ({
  id: recruiting.id,
  name: recruiting.name,
  type: recruiting.type,
  is_active: recruiting.is_active,
  from_date: recruiting.from_date,
  applicant_count: Math.random() * 100,
  short_description: "짧은 설명",
});
export const getAllMockRecruitings = () => recruiting;
export const getMockRecruiting = (id: number) =>
  recruiting.find((recruiting) => recruiting.id === id);
