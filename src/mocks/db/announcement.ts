import { Announcement } from "../../types/apiTypes";

const sampleContent = `자기소개서는 500자 이내의 간단한 문항 두 가지로 구성되어 있습니다.
코딩 테스트는 지원 기간 막바지에는 트래픽이 몰려서 사이트가 불안정해질 수 있으니, 
여유를 가지고 미리미리 시간을 내서 푸시는 것을 권장드려요!

-와플스튜디오 운영팀-`;

const announcement: Announcement[] = [
  {
    id: 0,
    title: "내부사정으로 인한 시스템 점검 일정 안내",
    content: sampleContent,
    created_at: "2023-07-27T08:46:22.442Z",
    updated_at: "2023-07-27T08:46:22.442Z",
  },
  {
    id: 0,
    title: "두 번째 공지",
    content: sampleContent,
    created_at: "2023-07-28T08:46:22.442Z",
    updated_at: "2023-07-28T08:46:22.442Z",
  },
];

export const getMockAnnouncements = () => announcement;
