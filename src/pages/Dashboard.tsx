import { styled } from "styled-components";
import { ProgressList } from "../components/rookie/Progress/ProgressList";
import Header from "../components/home/Header/Header";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MarkdownRenderer from "../lib/MarkdownRenderer";
import {
  DashboardLoaderReturnType,
  myResumeQuery,
  recruitingDetailQuery,
} from "./Loader/DashboardLoader.ts";
import { applyRecruiting, cancelRecruiting } from "../apis/recruiting.ts";

export default function Dashboard() {
  const queryClient = useQueryClient();
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
          {/* <MarkdownRenderer
            markdownString={`와플스튜디오의 21.5기 ${
              recruiting.id === 1 ? "루키" : "디자이너"
            }를 모집합니다.`}
            StyledWrapper={DescriptionMarkdownStyledWrapper}
          /> */}
        </Description>
        <Information>
          <MarkdownRenderer
            markdownString={recruiting.description}
            StyledWrapper={InformationMarkdownStyledWrapper}
          />
        </Information>
        {/* <AnnouncementButton onClick={() => navigate("/announcement")}>
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
        </AnnouncementButton> */}
        {initialData.recruiting.applied ? (
          <AnnouncementButton onClick={() => navigate("./result")}>
            지원 결과 확인하기
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
        ) : (
          <AnnouncementButton
            onClick={() =>
              applyRecruiting(recruiting.id)
                .then(() => {
                  alert("지원이 완료되었습니다.");
                  navigate(0);
                })
                .catch((res: Response) => {
                  res.json().then((data) => {
                    alert(data.detail);
                  });
                })
            }
          >
            지원하기
          </AnnouncementButton>
        )}
        <BottomContainer>
          <ProgressList
            recruiting={recruiting}
            hasResume={resume.items.length > 0}
            type={recruiting.type}
          />
          <Caution>
            위 내용은 제출 후에도 상시 수정할 수 있으며, 모두 제출해야 지원
            완료됩니다.
            {initialData.recruiting.applied ? (
              <CancelButton
                onClick={() => {
                  if (
                    confirm(
                      "지원을 취소하면 입력한 자기소개서와 문제의 제출 내역이 모두 삭제됩니다. 정말로 지원을 취소하시겠습니까?",
                    )
                  ) {
                    cancelRecruiting(recruiting.id)
                      .then(() => {
                        queryClient.invalidateQueries(["recruiting"]);
                        queryClient.invalidateQueries(["resume"]);
                        queryClient.invalidateQueries(["user"]);
                        alert("지원이 취소되었습니다");
                        navigate("/");
                      })
                      .catch((res: Response) => {
                        res.json().then((data) => {
                          alert(data.detail);
                        });
                      });
                  }
                }}
              >
                지원 취소
              </CancelButton>
            ) : null}
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
  padding: 23vh max(calc(50vw - 65rem), 3rem);
  padding-bottom: 3rem;
`;

const Title = styled.h1`
  margin: 0.9rem 0;
`;

const TitleMarkdownStyledWrapper = styled.div`
  p {
    margin: 0;
    color: #222;
    font-size: 4.6rem;
    font-weight: 700;
  }
`;

const Description = styled.p`
  margin-top: 1.2rem;
  margin-bottom: 3.5rem;
`;

// const DescriptionMarkdownStyledWrapper = styled.div`
//   p {
//     color: #373737;
//     font-size: 2rem;
//     font-weight: 500;
//     line-height: 160%; /* 3.2rem */
//     letter-spacing: 0.08rem;
//   }
// `;

const Information = styled.div`
  margin-bottom: 3.4rem;
`;

const InformationMarkdownStyledWrapper = styled.div`
  p {
    color: #737373;
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 170%; /* 3.06rem */
    letter-spacing: 0.072rem;
    margin: 0;
  }
  code {
    color: #b44f3d;
    font-weight: 600;
  }
  ul,
  ol {
    padding: 0;
    margin: 0.4rem;
    padding-left: 2rem;
    li {
      font: inherit;
      color: #737373;
      font-size: 1.8rem;
      font-weight: 400;
      line-height: 170%; /* 3.06rem */
      letter-spacing: 0.072rem;
    }
  }
`;

const AnnouncementButton = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 2rem;
  background: #f0745f;
  border: #f0745f 0.1rem solid;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 2.5rem;
  margin-bottom: 3.4rem;
  cursor: pointer;

  > div {
    width: 2.5rem;
    height: 2.5rem;
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
  font-size: 1.8rem;
  font-weight: 400;
  line-height: 160%; /* 2.88rem */
  letter-spacing: 0.072rem;
  margin-top: 2.5rem;
`;

const CancelButton = styled.button`
  position: absolute;
  display: inline-block;
  right: 0;
  margin-top: 15.3rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #c4c4c4;
  font: inherit;
  text-decoration-line: underline;
`;
