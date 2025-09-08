import styled from "styled-components";
import { theme } from "../../shared/styles/designSystem";

export const Title1 = styled.h1`
  display: inline-block; /* shrink-to-fit(Hug) */
  width: auto;
  max-width: 100%;
  flex: 0 0 auto;

  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes[32]};
  letter-spacing: -0.01em;
  text-align: center;
  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;

  white-space: nowrap; /* 데스크톱 한 줄 */
  .t1-part {
    display: inline;
  }
  .t1-part + .t1-part::before {
    content: " ";
  }

  @media (max-width: 767px) {
    white-space: normal; /* 줄바꿈 허용 */
    line-height: ${theme.lineHeights.base}; /* 150% */
    .t1-part {
      display: block;
    } /* 두 줄 */
    .t1-part + .t1-part::before {
      content: "";
    }
  }
`;

export const Title2 = styled.div`
  width: 100%;
  flex: 1 1 100%;

  font-weight: ${theme.fontWeights.bold};
  font-size: ${theme.fontSizes[32]};
  letter-spacing: -0.01em;
  text-align: center;
  font-family: "Pretendard Variable", system-ui, -apple-system, Segoe UI, Roboto,
    "Noto Sans KR", sans-serif;
`;
