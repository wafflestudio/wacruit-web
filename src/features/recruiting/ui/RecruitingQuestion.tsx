import { QuestionAccordian } from "./QuestionAccordian";
import { useQuestionQuery } from "../../../entities/api/useQuestionQuery";

const RECRUITING_EMAIL = "recruit@wafflestudio.com";

export const RecruitingQuestion = () => {
  const { useGetRecruitingQuestions } = useQuestionQuery();
  const { data, isError } = useGetRecruitingQuestions();
  if (isError) {
    return <div>오류 발생</div>;
  }
  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  const { items: questions } = data;
  return (
    <div>
      <div>
        <h3>자주 묻는 질문</h3>
        <div>
          <span>
            이외 문의 사항은{" "}
            <a href={`mailto:${RECRUITING_EMAIL}`}>{RECRUITING_EMAIL}</a>으로
            연락 부탁드립니다.
          </span>
        </div>
      </div>
      <QuestionAccordian questions={questions} />
    </div>
  );
};
