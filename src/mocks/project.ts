export interface Project {
  name: string;
  brief_introduction: string;
  thumbnail_url: string;
  is_service: boolean;
}

export const projectData: Project[] = [
  {
    name: "SNUTT",
    brief_introduction:
      "서울대학교 학생들을 위한 시간표 작성 어플, SNUTT입니다.",
    thumbnail_url:
      "https://fastly.picsum.photos/id/326/200/200.jpg?hmac=T_9V3kc7xrK46bj8WndwDhPuvpbjnAM3wfL_I7Gu6yA",
    is_service: true,
  },
  {
    name: "식샤",
    brief_introduction: "맛있는 학식 클락! 학식 알리미 식샤를 만나보세요.",
    thumbnail_url:
      "https://fastly.picsum.photos/id/885/200/300.jpg?hmac=rJMpl1QK1HPl8QUcWolubwQ6u_kjZaaZBL4V4biI81I",
    is_service: true,
  },
  {
    name: "CSEreal",
    brief_introduction: "컴퓨터공학부 대표 홈페이지를 개선합니다.",
    thumbnail_url:
      "https://fastly.picsum.photos/id/600/200/300.jpg?hmac=Ub3Deb_eQNe0Un7OyE33D79dnextn3M179L0nRkv1eg",
    is_service: true,
  },
  {
    name: "와플닷컴",
    brief_introduction:
      "와플스튜디오의 대표 홈페이지 및 리크루팅 지원 페이지를 개선합니다.",
    thumbnail_url: "https://picsum.photos/100",
    is_service: true,
  },
  {
    name: "Memo with Tags",
    brief_introduction: "매일 쌓이는 메모, 태그로 한눈에 보기좋게 정리하기.",
    thumbnail_url: "https://picsum.photos/200",
    is_service: false,
  },
  {
    name: "인턴하샤",
    brief_introduction:
      "이번 인턴, 5분만에 구하세요: 서울대학교–스타트업 매칭 서비스.",
    thumbnail_url: "https://picsum.photos/300",
    is_service: false,
  },
];
