import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { zIndex } from "../../../lib/zIndex";
import { useQuery } from "@tanstack/react-query";
import { checkAuth, deleteToken } from "../../../apis/auth/auth.api";
import { LoadingBackgroundBlink } from "../../../lib/loading";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const redirectPath = `${location.pathname}${location.search}${location.hash}`;

  /**
   * Check Authorization
   */
  const { data: authState } = useQuery({
    queryKey: ["auth"],
    queryFn: () => checkAuth(),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });

  if (!authState) {
    return (
      <Container>
        <Link to="/">
          <img src={"/icon/header/Logo.jpeg"} height={27} />
        </Link>
        <LoadAuth>로그인 정보 확인 중...</LoadAuth>
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/">
        <img src={"/icon/header/Logo.jpeg"} height={27} />
      </Link>
      <Nav>
        {authState === "valid" ? (
          <NavButton
            aria-label="로그아웃"
            onClick={() => {
              deleteToken();
              queryClient.invalidateQueries(["auth"]);
              navigate("/");
            }}
          >
            <img src={"/icon/header/Logout.svg"} alt="" />
            <span>로그아웃</span>
          </NavButton>
        ) : (
          <NavButton
            aria-label="로그인"
            onClick={() => {
              navigate(`/login?redirect=${encodeURIComponent(redirectPath)}`);
            }}
          >
            <img src={"/icon/header/Login.svg"} alt="" />
            <span>로그인</span>
          </NavButton>
        )}
        <NavLink to={"/recruiting"} aria-label="지원페이지">
          <img src={"/icon/header/Apply.svg"} alt="" />
          <span>지원페이지</span>
        </NavLink>
        <NavLink to="/announcement" aria-label="공지사항">
          <img src={"/icon/header/Alarm.svg"} alt="" />
          <span>공지사항</span>
        </NavLink>
      </Nav>
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.header};
  width: 100%;
  height: 6.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 max(calc(50vw - 65rem), 3rem);
  background: #fff;
  box-shadow: 0 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  font-family: Pretendard, sans-serif;

  @media (max-width: 768px) {
    height: 5.6rem;
    padding: 0 2rem;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 4.8rem;
  color: #222;
  font-size: 1.8rem;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 1200px) {
    gap: 3.2rem;
  }

  @media (max-width: 768px) {
    gap: 2rem;
    font-size: 1.4rem;
  }
`;

const NavLinkStyle = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font: inherit;
  color: inherit;
  cursor: pointer;
  > img {
    height: 1.8rem;
  }

  @media (max-width: 480px) {
    > span {
      display: none;
    }
    > img {
      height: 2.2rem;
    }
  }
`;

const NavLink = styled(Link)`
  ${NavLinkStyle}
`;

const NavButton = styled.button`
  ${NavLinkStyle}
`;

const LoadAuth = styled.div`
  width: 30rem;
  max-width: 60%;
  height: 80%;
  border-radius: 10px;
  animation: ${LoadingBackgroundBlink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
`;
