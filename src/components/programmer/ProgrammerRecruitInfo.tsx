import { useRef, useState } from "react";
import styled from "styled-components";
import { MAIL_RECRUIT } from "../../common/const";
import { generateMailUrl } from "../../common/utils";

const requirements = [
  {
    contents: "이름, 학교, 학과, 학번",
  },
  {
    contents: "전화번호",
    detail: "예. 010-1234-5678",
  },
  {
    contents: "디스코드, 노션, 깃허브 초대를 위한 이메일",
    detail:
      "세 가지에 대해 모두 작성해주세요.\n(예. 깃허브 example_github@gmail.com, 디스코드/노션 example_discord@naver.com)",
  },
  {
    contents: "지원하는 포지션 및 주 사용 기술스택",
    detail: "복수 응답 또한 가능합니다. (예. 웹 프론트엔드 / React, Next.js)",
  },
  {
    contents: "지원 동기 (500자 내외)",
  },
  {
    contents: "프로젝트 진행과 관련한 자료 및 간략한 설명",
    detail: "예. 깃허브 링크, 포트폴리오 등",
  },
];

export const ProgrammerRecruitInfo = () => {
  const emailRef = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);

  const selectEmail = () => {
    const email = emailRef.current;
    const selection = window.getSelection();
    if (!email || !selection) return;
    const range = document.createRange();
    range.selectNodeContents(email);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText(MAIL_RECRUIT)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      })
      .catch(selectEmail);
  };

  return (
    <Content>
      <MailBox>
        <MailText>
          <Email ref={emailRef} href={generateMailUrl(MAIL_RECRUIT)}>
            {MAIL_RECRUIT}
          </Email>
          으로 아래 내용을 보내주시면 <strong>7일 이내로</strong> 비대면 인터뷰
          날짜를 잡아드릴 예정입니다.
        </MailText>
        <CopyButton type="button" onClick={copyEmail}>
          {copied ? "복사 완료" : "메일 주소 복사"}
        </CopyButton>
      </MailBox>

      <RequirementsList>
        {requirements.map(({ contents, detail }, index) => (
          <RequirementItem key={contents}>
            <Number aria-hidden="true">{index + 1}</Number>
            <RequirementText>
              <strong>{contents}</strong>
              {detail !== undefined && <span>{detail}</span>}
            </RequirementText>
          </RequirementItem>
        ))}
      </RequirementsList>
    </Content>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`;

const MailBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2.4rem 2.8rem;
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.black[100]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    padding: 2rem 2.4rem;
  }
`;

const MailText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: ${({ theme }) => theme.lineHeights.base};

  strong {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
`;

const Email = styled.a`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: underline;
  text-underline-offset: 0.3rem;
`;

const CopyButton = styled.button`
  flex-shrink: 0;
  padding: 1rem 1.8rem;
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black[700]};
    background-color: ${({ theme }) => theme.colors.black[700]};
  }
`;

const RequirementsList = styled.ol`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const RequirementItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1.4rem;
  padding: 2rem 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
`;

const Number = styled.span`
  flex-shrink: 0;
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 0.2rem;
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const RequirementText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0;

  strong {
    color: ${({ theme }) => theme.colors.black[900]};
    font-size: ${({ theme }) => theme.fontSizes[16]};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    line-height: ${({ theme }) => theme.lineHeights.base};
  }

  span {
    white-space: pre-line;
    color: ${({ theme }) => theme.colors.black[700]};
    font-size: ${({ theme }) => theme.fontSizes[14]};
    line-height: ${({ theme }) => theme.lineHeights.base};
  }
`;
