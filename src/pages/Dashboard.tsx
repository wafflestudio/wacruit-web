import { styled } from "styled-components";
import { ProgressList } from "../components/rookie/Progress/ProgressList";
import Header from "../components/home/Header/Header";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MarkdownRenderer from "../lib/MarkdownRenderer";
import {
  DashboardLoaderReturnType,
  myResumeQuery,
  recruitingDetailQuery,
} from "./Loader/DashboardLoader.ts";
import { deleteResume } from "../apis/resume.ts";
import { resumeQuestionQuery } from "./Loader/ResumeLoader.ts";

export default function Dashboard() {
  const params = useParams();
  const navigate = useNavigate();
  const initialData = useLoaderData() as DashboardLoaderReturnType;
  const { data: recruiting } = useQuery({
    ...recruitingDetailQuery(Number(params.recruit_id)),
    initialData: initialData.recruiting,
  });
  const { data: resume } = useQuery({
    ...myResumeQuery(Number(params.recruit_id)),
    initialData: initialData.resume,
  });
  const { data: question } = useQuery({
    ...resumeQuestionQuery(Number(params.recruit_id)),
    initialData: initialData.question,
  });

  return (
    <>
      <Header />
      <Main>
        <Title>
          <MarkdownRenderer
            markdownString={recruiting.name}
            StyledWrapper={TitleMarkdownStyledWrapper}
          />
        </Title>
        <Description>
          <MarkdownRenderer
            markdownString={`와플스튜디오의 21.5기 ${
              recruiting.id === 1 ? "루키" : "디자이너"
            }를 모집합니다.`}
            StyledWrapper={DescriptionMarkdownStyledWrapper}
          />
        </Description>
        <Information>
          <MarkdownRenderer
            markdownString={recruiting.description}
            StyledWrapper={InformationMarkdownStyledWrapper}
          />
        </Information>
        <AnnouncementButton onClick={() => navigate("/announcement")}>
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
            problems={recruiting.problem_status}
            hasResume={resume.items.length === question.items.length}
            isDesigner={recruiting.id === 2}
          />
          <Caution>
            위 내용은 제출 후에도 상시 수정할 수 있으며, 모두 제출해야 지원
            완료됩니다.
            <CancelButton
              onClick={() => {
                if (
                  confirm(
                    "지원을 취소하면 입력한 자기소개서와 문제의 제출 내역이 모두 삭제됩니다. 정말로 지원을 취소하시겠습니까?",
                  )
                ) {
                  deleteResume(recruiting.id).finally(() => {
                    alert("지원이 취소되었습니다");
                    navigate("/");
                  });
                }
              }}
            >
              지원 취소
            </CancelButton>
          </Caution>
        </BottomContainer>
      </Main>
    </>
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
  margin: 9px 0;
`;

const TitleMarkdownStyledWrapper = styled.div`
  p {
    margin: 0;
    color: #222;
    font-size: 46px;
    font-weight: 700;
  }
`;

const Description = styled.p`
  margin-top: 12px;
  margin-bottom: 35px;
`;

const DescriptionMarkdownStyledWrapper = styled.div`
  p {
    color: #373737;
    font-size: 20px;
    font-weight: 500;
    line-height: 160%; /* 32px */
    letter-spacing: 0.8px;
  }
`;

const Information = styled.div`
  margin-bottom: 34px;
`;

const InformationMarkdownStyledWrapper = styled.div`
  p {
    color: #737373;
    font-size: 18px;
    font-weight: 400;
    line-height: 170%; /* 30.6px */
    letter-spacing: 0.72px;
    margin: 0;
  }
  code {
    color: #b44f3d;
    font-weight: 600;
  }
  ul,
  ol {
    padding: 0;
    margin: 4px;
    padding-left: 20px;
    li {
      font: inherit;
      color: #737373;
      font-size: 18px;
      font-weight: 400;
      line-height: 170%; /* 30.6px */
      letter-spacing: 0.72px;
    }
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
