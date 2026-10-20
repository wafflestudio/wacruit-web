import asset from "./progressCardAsset";
import { TaskCard } from "./TaskCard";

type ResumeCardProps = {
  submit: boolean;
};

export function ResumeCard({ submit }: ResumeCardProps) {
  const { variant, label } = submit
    ? asset.resumeSubmit
    : asset.resumeNotSubmit;

  return (
    <TaskCard
      title="자기소개서"
      to="./resume"
      variant={variant}
      label={label}
    />
  );
}
