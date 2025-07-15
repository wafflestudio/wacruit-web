export type ProjectType = "SERVICE" | "STUDY";

export interface ProjectData {
  id: number;
  name: string;
  summary: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
}

export const projectData: ProjectData[] = [
  {
    id: 1,
    name: "SNUTT",
    summary: "서울대학교 학생들을 위한 시간표 작성 어플, SNUTT입니다.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 2,
    name: "식샤",
    summary: "한줄 소개",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 3,
    name: "커넥트",
    summary: "학생들 간의 스터디 매칭을 도와주는 서비스",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 4,
    name: "와플노트",
    summary: "강의 노트를 공유하고 관리할 수 있는 플랫폼",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "SERVICE",
    is_active: false,
  },
  {
    id: 5,
    name: "SNUCLOUD",
    summary: "서울대 전용 클라우드 저장소 서비스",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 6,
    name: "타임체커",
    summary: "출결 자동 확인 및 관리 앱",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "SERVICE",
    is_active: false,
  },
  {
    id: 7,
    name: "스누링크",
    summary: "서울대 커뮤니티와 정보를 연결해주는 앱",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 8,
    name: "이벤트허브",
    summary: "학교 내 행사와 모임을 홍보하는 플랫폼",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "SERVICE",
    is_active: false,
  },
  {
    id: 9,
    name: "노티봇",
    summary: "알림을 자동으로 보내주는 서비스",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 10,
    name: "라이브채널",
    summary: "강의 생중계를 위한 플랫폼",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "SERVICE",
    is_active: false,
  },
  {
    id: 11,
    name: "SNU서베이",
    summary: "간편하게 설문을 만들고 응답받는 도구",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 12,
    name: "캘린더플랜",
    summary: "학사 일정과 개인 일정을 통합 관리",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "SERVICE",
    is_active: true,
  },
  {
    id: 13,
    name: "투표마당",
    summary: "학생 사회 참여를 위한 투표 시스템",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "SERVICE",
    is_active: false,
  },
  {
    id: 14,
    name: "Lorem Ipsum Study 1",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "STUDY",
    is_active: false,
  },
  {
    id: 15,
    name: "Lorem Ipsum Study 2",
    summary:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "STUDY",
    is_active: true,
  },
  {
    id: 16,
    name: "Lorem Ipsum Study 3",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "STUDY",
    is_active: true,
  },
  {
    id: 17,
    name: "Lorem Ipsum Study 4",
    summary: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "STUDY",
    is_active: false,
  },
  {
    id: 18,
    name: "Lorem Ipsum Study 5",
    summary: "Cillum dolore eu fugiat nulla pariatur.",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "STUDY",
    is_active: true,
  },
  {
    id: 19,
    name: "Lorem Ipsum Study 6",
    summary: "Excepteur sint occaecat cupidatat non proident.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "STUDY",
    is_active: false,
  },
  {
    id: 20,
    name: "Lorem Ipsum Study 7",
    summary: "Sunt in culpa qui officia deserunt mollit anim id est laborum.",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "STUDY",
    is_active: true,
  },
  {
    id: 21,
    name: "Lorem Ipsum Study 8",
    summary: "Velit esse cillum dolore eu fugiat nulla pariatur.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "STUDY",
    is_active: false,
  },
  {
    id: 22,
    name: "Lorem Ipsum Study 9",
    summary: "Enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "STUDY",
    is_active: true,
  },
  {
    id: 23,
    name: "Lorem Ipsum Study 10",
    summary: "Tempor incididunt ut labore et dolore magna aliqua.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "STUDY",
    is_active: true,
  },
  {
    id: 24,
    name: "Lorem Ipsum Study 11",
    summary: "Laboris nisi ut aliquip ex ea commodo consequat.",
    thumbnail_url: "https://picsum.photos/400",
    project_type: "STUDY",
    is_active: false,
  },
  {
    id: 25,
    name: "Lorem Ipsum Study 12",
    summary: "Ut enim ad minim veniam.",
    thumbnail_url: "https://picsum.photos/200",
    project_type: "STUDY",
    is_active: true,
  },
];

export type UrlType =
  | "Android"
  | "iOS"
  | "Web"
  | "Github: Android"
  | "Github: iOS"
  | "Github: Web";

export type UrlItem = {
  title: UrlType;
  url: string;
};

export interface Project {
  id: number;
  name: string;
  summary: string;
  introduction: string;
  thumbnail_url: string;
  project_type: ProjectType;
  is_active: boolean;
  images: string[];
  urls: UrlItem[];
}

export const projectDetail: Project = {
  id: 1,
  name: "SNUTT",
  summary: "서울대학교 학생들을 위한 시간표 작성 어플, SNUTT입니다.",
  introduction:
    "서울대학교 학생을 위한 시간표 서비스, SNUTT입니다.정규학기부터 계절학기까지, 수강편람 정보를 이용해 시간표를 만들 수 있습니다. 태그 검색이나 줄임말 검색 등, 원하는 강의를 쉽게 찾을 수 있도록 SNUTT만의 다양한 검색 옵션을 제공하고 있습니다. 어떤 강의를 들을지 고민되시나요? 서울대학교 학생 인증을 통해 재학생이 작성한 강의평을 확인할 수 있습니다. 학교 수업뿐만 아니라 과외나 동아리 활동 등의 개인 일정도 자유롭게 넣어 나만의 일정표를 만들 수 있습니다. 커스텀 테마 기능으로 원하는 색상을 조합하거나, 테마 마켓에서 다른 사용자들이 만든 테마를 다운받아 시간표를 자유롭게 꾸며보세요!",
  thumbnail_url: "https://snutt.wafflestudio.com/logo.png",
  project_type: "SERVICE",
  is_active: true,
  images: [
    "https://picsum.photos/200",
    "https://picsum.photos/400",
    "https://picsum.photos/300",
  ],
  urls: [
    {
      title: "Web",
      url: "https://picsum.photos/200",
    },
    {
      title: "iOS",
      url: "https://picsum.photos/200",
    },
    {
      title: "Github: Web",
      url: "https://picsum.photos/200",
    },
    {
      title: "Android",
      url: "https://picsum.photos/200",
    },
    {
      title: "Github: Android",
      url: "https://picsum.photos/200",
    },
  ],
};
