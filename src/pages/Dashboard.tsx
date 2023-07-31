import { styled } from "styled-components";
import { ProgressList } from "../components/rookie/Progress/ProgressList";
import Header from "../components/home/Header/Header";
import { useParams } from "react-router-dom";
import { getRecruitingById } from "../apis/recruiting";
import { useQuery } from "react-query";
import MarkDownRenderer from "../lib/MarkdownRenderer";

export default function Dashboard() {
  const params = useParams();
  const { data: recruiting, isFetching } = useQuery({
    queryKey: ["recruit", params.recruit_id],
    queryFn: () => getRecruitingById(Number(params.recruit_id)),
  });

  const markDownTexts = {
    title: `루키 지원 페이지`,
    subTitle: `와플스튜디오의 21.5기 루키를 모집합니다.`,
    information: `<span style="color: #b44f3d; font-weight: 600;">지원 기간 </span>8월 5일(금) - 8월 14일(일) 23:59  
    <span style="color: #b44f3d; font-weight: 600;">지원 방법 </span>하단 자기소개서 제출 및 문제 풀이를 모두 완료해주세요.  
    *합격자 발표는 8월 15일 이메일로 알려드립니다.`,
  };

  return (
    <Main>
      <Header />
      <Title>
        <MarkDownRenderer
          markdownString={recruiting ? recruiting.name : "불러오는 중..."}
        />
      </Title>
      <Description>
        <MarkDownRenderer markdownString={markDownTexts.subTitle} />
      </Description>
      <Information>
        <MarkDownRenderer markdownString={recruiting?.description ?? ""} />
      </Information>
      <AnnouncementButton>
        공지 및 변경사항 안내
        <div>
          <img
            src="/icon/rookie/AnnounceRightArrow.svg"
            alt="&rarr;"
            width={20}
          />
          <img
            src="/icon/rookie/AnnounceRightArrowWhite.svg"
            alt="&rarr;"
            width={20}
          />
        </div>
      </AnnouncementButton>
      <BottomContainer>
        <ProgressList
          problems={recruiting ? recruiting.problem_status : []}
          isLoading={isFetching}
        />
        <Caution>
          아래 내용은 제출 후에도 상시 수정할 수 있으며, 모두 제출해야 지원
          완료됩니다.
          <CancelButton>지원 취소</CancelButton>
        </Caution>
      </BottomContainer>
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: normal;
  padding: 23vh max(calc(50vw - 650px), 30px);
  padding-bottom: 30px;
`;

const Title = styled.h1`
  color: #222;
  font-size: 40px;
  font-weight: 600;
  margin: 9px 0;
`;

const Description = styled.p`
  color: #373737;
  font-size: 20px;
  font-weight: 500;
  line-height: 160%; /* 32px */
  letter-spacing: 0.8px;
  margin: 0;
  margin-bottom: 37px;
`;

const Information = styled.div`
  color: #737373;
  font-size: 18px;
  font-weight: 400;
  line-height: 170%; /* 30.6px */
  letter-spacing: 0.72px;
  margin-bottom: 34px;
  span {
    color: #b44f3d;
    font-weight: 600;
  }
`;

const AnnouncementButton = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 20px;
  background: #f0745f;
  border: #f0745f 1px solid;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 34px;
  cursor: pointer;

  > div {
    width: 25px;
    height: 25px;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    > img:last-child {
      display: none;
    }
  }

  &:hover {
    color: #f0745f;
    background: #fff;
    > div {
      background: #f0745f;
      > img:first-child {
        display: none;
      }
      > img:last-child {
        display: inline;
      }
    }
  }
`;

const BottomContainer = styled.div`
  display: inline-block;
`;

const Caution = styled.div`
  position: relative;
  color: #515151;
  font-size: 18px;
  font-weight: 400;
  line-height: 160%; /* 28.8px */
  letter-spacing: 0.72px;
  margin-top: 25px;
`;

const CancelButton = styled.button`
  position: absolute;
  display: inline-block;
  right: 0;
  margin-top: 153px;
  background: none;
  border: none;
  cursor: pointer;
  color: #c4c4c4;
  font: inherit;
  text-decoration-line: underline;
`;
