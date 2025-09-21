//import { useQuestionQuery } from "../../../../entities/api/useQuestionQuery";

// export const RecruitingQuestion = () => {
//   const { useGetRecruitingQuestions } = useQuestionQuery();
//   const { data, isError } = useGetRecruitingQuestions();
//   if (isError) {
//     return <div>오류 발생</div>;
//   }
//   if (data === undefined) {
//     return <div>로딩중...</div>;
//   }

//   const { items: questions } = data;
//   return (
//     <div>
//       <div>
//         <h3>자주 묻는 질문</h3>
//         <div>
//           <span>
//             이외 문의 사항은{" "}
//             <a href={`mailto:${RECRUITING_EMAIL}`}>{RECRUITING_EMAIL}</a>으로
//             연락 부탁드립니다.
//           </span>
//         </div>
//       </div>
//       <QuestionAccordian questions={questions} />
//     </div>
//   );
// };

import styled from "styled-components";
import { FaqAccordion } from "./QuestionAccordian";

const RECRUITING_EMAIL = "recruit@wafflestudio.com";

export const Faq = () => {
  return (
    <FaqContainer>
      <FaqContent>
        <FaqTitle>자주 묻는 질문</FaqTitle>
        <FaqMain>
          <FaqGrid>
            <FaqAccordion />
          </FaqGrid>

          <FaqContact href={`mailto:${RECRUITING_EMAIL}`}>
            <span>
              이외 문의 사항은{" "}
              <a href={`mailto:${RECRUITING_EMAIL}`}>{RECRUITING_EMAIL}</a>으로
              연락 부탁드립니다.
            </span>
          </FaqContact>
        </FaqMain>
      </FaqContent>
    </FaqContainer>
  );
};

const FaqContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const FaqContent = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const FaqTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  align-self: stretch;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
`;

const FaqMain = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  align-self: stretch;
  
`;

const FaqGrid = styled.div`
  display: flex;
  max-width: 1000px;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
  width: 100%;
`;

const FaqContact = styled.a`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;
