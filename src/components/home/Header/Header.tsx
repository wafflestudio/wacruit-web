import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { zIndex } from "../../../lib/zIndex";
import { useQuery } from "@tanstack/react-query";
import { checkAuth, deleteSsoToken, tryLogin } from "../../../apis/auth";
import { useState } from "react";
import { LoadingBackgroundBlink } from "../../../lib/loading";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showApply, setShowApply] = useState(false);

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
          <img src={"/icon/rookie/logo.png"} height={27} />
        </Link>
        <LoadAuth>로그인 정보 확인 중...</LoadAuth>
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
              queryClient.invalidateQueries(["auth"]);
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
              tryLogin("home");
            }}
          >
            <img src={"/icon/header/Login.svg"} />
            로그인
          </NavButton>
          <NavButton
            onMouseEnter={() => setShowApply(true)}
            onMouseLeave={() => setShowApply(false)}
          >
            <img src={"/icon/header/Apply.svg"} />
            지원페이지
            {showApply && (
              <ApplyList>
                <NavButton onClick={() => tryLogin(1)}>루키</NavButton>
                <NavButton onClick={() => tryLogin(2)}>디자이너</NavButton>
              </ApplyList>
            )}
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
  cursor: pointer;
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
  cursor: pointer;
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
  > button {
    display: block;
    padding: 10px 0;
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }
`;

const LoadAuth = styled.div`
  width: 300px;
  height: 80%;
  border-radius: 10px;
  animation: ${LoadingBackgroundBlink};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
`;
