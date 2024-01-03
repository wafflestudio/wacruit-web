import styled from "styled-components";

export const SectionNumber = styled.div`
  display: inline-flex;
  margin-bottom: 1rem;
  padding: 0.5rem 1.8rem 0.1rem 1.8rem;
  border-radius: 2.85rem;
  border: 0.1rem solid #f0745f;
  color: #f0745f;
  font-family: Jalnan;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 9rem;

  h1 {
    color: #2f2f2f;
    font-family: Jalnan;
    font-size: 4rem;
    font-weight: 700;
    line-height: 160%;
    span {
      color: #f0745f;
      font-family: Jalnan;
    }
  }
  p {
    color: #737373;
    font-size: 1.8rem;
    font-weight: 500;
  }
`;
