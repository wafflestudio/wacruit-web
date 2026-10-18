import styled, { css } from "styled-components";
import { RecruitingType } from "../../../apis/recruiting/recruiting.types";

export type StatusTagVariant =
  | "plain"
  | "todo"
  | "saved"
  | "done"
  | "judging"
  | "wrong"
  | "open"
  | "closed";

const POSITION_LABEL: Record<RecruitingType, string> = {
  [RecruitingType.ROOKIE]: "Rookies",
  [RecruitingType.DESIGNER]: "Designer",
  [RecruitingType.PROGRAMMER]: "Programmers",
};

const tagBase = css`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  height: 2.6rem;
  padding: 0 0.8rem;
  border-radius: 0.2rem;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  white-space: nowrap;
`;

const PositionTagBase = styled.span<{ $muted: boolean }>`
  ${tagBase}
  background-color: ${({ $muted, theme }) =>
    $muted ? theme.colors.black[300] : theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
`;

export const PositionTag = ({
  type,
  muted = false,
}: {
  type: RecruitingType;
  muted?: boolean;
}) => <PositionTagBase $muted={muted}>{POSITION_LABEL[type]}</PositionTagBase>;

export const StatusTag = styled.span<{ $variant: StatusTagVariant }>`
  ${tagBase}
  ${({ $variant, theme }) => {
    switch ($variant) {
      case "saved":
      case "open":
        return css`
          background-color: ${theme.colors.lime};
          color: ${theme.colors.black[900]};
        `;
      case "done":
        return css`
          background-color: ${theme.colors.green};
          color: ${theme.colors.black[900]};
        `;
      case "judging":
        return css`
          background-color: ${theme.colors.oak};
          color: ${theme.colors.black[900]};
        `;
      case "wrong":
        return css`
          background-color: ${theme.colors.pink};
          color: ${theme.colors.white};
          font-weight: ${theme.fontWeights.bold};
        `;
      case "closed":
        return css`
          background-color: ${theme.colors.black[200]};
          color: ${theme.colors.black[700]};
        `;
      default:
        return css`
          background-color: ${theme.colors.black[100]};
          color: ${theme.colors.black[700]};
        `;
    }
  }}
`;

export const TagGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
`;
