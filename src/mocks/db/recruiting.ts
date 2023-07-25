import { Recruiting } from "../../types/apiTypes";

const recruiting: Recruiting[] = [
  {
    id: 0,
    name: "2023 루키 전형",
    is_active: true,
    from_date: "2023-08-04",
    description: "어쩌고 저쩌고",
    problems: [
      {
        id: 0,
        num: 1,
        status: "미제출",
      },
      {
        id: 1,
        num: 2,
        status: "미제출",
      },
      {
        id: 2,
        num: 3,
        status: "미제출",
      },
    ],
  },
  {
    id: 1,
    name: "2023 디자이너 전ㅇ",
    is_active: true,
    from_date: "2023-08-04",
    description: "어쩌고 저쩌고",
    problems: [
      {
        id: 0,
        num: 1,
        status: "미제출",
      },
    ],
  },
];

export const toMockRecruitingItem = (recruiting: Recruiting) => ({
  id: recruiting.id,
  name: recruiting.name,
  is_active: recruiting.is_active,
  from_date: recruiting.from_date,
  applicant_count: Math.random() * 100,
});
export const getAllMockRecruitings = () => recruiting;
export const getMockRecruiting = (id: number) =>
  recruiting.find((recruiting) => recruiting.id === id);
