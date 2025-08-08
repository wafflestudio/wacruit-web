// memberData.ts

export interface Member {
  id: number;
  member_name: string;
  is_active: boolean;
  member_generation: string;
  member_position: string;
}

export const members: Member[] = [
  {
    id: 1,
    member_name: "김연우",
    is_active: true,
    member_generation: "22.5기",
    member_position: "Frontend",
  },
  {
    id: 2,
    member_name: "김연우",
    is_active: true,
    member_generation: "18.5기",
    member_position: "Android",
  },
  {
    id: 3,
    member_name: "김연우",
    is_active: true,
    member_generation: "18.5기",
    member_position: "Backend",
  },
  {
    id: 4,
    member_name: "김연우",
    is_active: true,
    member_generation: "21.5기",
    member_position: "Backend",
  },
  {
    id: 5,
    member_name: "김연우",
    is_active: true,
    member_generation: "20.5기",
    member_position: "Frontend",
  },
  {
    id: 6,
    member_name: "김연우",
    is_active: false,
    member_generation: "22.5기",
    member_position: "Frontend",
  },
  {
    id: 7,
    member_name: "이연우",
    is_active: false,
    member_generation: "22.5기",
    member_position: "Frontend",
  },
  {
    id: 8,
    member_name: "이연우",
    is_active: true,
    member_generation: "21.5기",
    member_position: "Backend",
  },
  {
    id: 9,
    member_name: "김연우",
    is_active: true,
    member_generation: "22.5기",
    member_position: "운영팀",
  },
];
