import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "../../../apis/recruiting";
import { FaqAccordion } from "./QuestionAccordian";

const RECRUITING_EMAIL = "recruit@wafflestudio.com";

const Section = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  box-sizing: border-box;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const FaqTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.32px;
  margin: 0;
  width: 100%;

  @media (max-width: 768px) {
    letter-spacing: -0.28px;
  }
`;

const FaqMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: 100%;
`;

const FaqGrid = styled.div`
  display: flex;
  max-width: 1000px;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const FaqContact = styled.div`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -0.14px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[700]};
  padding: 40px;
`;

export const Faq = () => {
  const {
    data: questions,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["questions", "all"],
    queryFn: () => getAllQuestions().then((response) => response.items),
    staleTime: 60_000,
  });

  if (isLoading) {
    return (
      <Section>
        <ContentWrapper>
          <FaqTitle>자주 묻는 질문</FaqTitle>
          <LoadingMessage>질문을 불러오는 중...</LoadingMessage>
        </ContentWrapper>
      </Section>
    );
  }

  if (error != null) {
    return (
      <Section>
        <ContentWrapper>
          <FaqTitle>자주 묻는 질문</FaqTitle>
          <LoadingMessage>질문을 불러올 수 없습니다</LoadingMessage>
        </ContentWrapper>
      </Section>
    );
  }

  return (
    <Section>
      <ContentWrapper>
        <FaqTitle>자주 묻는 질문</FaqTitle>
        <FaqMain>
          <FaqGrid>
            {questions && questions.length === 0 ? (
              <LoadingMessage>등록된 질문이 없습니다.</LoadingMessage>
            ) : (
              <FaqAccordion questions={questions || []} />
            )}
          </FaqGrid>

          <FaqContact>
            이외 문의 사항은{" "}
            <a href={`mailto:${RECRUITING_EMAIL}`}>{RECRUITING_EMAIL}</a>으로
            연락 부탁드립니다.
          </FaqContact>
        </FaqMain>
      </ContentWrapper>
    </Section>
  );
};
