import { useEffect, useState } from "react";
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useRouteError,
  useRouteLoaderData,
  useSearchParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Headerv2 from "../shared/ui/header/HeaderV2";
import {
  CREATE_PATH,
  PATH,
  RECRUITING_RESULT_ROUTE_ID,
} from "../shared/routes/constants";
import { isForbiddenError } from "../apis/utility";
import {
  RecruitingSubmission,
  RecruitingSummary,
  RecruitingType,
} from "../apis/recruiting/recruiting.types";
import {
  RecruitingResultLoaderReturnType,
  adminSubmissionQuery,
} from "./Loader/RecruitingResultLoader";

const TYPE_LABEL: Record<RecruitingType, string> = {
  [RecruitingType.ROOKIE]: "루키",
  [RecruitingType.DESIGNER]: "디자이너",
  [RecruitingType.PROGRAMMER]: "프로그래머스",
};

const FILTERS: (RecruitingType | null)[] = [
  null,
  RecruitingType.ROOKIE,
  RecruitingType.DESIGNER,
  RecruitingType.PROGRAMMER,
];

const REDIRECT_DELAY_MS = 3000;

const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}.${month}.${day}`;
};

// 기수가 없는 상시 모집
const formatGeneration = (generation: string | undefined) =>
  !generation || generation === "0.0" ? null : `${generation}기`;

/** 로그인은 했지만 관리자 권한이 없는 계정 */
export function Forbidden() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(
      () => navigate(PATH.HOME_V2, { replace: true }),
      REDIRECT_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Page>
      <Headerv2 />
      <CenteredMain>
        <NoticeTitle>접근 권한이 없습니다.</NoticeTitle>
        <NoticeDescription>
          이 페이지는 관리자 계정으로만 확인할 수 있습니다.
          <br />
          잠시 후 메인 페이지로 이동합니다.
        </NoticeDescription>
        <PrimaryButton
          type="button"
          onClick={() => navigate(PATH.HOME_V2, { replace: true })}
        >
          메인으로 가기
        </PrimaryButton>
      </CenteredMain>
    </Page>
  );
}

/** 로더에서 던진 오류 처리. 권한 문제와 그 외 오류를 구분해서 보여준다 */
export function RecruitingResultError() {
  const routeError = useRouteError();
  const navigate = useNavigate();

  if (isForbiddenError(routeError)) return <Forbidden />;

  return (
    <Page>
      <Headerv2 />
      <CenteredMain>
        <NoticeTitle>페이지를 불러오지 못했습니다.</NoticeTitle>
        <NoticeDescription>
          잠시 후 다시 시도해주세요.
          <br />
          문제가 계속되면 관리자에게 문의해주세요.
        </NoticeDescription>
        <PrimaryButton type="button" onClick={() => navigate(PATH.HOME_V2)}>
          메인으로 가기
        </PrimaryButton>
      </CenteredMain>
    </Page>
  );
}

function SubmissionRow({ submission }: { submission: RecruitingSubmission }) {
  const [expanded, setExpanded] = useState(false);

  const essays = [
    submission.q1_answer,
    submission.q2_answer,
    submission.q3_answer,
  ];
  const problems = [
    { code: submission.problem_1_code, score: submission.problem_1_correct },
    { code: submission.problem_2_code, score: submission.problem_2_correct },
    { code: submission.problem_3_code, score: submission.problem_3_correct },
  ];
  const totalScore = problems.reduce((sum, { score }) => sum + score, 0);
  const hasDetail =
    essays.some(Boolean) || problems.some(({ code }) => Boolean(code));

  const affiliation =
    [submission.university, submission.department]
      .filter(Boolean)
      .join(" / ") || "—";

  return (
    <>
      <BodyRow
        $expandable={hasDetail}
        onClick={() => hasDetail && setExpanded((prev) => !prev)}
        aria-expanded={hasDetail ? expanded : undefined}
      >
        <NameCell>
          {submission.last_name}
          {submission.first_name}
        </NameCell>
        <Cell>{affiliation}</Cell>
        <Cell>{submission.phone_number}</Cell>
        <Cell>{submission.github_email}</Cell>
        <Cell>
          <ScoreWrap>
            {problems.map(({ score }, index) => (
              <ScoreChip key={index}>{score}</ScoreChip>
            ))}
            <ScoreTotal>= {totalScore}</ScoreTotal>
          </ScoreWrap>
        </Cell>
        <ExpandCell>{hasDetail && (expanded ? "▲" : "▼")}</ExpandCell>
      </BodyRow>
      {expanded && (
        <tr>
          <DetailCell colSpan={6}>
            {essays.some(Boolean) && (
              <DetailSection>
                <DetailLabel>에세이 답변</DetailLabel>
                {essays.map((answer, index) =>
                  answer ? (
                    <DetailBlock key={index}>
                      <DetailBadge>Q{index + 1}</DetailBadge>
                      <EssayText>{answer}</EssayText>
                    </DetailBlock>
                  ) : null,
                )}
              </DetailSection>
            )}
            {problems.some(({ code }) => Boolean(code)) && (
              <DetailSection>
                <DetailLabel>코딩 답안</DetailLabel>
                {problems.map(({ code, score }, index) =>
                  code ? (
                    <DetailBlock key={index}>
                      <DetailBadge>
                        문제 {index + 1} · {score}점
                      </DetailBadge>
                      <CodeBlock>{code}</CodeBlock>
                    </DetailBlock>
                  ) : null,
                )}
              </DetailSection>
            )}
          </DetailCell>
        </tr>
      )}
    </>
  );
}

function SubmissionList({
  recruiting,
  onBack,
}: {
  recruiting: RecruitingSummary;
  onBack: () => void;
}) {
  const { data, isLoading, isError, error } = useQuery({
    ...adminSubmissionQuery(recruiting.id),
    retry: (failureCount, err) => !isForbiddenError(err) && failureCount < 2,
  });

  const submissions = data?.items ?? [];
  const generation = formatGeneration(recruiting.generation);

  // 목록은 볼 수 있지만 제출 내역 조회가 거부된 경우에도 권한 없음으로 처리한다
  if (isError && isForbiddenError(error)) return <Forbidden />;

  return (
    <Page>
      <Headerv2 />
      <Main>
        <BackButton type="button" onClick={onBack}>
          <BackArrow aria-hidden="true">←</BackArrow>
          리크루팅 목록으로
        </BackButton>
        <DetailHeader>
          <div>
            <Badges>
              <TypeLabel>{TYPE_LABEL[recruiting.type]}</TypeLabel>
              {generation && <Generation>{generation}</Generation>}
            </Badges>
            <PageTitle>{recruiting.name}</PageTitle>
          </div>
          <Status $active={recruiting.is_active}>
            {recruiting.is_active ? "모집 중" : "마감"}
          </Status>
        </DetailHeader>

        {isLoading && <StateMessage>불러오는 중...</StateMessage>}
        {isError && (
          <StateMessage $error>지원 결과를 불러오지 못했습니다.</StateMessage>
        )}

        {!isLoading && !isError && submissions.length === 0 && (
          <StateMessage>지원 결과가 없습니다.</StateMessage>
        )}

        {!isLoading && !isError && submissions.length > 0 && (
          <>
            <TotalCount>총 {submissions.length}명</TotalCount>
            <TableWrap>
              <Table>
                <thead>
                  <tr>
                    <HeadCell>이름</HeadCell>
                    <HeadCell>소속</HeadCell>
                    <HeadCell>연락처</HeadCell>
                    <HeadCell>이메일</HeadCell>
                    <HeadCell>코딩 점수 (P1 / P2 / P3)</HeadCell>
                    <HeadCell aria-label="상세 보기" />
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <SubmissionRow key={index} submission={submission} />
                  ))}
                </tbody>
              </Table>
            </TableWrap>
          </>
        )}
      </Main>
    </Page>
  );
}

function RecruitingCard({
  recruiting,
  onSelect,
}: {
  recruiting: RecruitingSummary;
  onSelect: () => void;
}) {
  const from = formatDate(recruiting.from_date);
  const to = formatDate(recruiting.to_date);
  const generation = formatGeneration(recruiting.generation);

  return (
    <Card type="button" onClick={onSelect}>
      <CardBody>
        <CardName>{recruiting.name}</CardName>
        <CardMeta>
          {generation && `${generation} `}
          {TYPE_LABEL[recruiting.type]}
          {recruiting.applicant_count >= 0 &&
            ` · ${recruiting.applicant_count}명`}
        </CardMeta>
        {from && to && (
          <CardPeriod>
            {from} ~ {to}
          </CardPeriod>
        )}
      </CardBody>
      <Status $active={recruiting.is_active}>
        {recruiting.is_active ? "모집 중" : "마감"}
      </Status>
    </Card>
  );
}

/** 부모 로더가 받아둔 리크루팅 목록을 자식 라우트에서 읽는다 */
const useAdminRecruitings = (): RecruitingSummary[] => {
  const parentData = useRouteLoaderData(
    RECRUITING_RESULT_ROUTE_ID,
  ) as RecruitingResultLoaderReturnType;

  return parentData.forbidden ? [] : parentData.recruitings;
};

const FILTER_PARAM = "type";

/** /recruiting-result/:recruit_id — 특정 리크루팅의 지원 결과 */
export function RecruitingResultDetail() {
  const navigate = useNavigate();
  const { recruit_id } = useParams();
  const { state } = useLocation() as {
    state: { listSearch?: string } | null;
  };
  const recruitings = useAdminRecruitings();

  const listSearch = state?.listSearch ?? "";
  const toList = () =>
    navigate({ pathname: PATH.RECRUITING_RESULT, search: listSearch });

  const recruiting = recruitings.find((item) => String(item.id) === recruit_id);

  if (!recruiting) {
    return (
      <Page>
        <Headerv2 />
        <CenteredMain>
          <NoticeTitle>리크루팅을 찾을 수 없습니다.</NoticeTitle>
          <NoticeDescription>
            삭제되었거나 잘못된 주소일 수 있습니다.
          </NoticeDescription>
          <PrimaryButton type="button" onClick={toList}>
            리크루팅 목록으로
          </PrimaryButton>
        </CenteredMain>
      </Page>
    );
  }

  return <SubmissionList recruiting={recruiting} onBack={toList} />;
}

/** /recruiting-result — 리크루팅 목록 */
export function RecruitingResultList() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const recruitings = useAdminRecruitings();

  // 필터를 URL에 두면 상세에서 뒤로가기로 돌아왔을 때 그대로 복원된다
  const typeParam = searchParams.get(FILTER_PARAM);
  const filter =
    FILTERS.find((type) => type !== null && String(type) === typeParam) ?? null;

  const selectFilter = (type: RecruitingType | null) =>
    setSearchParams(type === null ? {} : { [FILTER_PARAM]: String(type) }, {
      replace: true,
    });

  const openDetail = (recruiting: RecruitingSummary) =>
    navigate(
      CREATE_PATH.RECRUITING_RESULT_DETAIL({ recruitId: recruiting.id }),
      {
        state: { listSearch: searchParams.toString() },
      },
    );

  const filtered =
    filter === null
      ? recruitings
      : recruitings.filter((item) => item.type === filter);
  const active = filtered.filter((item) => item.is_active);
  const closed = filtered.filter((item) => !item.is_active);

  return (
    <Page>
      <Headerv2 />
      <Main>
        <PageTitle>리크루팅 지원 결과</PageTitle>

        <FilterBar>
          {FILTERS.map((type) => (
            <FilterButton
              key={type ?? "all"}
              type="button"
              $selected={filter === type}
              onClick={() => selectFilter(type)}
            >
              {type === null ? "전체" : TYPE_LABEL[type]}
            </FilterButton>
          ))}
        </FilterBar>

        {active.length > 0 && (
          <Section>
            <SectionLabel>모집 중</SectionLabel>
            <CardGrid>
              {active.map((item) => (
                <RecruitingCard
                  key={item.id}
                  recruiting={item}
                  onSelect={() => openDetail(item)}
                />
              ))}
            </CardGrid>
          </Section>
        )}

        {closed.length > 0 && (
          <Section>
            <SectionLabel>마감</SectionLabel>
            <CardGrid>
              {closed.map((item) => (
                <RecruitingCard
                  key={item.id}
                  recruiting={item}
                  onSelect={() => openDetail(item)}
                />
              ))}
            </CardGrid>
          </Section>
        )}

        {filtered.length === 0 && (
          <StateMessage>해당하는 리크루팅이 없습니다.</StateMessage>
        )}
      </Main>
    </Page>
  );
}

/** 목록·상세 공통 가드. 권한 검사는 부모 로더에서 한 번만 수행한다 */
export default function RecruitingResult() {
  const loaderData = useLoaderData() as RecruitingResultLoaderReturnType;

  if (loaderData.forbidden) return <Forbidden />;

  return <Outlet />;
}

const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 12.8rem 2rem 8rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-top: 8.8rem;
  }
`;

const CenteredMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 12.8rem 2rem 4rem;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding-top: 8.8rem;
  }
`;

const NoticeTitle = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const NoticeDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 160%;
  color: ${({ theme }) => theme.colors.black[700]};
`;

const PrimaryButton = styled.button`
  margin-top: 1.4rem;
  padding: 1.2rem 2.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[900]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.black[100]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
`;

const PageTitle = styled.h1`
  margin: 0 0 2.4rem;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const FilterBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 3.2rem;
`;

const FilterButton = styled.button<{ $selected: boolean }>`
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  border: 0.1rem solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.black[900] : theme.colors.black[300]};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.black[900] : theme.colors.white};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.black[100] : theme.colors.black[700]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
`;

const Section = styled.section`
  margin-bottom: 4rem;
`;

const SectionLabel = styled.p`
  margin: 0 0 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 1.6rem;
`;

const Card = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.15s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black[500]};
  }
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;
`;

const CardName = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const CardMeta = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[700]};
`;

const CardPeriod = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const Status = styled.span<{ $active: boolean }>`
  flex-shrink: 0;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.lime : theme.colors.black[200]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black[900] : theme.colors.black[700]};
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2.4rem;
  padding: 1.2rem 2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;

  &:hover {
    background: ${({ theme }) => theme.colors.black[100]};
    border-color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const BackArrow = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[18]};
  line-height: 1;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.6rem;
  margin-bottom: 2.4rem;

  ${PageTitle} {
    margin-bottom: 0;
  }
`;

const Badges = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
`;

const TypeLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
`;

const Generation = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const TotalCount = styled.p`
  margin: 0 0 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[700]};
`;

const TableWrap = styled.div`
  overflow-x: auto;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes[14]};
`;

const HeadCell = styled.th`
  padding: 1.4rem 1.6rem;
  text-align: left;
  white-space: nowrap;
  background: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[700]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
`;

const BodyRow = styled.tr<{ $expandable: boolean }>`
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  cursor: ${({ $expandable }) => ($expandable ? "pointer" : "default")};

  &:hover {
    background: ${({ theme, $expandable }) =>
      $expandable ? theme.colors.black[100] : "transparent"};
  }
`;

const Cell = styled.td`
  padding: 1.4rem 1.6rem;
  color: ${({ theme }) => theme.colors.black[900]};
  vertical-align: middle;
`;

const NameCell = styled(Cell)`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  white-space: nowrap;
`;

const ExpandCell = styled(Cell)`
  width: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.black[500]};
`;

const ScoreWrap = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  white-space: nowrap;
`;

const ScoreChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.4rem;
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.black[100]};
  font-variant-numeric: tabular-nums;
`;

const ScoreTotal = styled.span`
  margin-left: 0.4rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const DetailCell = styled.td`
  padding: 2rem 1.6rem;
  background: ${({ theme }) => theme.colors.black[100]};
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
`;

const DetailSection = styled.div`
  & + & {
    margin-top: 2.4rem;
  }
`;

const DetailLabel = styled.p`
  margin: 0 0 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
`;

const DetailBlock = styled.div`
  & + & {
    margin-top: 1.6rem;
  }
`;

const DetailBadge = styled.span`
  display: inline-block;
  margin-bottom: 0.6rem;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const EssayText = styled.p`
  margin: 0;
  white-space: pre-wrap;
  line-height: 170%;
  color: ${({ theme }) => theme.colors.black[900]};
`;

const CodeBlock = styled.pre`
  margin: 0;
  padding: 1.6rem;
  overflow-x: auto;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.black[100]};
  font-family: "D2Coding", Menlo, Consolas, monospace;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  line-height: 160%;
`;

const StateMessage = styled.p<{ $error?: boolean }>`
  margin: 4rem 0;
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme, $error }) =>
    $error ? theme.colors.pink : theme.colors.black[500]};
`;
