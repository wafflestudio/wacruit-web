import styled from "styled-components";

export const SectionNumber = styled.div`
  display: inline-flex;
  margin-bottom: 10px;
  padding: 3px 18px;
  justify-content: center;
  border-radius: 28.5px;
  border: 1px solid #f0745f;

  color: #f0745f;
  font-family: Jalnan;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1px;
`;

export const SectionTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  margin-bottom: 90px;

  h1 {
    color: #2f2f2f;
    font-family: Jalnan;
    font-size: 40px;
    font-weight: 700;
    line-height: 160%;
    span {
      color: #f0745f;
      font-family: Jalnan;
    }
  }
  p {
    color: #737373;
    font-size: 18px;
    font-weight: 500;
  }
`;
