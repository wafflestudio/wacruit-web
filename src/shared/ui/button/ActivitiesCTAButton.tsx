import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ArrowIcon from "../../../components/icons/home/arrow_outward.svg";

type InfoCTAType = "SERVICE" | "STUDY" | "SEMINAR";

interface InfoCTAButtonProps {
  variant: InfoCTAType;
}

const CTA_CONFIG: Record<InfoCTAType, { label: string; path: string }> = {
  SERVICE: {
    label: "프로젝트 더 알아보기",
    path: "/projects?type=SERVICE",
  },
  STUDY: {
    label: "스터디 더 알아보기",
    path: "/projects?type=STUDY",
  },
  SEMINAR: {
    label: "세미나 더 알아보기",
    path: "/recruiting-info#rookie-info",
  },
};

export const ActivitiesCTAButton = ({ variant }: InfoCTAButtonProps) => {
  const navigate = useNavigate();
  const { label, path } = CTA_CONFIG[variant];

  const handleClick = () => {
    navigate(path);
  };

  return (
    <StyledButton onClick={handleClick}>
      {label}
      <ArrowImg src={ArrowIcon} alt="" aria-hidden="true" />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  letter-spacing: -0.14px;

  &:hover {
    opacity: 0.9;
  }
`;

const ArrowImg = styled.img`
  width: 2rem;
  height: 2rem;
  display: block;
`;
