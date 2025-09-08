import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  margin: 0 auto;

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

  @media (min-width: 768px) {
    width: 1160px;
    gap: 12px;
    grid-template-columns: repeat(5, 222px);
    justify-content: center;
  }
`;

export default Grid;
