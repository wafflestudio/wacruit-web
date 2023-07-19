type ProgressCardAsset = {
  theme: "red" | "green" | "gray" | "resumeRed" | "resumeGreen";
  iconSrc: string;
  iconAlt: string;
  description: string;
};

//resume
const resumeSubmit: ProgressCardAsset = {
  theme: "resumeGreen",
  iconSrc: "/icon/rookie/Check.svg",
  iconAlt: "제출 완료 아이콘",
  description: "제출 완료",
};
const resumeNotSubmit: ProgressCardAsset = {
  theme: "resumeRed",
  iconSrc: "/icon/rookie/Pencil.svg",
  iconAlt: "미제출 아이콘",
  description: "미제출",
};

/**
 * @Todo 포트폴리오 어셋 추가하기
 */
//portfolio

//problem (default)
const problemSubmitCorrect: ProgressCardAsset = {
  theme: "green",
  iconSrc: "/icon/rookie/Check.svg",
  iconAlt: "정답 아이콘",
  description: "정답입니다!",
};
const problemSubmitNotCorrect: ProgressCardAsset = {
  theme: "red",
  iconSrc: "/icon/rookie/X.svg",
  iconAlt: "오답 아이콘",
  description: "오답입니다!",
};
const problemNotSubmit: ProgressCardAsset = {
  theme: "gray",
  iconSrc: "/icon/rookie/Code.svg",
  iconAlt: "풀지 않은 문제 아이콘",
  description: "미제출",
};

const progressCardAsset = {
  resumeSubmit,
  resumeNotSubmit,
  problemSubmitCorrect,
  problemSubmitNotCorrect,
  problemNotSubmit,
};
export default progressCardAsset;
