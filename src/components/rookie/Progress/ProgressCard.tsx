import asset from "./progressCardAsset";
import { ProblemStatusCode } from "../../../apis/recruiting/recruiting.types";
import { TaskCard } from "./TaskCard";

type ProgressCardProps = {
  title: string;
  statusCode: number;
  to: string;
};

const statusAsset = (statusCode: number) => {
  switch (statusCode) {
    case ProblemStatusCode.JUDGING:
      return asset.problemJudging;
    case ProblemStatusCode.CORRECT:
      return asset.problemSubmitCorrect;
    case ProblemStatusCode.WRONG:
      return asset.problemSubmitWrong;
    default:
      return asset.problemNotSubmit;
  }
};

export function ProgressCard({ title, statusCode, to }: ProgressCardProps) {
  const { variant, label } = statusAsset(statusCode);

  return <TaskCard title={title} to={to} variant={variant} label={label} />;
}
