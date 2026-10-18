import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProgrammerRecruitInfo } from "../components/programmer/ProgrammerRecruitInfo";
import Headerv2 from "../shared/ui/header/HeaderV2";
import HeaderSpacer from "../shared/ui/header/HeaderSpacer";
import { PositionTag, TagGroup } from "../shared/ui/tag/Tag";
import { PATH } from "../shared/routes/constants";
import { RecruitingType } from "../apis/recruiting/recruiting.types";

export const ProgrammersRecruitInfoPage = () => {
  return (
    <>
      <Headerv2 />
      <HeaderSpacer />
      <Main>
        <Content>
          <Heading>
            <BackLink to={PATH.RECRUITING_LIST}>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              리크루팅 목록
            </BackLink>
            <TagGroup>
              <PositionTag type={RecruitingType.PROGRAMMER} />
              <PositionTag type={RecruitingType.DESIGNER} />
            </TagGroup>
            <Title>프로그래머스 / 디자이너(정회원) 리크루팅</Title>
          </Heading>
          <ProgrammerRecruitInfo />
        </Content>
      </Main>
    </>
  );
};

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 7.2rem 2rem 10.4rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem 7.2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 100rem;

  @media (max-width: 768px) {
    gap: 3.2rem;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.8rem;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  &:hover {
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[24]};
  }
`;
