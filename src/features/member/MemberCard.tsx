import styled from "styled-components";
import { theme } from "../../shared/styles/designSystem";
import { POSITION_COLOR, type CorePos } from "./constants";
import { formatPositionLabel } from "./hooks";

export type ViewMember = {
  id: number;
  name: string;
  generationText: string;
  positionKey: CorePos;
};

export default function MemberCard({
  m,
  isMobile,
}: {
  m: ViewMember;
  isMobile: boolean;
}) {
  return (
    <Card>
      <ColorSwatch
        style={{ backgroundColor: POSITION_COLOR[m.positionKey] }}
        aria-hidden
      />
      <Name title={m.name}>{m.name}</Name>
      <MetaRow>
        <Meta>{m.generationText}</Meta>
        <Meta>{formatPositionLabel(m.positionKey, isMobile)}</Meta>
      </MetaRow>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  display: flex;
  gap: 25px;
  background-color: ${theme.colors.black[100]};
  border-radius: 4px;

  @media (max-width: 767px) {
    width: 108px;
    height: 57px;
    padding: 8px 12px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }

  @media (min-width: 768px) {
    width: 222px;
    padding: 16px 22px;
    flex-direction: row;
    align-items: center;
  }
`;

const ColorSwatch = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-radius: 0;
  border-top-right-radius: 4px;
`;

const Name = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  color: ${theme.colors.black[900]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;
  font-weight: ${theme.fontWeights.semibold};
  letter-spacing: -0.01em;
  line-height: ${theme.lineHeights.base};
  font-size: ${theme.fontSizes[16]};

  @media (max-width: 767px) {
    flex: 0 0 auto;
    font-size: ${theme.fontSizes[14]};
  }
`;

const MetaRow = styled.div`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${theme.colors.black[700]};
  white-space: nowrap;

  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;
  font-weight: ${theme.fontWeights.medium};
  letter-spacing: -0.01em;
  line-height: ${theme.lineHeights.base};
  font-size: ${theme.fontSizes[13]};

  @media (max-width: 767px) {
    font-size: ${theme.fontSizes[12]};
  }
`;

const Meta = styled.span`
  display: inline-block;
`;
