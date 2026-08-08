import { useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Headerv2 from "../shared/ui/header/HeaderV2";
import { PATH } from "../shared/routes/constants";
import { AdminLoaderReturnType } from "./Loader/RecruitingResultLoader";
import { Forbidden } from "./RecruitingResult";

export default function Admin() {
  const loaderData = useLoaderData() as AdminLoaderReturnType;
  const navigate = useNavigate();

  if (loaderData.forbidden) return <Forbidden />;

  return (
    <Page>
      <Headerv2 />
      <Main>
        <PageTitle>관리자</PageTitle>

        <MenuList>
          <MenuButton
            type="button"
            onClick={() => navigate(PATH.RECRUITING_RESULT)}
          >
            <MenuLabel>리크루팅 제출 결과 조회</MenuLabel>
            <MenuHint>리크루팅별 지원자의 제출 내역을 확인합니다.</MenuHint>
          </MenuButton>

          <MenuButton type="button" disabled>
            <MenuLabel>사전등록 메일 전송</MenuLabel>
            <MenuHint>준비 중입니다.</MenuHint>
          </MenuButton>
        </MenuList>
      </Main>
    </Page>
  );
}

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 12.8rem 2rem 8rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-top: 8.8rem;
  }
`;

const PageTitle = styled.h1`
  margin: 0 0 3.2rem;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const MenuButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  width: 100%;
  padding: 2.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.black[100]};
    border-color: ${({ theme }) => theme.colors.black[900]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.black[100]};
    border-color: ${({ theme }) => theme.colors.black[200]};
    color: ${({ theme }) => theme.colors.black[500]};
    cursor: not-allowed;
  }
`;

const MenuLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: inherit;
`;

const MenuHint = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[500]};
`;
