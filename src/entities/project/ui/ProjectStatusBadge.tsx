import type { ProjectType } from "../model/types";

export const ProjectStatusBadge = ({
  isActive,
  projectType,
}: {
  isActive: boolean;
  projectType: ProjectType;
}) => {
  if (!isActive) return null;

  const label = projectType === "PROJECT" ? "서비스 중" : "활동 중";

  return <span>{label}</span>;
};
