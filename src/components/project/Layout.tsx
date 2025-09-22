import styled from "styled-components";

export const HeaderOffset = styled.div`
  height: calc(2rem + 2 * 1.2rem + 1px + 80px);
  @media (max-width: 768px) {
    height: calc(2rem + 2 * 1.2rem + 40px);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 clamp(0rem, calc((100vw - 30rem) / 2), 2rem) 14rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 4rem;
  align-self: stretch;
`;

export const Title = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes[32]};
  line-height: 140%;
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
`;

export const ContentGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6rem;
  width: 100%;
`;

export const ClassAndGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 120rem;
  align-items: flex-start;
  align-content: flex-start;
  gap: 2rem;
  align-self: stretch;
  margin: 0 auto;

  @media (max-width: 60rem) {
    justify-content: center;
  }
`;
