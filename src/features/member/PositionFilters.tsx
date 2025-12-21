import styled from "styled-components";
import { theme } from "../../shared/styles/designSystem";
import {
  POSITION_BUTTONS,
  POSITION_COLOR,
  ACTIVE_TEXT_COLOR,
  type PosFilter,
  type CorePos,
} from "./constants";

type Props = {
  selected: PosFilter;
  onSelect: (p: PosFilter) => void;
};

export default function PositionFilters({ selected, onSelect }: Props) {
  return (
    <Positions>
      {POSITION_BUTTONS.map((btn) => {
        const isActive = selected === btn.key;
        const color =
          btn.key === "all"
            ? theme.colors.black[900]
            : POSITION_COLOR[btn.key as CorePos];

        return (
          <PositionButton
            key={btn.key}
            $active={isActive}
            $color={color}
            $hasSwatch={btn.key !== "all"}
            $isAll={btn.key === "all"}
            $activeTextColor={ACTIVE_TEXT_COLOR[btn.key]}
            onClick={() => onSelect(btn.key)}
          >
            {btn.label}
          </PositionButton>
        );
      })}
    </Positions>
  );
}

/* 목록 컨테이너 */
const Positions = styled.div`
  display: flex;
  gap: 10px;
  flex: 1 1 auto;
  min-width: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  white-space: nowrap;
  scrollbar-width: thin;

  @media (max-width: 1200px) {
    overflow: visible;
    white-space: normal;
    flex: 0 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, max-content);
    justify-content: center;
    column-gap: 10px;
    row-gap: 10px;
  }
`;

/* 버튼 */
const PositionButton = styled.button<{
  $active: boolean;
  $color: string;
  $hasSwatch: boolean;
  $isAll: boolean;
  $activeTextColor: string;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 108px;
  padding: 4px 0;
  border: none;
  border-radius: 3px;
  opacity: 1;

  background: ${(p) =>
    p.$active
      ? p.$isAll
        ? theme.colors.black[900]
        : p.$color
      : theme.colors.black[100]};
  color: ${(p) => (p.$active ? p.$activeTextColor : theme.colors.black[900])};

  cursor: pointer;
  transition: filter 0.15s ease;

  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;
  font-weight: ${(p) =>
    p.$isAll ? theme.fontWeights.semibold : theme.fontWeights.medium};
  font-size: ${theme.fontSizes[16]};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.01em;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    filter: brightness(0.98);
  }

  &::after {
    content: "";
    display: ${(p) => (p.$hasSwatch ? "block" : "none")};
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background: ${(p) => p.$color};
    border: none;
    border-radius: 0;
    border-top-right-radius: 3px;
    pointer-events: none;
  }
`;
