// reviewData.ts

export interface Review {
  title: string;
  content: string;
  member_name: string;
  member_generation: string;
  member_position: string;
  is_active: boolean;
}

export const reviewData: Review[] = [
  {
    title: "만들어낼 수 있다는 자신감",
    content:
      "와플스튜디오에서 가장 인상깊었던 활동은 ... 큰 도움이 된 것 같습니다.",
    member_name: "김연우",
    member_generation: "22.5기",
    member_position: "Frontend",
    is_active: true,
  },
  {
    title: "배움의 가치를 실현하는 공동체",
    content:
      "생각하고 싶은 아이디어가 있다면, 머릿속 시뮬레이션 ... 소중히 기억해요.",
    member_name: "김연우",
    member_generation: "22.5기",
    member_position: "Android",
    is_active: true,
  },
  {
    title: "00을 해서 너무 좋았어요",
    content:
      "어쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구",
    member_name: "김연우",
    member_generation: "22.5기",
    member_position: "Frontend",
    is_active: true,
  },
  {
    title: "00을 해서 너무 좋았어요",
    content:
      "어쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구 저쩌구",
    member_name: "김연우",
    member_generation: "22.5기",
    member_position: "Frontend",
    is_active: true,
  },
  {
    title: "제목1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
    member_name: "인소윤",
    member_generation: "22.5기",
    member_position: "Backend",
    is_active: true,
  },
  {
    title: "제목2",
    content: "내용2",
    member_name: "문재영",
    member_generation: "22.5기",
    member_position: "Frontend",
    is_active: false,
  },
];
