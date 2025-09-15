import styled from "styled-components";
import { ProjectType } from "../../features/project";

const Class = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8rem; /* 80px */
`;

const ClassButton = styled.button<{ $active: boolean }>`
  cursor: pointer;
  text-decoration: ${({ $active }) => ($active ? "underline" : "none")};
  text-underline-offset: 0.4rem;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black[900] : theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.018rem;

  @media (max-width: 767px) {
    font-size: ${({ theme }) => theme.fontSizes[16]};
    letter-spacing: -0.016rem;
  }
`;

interface Props {
  value: ProjectType;
  onChange: (t: ProjectType) => void;
}

export default function CategoryTabs({ value, onChange }: Props) {
  return (
    <Class>
      <ClassButton
        $active={value === "SERVICE"}
        onClick={() => onChange("SERVICE")}
      >
        서비스
      </ClassButton>
      <ClassButton
        $active={value === "STUDY"}
        onClick={() => onChange("STUDY")}
      >
        스터디
      </ClassButton>
    </Class>
  );
}
