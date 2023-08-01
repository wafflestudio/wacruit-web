import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { zIndex } from "../../../lib/zIndex";
import { useQuery } from "react-query";
import { checkAuth, deleteSsoToken } from "../../../apis/auth";
import { ssoRedirectURI } from "../../../apis/environment";
import { getAllAnnouncements } from "../../../apis/announcement";

export default function Header() {
  const navigate = useNavigate();
  const { data: authState } = useQuery({
    queryKey: ["auth"],
    queryFn: () => checkAuth(),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
  useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAllAnnouncements(),
    refetchInterval: 1000 * 5,
    staleTime: Infinity,
    retry: 0,
  });

  if (!authState) {
    return (
      <Container>
        <Link to="/">
          <img src={"/icon/rookie/logo.png"} height={27} />
        </Link>
        <Nav>
          <button>로그인 정보 확인 중...</button>
        </Nav>
      </Container>
    );
  }

  return (
    <Container>
      <Link to="/">
        <img src={"/icon/rookie/logo.png"} height={27} />
      </Link>
      {authState === "valid" ? (
        <Nav>
          <button
            onClick={() => {
              deleteSsoToken();
              navigate("/");
            }}
          >
            로그아웃
          </button>
          <Link to="/">지원페이지</Link>
          <Link to="/announcement">공지사항 </Link>
        </Nav>
      ) : (
        <Nav>
          <button
            onClick={() => {
              location.href = `https://sso-dev.wafflestudio.com/?redirect_uri=${ssoRedirectURI(
                "home",
              )}`;
            }}
          >
            로그인
          </button>
          <Link to="/">지원페이지</Link>
          <Link to="/">공지사항</Link>
        </Nav>
      )}
    </Container>
  );
}

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.header};
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

const Nav = styled.nav`
  display: flex;
  gap: 48px;
  > a {
    color: #000;
    font: inherit;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
  }
  > button {
    color: #000;
    font: inherit;
    font-weight: 700;
    font-size: 18px;
    text-decoration: none;
  }
`;
