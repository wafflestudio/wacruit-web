import { useCallback } from "react";
import styled from "styled-components";
import { checkAuth } from "../../apis/auth/auth.api";
import { useNavigate } from "react-router-dom";
import { RecruitingType } from "../../apis/recruiting/recruiting.types";
import { PositionTag, StatusTag, TagGroup } from "../../shared/ui/tag/Tag";

type RecruitItemComponentProps = {
  id: number;
  name: string;
  description: string;
  from: Date | null;
  to: Date | null;
  type: number;
  isActive: boolean;
};

const formatDate = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

export function RecruitItem({
  id,
  name,
  description,
  from,
  to,
  type,
  isActive,
}: RecruitItemComponentProps) {
  const navigate = useNavigate();

  const onApply = useCallback(async () => {
    if (!isActive) return;

    if (type === RecruitingType.PROGRAMMER) {
      navigate(`/recruiting/programmers/${id}`);
      return;
    }

    const authState = await checkAuth();
    if (authState === "valid") {
      navigate(`/recruiting/${id}`);
      return;
    }
    navigate(`/login?redirect=${encodeURIComponent(`/recruiting/${id}`)}`);
  }, [id, isActive, navigate, type]);

  const trimmedDescription = description.trim();
  const period = to
    ? `${from ? `${formatDate(from)} ~ ` : ""}${formatDate(to)}`
    : "상시 모집";

  return (
    <Card type="button" onClick={onApply} disabled={!isActive}>
      <Body>
        <TagGroup>
          <PositionTag type={type} muted={!isActive} />
          <StatusTag $variant={isActive ? "open" : "closed"}>
            {isActive ? "모집 중" : "마감"}
          </StatusTag>
        </TagGroup>
        <Name>{name}</Name>
        {trimmedDescription && <Description>{trimmedDescription}</Description>}
        <Period>{period}</Period>
      </Body>
      {isActive && (
        <Arrow aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Arrow>
      )}
    </Card>
  );
}

const Arrow = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  transition: background-color 0.15s ease, color 0.15s ease;

  @media (max-width: 768px) {
    width: 3.6rem;
    height: 3.6rem;
  }
`;

const Card = styled.button`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  width: 100%;
  padding: 2.4rem 2.8rem;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover:enabled {
    border-color: ${({ theme }) => theme.colors.black[900]};
  }

  &:hover:enabled ${Arrow} {
    background-color: ${({ theme }) => theme.colors.black[900]};
    color: ${({ theme }) => theme.colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.oak};
    outline-offset: 2px;
  }

  &:disabled {
    border-color: transparent;
    background-color: ${({ theme }) => theme.colors.black[100]};
    color: ${({ theme }) => theme.colors.black[500]};
    cursor: default;
  }

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 1.2rem;
    padding: 2rem;
  }
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Name = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[20]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[18]};
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.base};

  ${Card}:enabled & {
    color: ${({ theme }) => theme.colors.black[700]};
  }
`;

const Period = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: ${({ theme }) => theme.lineHeights.base};
  font-variant-numeric: tabular-nums;
`;
