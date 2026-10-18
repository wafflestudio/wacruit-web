import type { StatusTagVariant } from "../../../shared/ui/tag/Tag";

type CardAsset = {
  variant: StatusTagVariant;
  label: string;
};
type ProgressCardAsset = CardAsset & {
  theme: "red" | "green" | "yellow" | "gray";
  description: string;
};

//resume
const resumeSubmit: CardAsset = {
  variant: "saved",
  label: "저장 완료",
};
const resumeNotSubmit: CardAsset = {
  variant: "todo",
  label: "작성 전",
};

//portfolio
const portfolioSubmit: CardAsset = {
  variant: "saved",
  label: "제출 완료",
};
const portfolioNotSubmit: CardAsset = {
  variant: "todo",
  label: "미제출",
};

//problem (default)
const problemSubmitCorrect: ProgressCardAsset = {
  theme: "green",
  variant: "done",
  label: "정답",
  description: "정답입니다!",
};
const problemJudging: ProgressCardAsset = {
  theme: "yellow",
  variant: "judging",
  label: "채점 중",
  description: "채점 중입니다...",
};
const problemSubmitWrong: ProgressCardAsset = {
  theme: "red",
  variant: "wrong",
  label: "오답",
  description: "오답입니다!",
};
const problemNotSubmit: ProgressCardAsset = {
  theme: "gray",
  variant: "todo",
  label: "미제출",
  description: "미제출",
};

const progressCardAsset = {
  resumeSubmit,
  resumeNotSubmit,
  portfolioSubmit,
  portfolioNotSubmit,
  problemSubmitCorrect,
  problemSubmitWrong,
  problemNotSubmit,
  problemJudging,
};

export default progressCardAsset;
