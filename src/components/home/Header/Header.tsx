import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { zIndex } from "../../../lib/zIndex";
import { useQuery } from "react-query";
import { checkAuth, deleteSsoToken } from "../../../apis/auth";
import { ssoRedirectURI } from "../../../apis/environment";
import { getAllAnnouncements } from "../../../apis/announcement";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { data: authState } = useQuery({
    queryKey: ["auth"],
    queryFn: () => checkAuth(),
    staleTime: 1000 * 60 * 60,
    retry: 0,
  });
  const [showApply, setShowApply] = useState(false);
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
          <NavButton
            onClick={() => {
              deleteSsoToken();
              navigate("/");
            }}
          >
            <img src={"/icon/header/Logout.svg"} />
            로그아웃
          </NavButton>
          <NavButton
            onMouseEnter={() => setShowApply(true)}
            onMouseLeave={() => setShowApply(false)}
          >
            <img src={"/icon/header/Apply.svg"} />
            지원페이지
            {showApply && (
              <ApplyList>
                <NavLink to={"/recruiting/1"}>루키</NavLink>
                <NavLink to={"/recruiting/2"}>디자이너</NavLink>
              </ApplyList>
            )}
          </NavButton>
          <NavLink to="/announcement">
            <img src={"/icon/header/Alarm.svg"} />
            공지사항
          </NavLink>
        </Nav>
      ) : (
        <Nav>
          <NavButton
            onClick={() => {
              location.href = `https://sso-dev.wafflestudio.com/?redirect_uri=${ssoRedirectURI(
                "home",
              )}`;
            }}
          >
            로그인
          </NavButton>
          <NavButton onMouseEnter={() => setShowApply(true)}>
            <img src={"/icon/header/Apply.svg"} />
            지원페이지
            <ApplyList>
              <div>루키</div>
              <div>디자이너</div>
            </ApplyList>
          </NavButton>
          <NavLink to="/">
            <img src={"/icon/header/Alarm.svg"} />
            공지사항
          </NavLink>
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
  color: #222;
  font-size: 18px;
  font-weight: 500;
`;

const NavLink = styled(Link)`
  position: relative;
  display: inline-flex;
  gap: 5px;
  font: inherit;
  color: inherit;
  > img {
    height: 18px;
  }
`;

const NavButton = styled.button`
  position: relative;
  display: inline-flex;
  gap: 5px;
  font: inherit;
  color: inherit;
  > img {
    height: 18px;
  }
`;

const ApplyList = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 5px;
  background: #fff;
  padding: 10px 0;

  > a {
    display: block;
    padding: 10px 0;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }
`;