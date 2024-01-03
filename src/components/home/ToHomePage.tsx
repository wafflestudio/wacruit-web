import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ToHomePage() {
  return (
    <Section>
      <CustomLink to="https://wafflestudio.com">
        와플스튜디오 홈페이지 보러가기 {">"}
      </CustomLink>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  width: 100%;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #f5d487;
  box-shadow: 0rem 0.5rem 0.5rem 0rem rgba(219, 108, 89, 0.8);
`;

const CustomLink = styled(Link)`
  color: #735614;
  text-align: center;
  font-family: Jalnan;
  font-size: 2.2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
