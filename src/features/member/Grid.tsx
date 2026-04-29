import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  margin: 0 auto;

  /* --- 모바일 (최대 767px) --- */
  @media (max-width: 767px) {
    width: 100%;
    max-width: 366px;
    gap: 10px;
    grid-template-columns: repeat(3, 108px);
    justify-content: center;
    justify-items: center;
    align-content: start;
    align-items: start;
  }

  /* --- 중간 화면 (768px ~ 999px): 3열 --- */
  @media (min-width: 768px) and (max-width: 1200px) {
    width: 100%;
    max-width: 720px; /* 3 * 222px + gap 고려 */
    gap: 12px;
    grid-template-columns: repeat(3, 222px);
    justify-content: center;
    justify-items: center;
    align-items: start;
  }

  /* --- 큰 화면 (1000px 이상): 5열 --- */
  @media (min-width: 1200px) {
    width: 100%;
    max-width: 1160px; /* 5 * 222px + gap */
    gap: 12px;
    grid-template-columns: repeat(5, 222px);
    justify-content: center;
    justify-items: center;
    align-items: start;
  }
`;

export default Grid;
