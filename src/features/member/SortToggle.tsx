import styled from "styled-components";
import { theme } from "../../shared/styles/designSystem";

type Props = {
  sortOrder: "asc" | "desc";
  onToggle: () => void;
};

export default function SortToggle({ sortOrder, onToggle }: Props) {
  return (
    <SortControl>
      <SortLabel>기수 정렬</SortLabel>
      <SortButton
        onClick={onToggle}
        aria-label={`기수 정렬: ${
          sortOrder === "desc" ? "내림차순" : "오름차순"
        }`}
      >
        <span>{sortOrder === "desc" ? "내림차순" : "오름차순"}</span>
        <ArrowIcon
          src="/icon/arrow_downward_alt.svg"
          alt=""
          $asc={sortOrder === "asc"}
        />
      </SortButton>
    </SortControl>
  );
}

const SortControl = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  @media (max-width: 1200px) {
    align-self: center;
    width: auto;
  }
`;

const SortLabel = styled.span`
  font-size: ${theme.fontSizes[16]};
  font-weight: ${theme.fontWeights.semibold};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.01em;
  color: ${theme.colors.black[900]};
  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;
`;

const SortButton = styled.button`
  box-sizing: border-box;
  width: 108px;
  flex: 0 0 108px;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  font-size: ${theme.fontSizes[16]};
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.01em;
  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;

  padding: 4px 8px 4px 12px;
  border: none;
  border-radius: 3px;
  background: ${theme.colors.white};
  box-shadow: inset 0 0 0 1px ${theme.colors.black[700]};

  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: ${theme.colors.black[100]};
  }
`;

const ArrowIcon = styled.img<{ $asc: boolean }>`
  width: 24px;
  height: 24px;
  transform: rotate(${(p) => (p.$asc ? "180deg" : "0deg")});
  user-select: none;
  pointer-events: none;
`;
