type CardAsset = {
  iconSrc: string;
  iconAlt: string;
  description: string;
};
type ProgressCardAsset = CardAsset & {
  theme: "red" | "green" | "yellow" | "gray";
};

//resume
const resumeSubmit: CardAsset = {
  iconSrc: "/icon/rookie/Check.svg",
  iconAlt: "제출 완료 아이콘",
  description: "제출 완료",
};
const resumeNotSubmit: CardAsset = {
  iconSrc: "/icon/rookie/Pencil.svg",
  iconAlt: "미제출 아이콘",
  description: "미제출",
};

//portfolio
const portfolioSubmit: Omit<ProgressCardAsset, "theme"> = {
  iconSrc: "/icon/rookie/Check.svg",
  iconAlt: "포트폴리오 제출 아이콘",
  description: "제출 완료",
};
const portfolioNotSubmit: Omit<ProgressCardAsset, "theme"> = {
  iconSrc: "/icon/rookie/Portfolio.svg",
  iconAlt: "포트폴리오 미제출 아이콘",
  description: "미제출",
};

//problem (default)
const problemSubmitCorrect: ProgressCardAsset = {
  theme: "green",
  iconSrc: "/icon/rookie/Check.svg",
  iconAlt: "정답 아이콘",
  description: "정답입니다!",
};
const problemJudging: ProgressCardAsset = {
  theme: "yellow",
  iconSrc: "/icon/rookie/Dots.svg",
  iconAlt: "채점 중 아이콘",
  description: "채점 중입니다...",
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
  portfolioSubmit,
  portfolioNotSubmit,
  problemSubmitCorrect,
  problemSubmitNotCorrect,
  problemNotSubmit,
  problemJudging,
};

export default progressCardAsset;
