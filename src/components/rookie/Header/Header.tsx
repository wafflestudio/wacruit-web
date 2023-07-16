import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Link to="/">
        <img src={"/icon/rookie/logo.png"} height={27} />
      </Link>
      <Buttons>
        <Link to=".">공지사항</Link>
        <Link to="/rookie">지원페이지</Link>
        <Link to="/">로그아웃</Link>
      </Buttons>
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 7vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 max(calc(50vw - 650px), 30px);
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  font-family: Pretendard, sans-serif;
`;

const Buttons = styled.div`
  display: flex;
  gap: 48px;
  > a {
    color: #000;
    font: inherit;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
  }
`;
