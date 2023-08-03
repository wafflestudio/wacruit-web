import { Recruiting, RecruitingSummary } from "../../types/apiTypes";

const recruiting: Recruiting[] = [
  {
    id: 0,
    name: "2023 루키 전형",
    is_active: true,
    from_date: "2023-08-04",
    description: "어쩌고 저쩌고",
    problem_status: [
      {
        id: 1,
        num: 1,
        status: 0,
      },
      {
        id: 2,
        num: 2,
        status: 0,
      },
      {
        id: 3,
        num: 3,
        status: 0,
      },
    ],
  },
  {
    id: 1,
    name: "2023 디자이너 전형",
    is_active: true,
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
  is_active: recruiting.is_active,
  from_date: recruiting.from_date,
  applicant_count: Math.random() * 100,
});
export const getAllMockRecruitings = () => recruiting;
export const getMockRecruiting = (id: number) =>
  recruiting.find((recruiting) => recruiting.id === id);
