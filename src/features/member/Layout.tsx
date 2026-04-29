import styled from "styled-components";
import { theme } from "../../shared/styles/designSystem";

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1920px;
  min-width: 767px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;
  padding: 0 0 140px;

  height: auto;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 406px;
    min-width: 0;
    gap: 40px;
    padding: 0 0 140px;
    height: auto;
  }
`;

export const CombinedSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 100px;

- width: 1200px;
- max-width: 1200px;
+ width: 100%;
+ max-width: 1200px;
  box-sizing: border-box;
  padding: 0 20px;

  height: auto;
  opacity: 1;
  margin: 0 auto;

  @media (max-width: 767px) {
    width: 100%;
    max-width: 406px;
    padding: 0 20px;
    gap: 100px;
  }
`;

export const SponsorsBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`;

export const SponsorName = styled.div`
  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;
  font-weight: ${theme.fontWeights.medium};
  line-height: ${theme.lineHeights.base};
  letter-spacing: -0.01em;
  text-align: center;
  font-size: ${theme.fontSizes[16]};
`;

export const MemberBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

export const YearTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
`;

export const YearTab = styled.button<{ $active: boolean }>`
  flex-shrink: 0;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(p) => (p.$active ? theme.colors.black[900] : "transparent")};
  padding: 8px 20px;
  cursor: pointer;
  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI,
    Roboto, "Noto Sans KR", sans-serif;
  font-size: ${theme.fontSizes[16]};
  font-weight: ${(p) =>
    p.$active ? theme.fontWeights.semibold : theme.fontWeights.medium};
  line-height: ${theme.lineHeights.base};
  color: ${(p) =>
    p.$active ? theme.colors.black[900] : theme.colors.black[500]};
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition: color 0.15s ease;

  &:hover {
    color: ${theme.colors.black[900]};
  }
`;

export const ControlsRow = styled.div`
  width: 100%;
  max-width: 1160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: nowrap;
  margin: 0 auto;

  @media (max-width: 1200px) {
    max-width: 366px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
`;
