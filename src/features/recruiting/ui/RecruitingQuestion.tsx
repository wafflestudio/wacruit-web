import { QuestionAccordian } from "./QuestionAccordian";

const RECRUITING_EMAIL = "recruit@wafflestudio.com";

export const RecruitingQuestion = () => {
  // /questions
  const MOCK_QUESTIONS = {
    items: [
      {
        id: 1,
        question: "개발 경험이 없는데 지원 가능한가요?",
        answer:
          "개발을 처음 접하시는 분들도 물론 **준회원(Rookies)** 으로 지원 가능합니다!\n와플스튜디오에서 제공하는 **세미나**를 통해 지식과 협업 경험을 쌓으실 수 있습니다.\n\n[주의사항]\n- 몇몇 세미나에서는 **선수지식**을 요구하는 경우가 있으니 **“리크루팅” > “세미나 및 토이프로젝트”** 섹션에서 해당 내용을 꼭 확인해주세요.\n- **정회원(Programmers)** 의 경우, **개발 경험이 있는 분들**을 대상으로 선발하고 있으므로 개발 경험이 없으시다면 반드시 **준회원(Rookies)** 모집에 참여해주세요.",
      },
      {
        id: 2,
        question: "세미나의 난이도와 로드가 어떻게 되나요?",
        answer:
          "준회원(Rookies)를 대상으로 열리는 세미나마다 선이수 지식과 로드가 다릅니다. 자세한 내용은 “리크루팅” > “세미나 및 토이프로젝트” 섹션을 참고해주세요.",
      },
      {
        id: 3,
        question:
          "준회원(Rookies) 과정에서 세미나와 토이프로젝트는 필수인가요?",
        answer:
          "준회원(Rookies) 과정에서는 세미나와 토이프로젝트를 필수적으로 참여해야 합니다. 만약 세미나 또는 토이프로젝트 중 하나라도 합격하지 못한 경우에는 정회원(Programmers)으로 승급될 수 없습니다.\n자세한 내용은 “리크루팅” > “세미나 및 토이프로젝트” 섹션을 참고해주세요.",
      },
    ],
  };
  const { items: questions } = MOCK_QUESTIONS;
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
