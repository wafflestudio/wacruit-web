import styled from "styled-components";
import { MAILTO_RECRUIT } from "../../common/const";

export const ProgrammerRecruitInfo = () => {
  return (
    <div>
      <div>
        <Content>
          <Description>
            <Email href={MAILTO_RECRUIT}>recruit@wafflestudio.com</Email>으로
            아래 내용을 보내주시면 <Highlight>7일 이내로</Highlight> 비대면
            인터뷰 날짜를 잡아드릴 예정입니다.
          </Description>

          <RequirementsList style={{ counterReset: "item" }}>
            <RequirementItem>
              <RequirementText>이름, 학교, 학과, 학번</RequirementText>
            </RequirementItem>

            <RequirementItem>
              <RequirementText>전화번호 및 연락을 위한 이메일</RequirementText>
            </RequirementItem>

            <RequirementItem>
              <RequirementText>
                슬랙, 노션, 깃허브 초대를 위한 이메일
              </RequirementText>
              <SubText>
                세 가지에 대해 모두 작성해주세요. (예. 깃허브
                example_github@gmail.com, 슬랙/노션 example_slack@naver.com)
              </SubText>
            </RequirementItem>

            <RequirementItem>
              <RequirementText>
                지원 동기 <Highlight>(500자 내외)</Highlight>
              </RequirementText>
            </RequirementItem>

            <RequirementItem>
              <RequirementText>
                프로젝트 진행과 관련한 자료 및 간략한 설명
              </RequirementText>
              <SubText>(예. 깃허브 링크, 포트폴리오 등)</SubText>
            </RequirementItem>
          </RequirementsList>
        </Content>
      </div>
    </div>
  );
};

const Content = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 3rem;
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black[800]};
  padding: 2rem;
  background: ${({ theme }) => theme.colors.black[100]};
  border-left: 4px solid ${({ theme }) => theme.colors.oak};
  border-radius: 0.8rem;
`;

const Email = styled.a`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-decoration: underline;
  cursor: pointer;
`;

const RequirementsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;
`;

const RequirementItem = styled.li`
  padding: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.black[100]};
  border-radius: 1.2rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.black[300]};
    box-shadow: 0 5px 15px rgba(79, 172, 254, 0.1);
    transform: translateY(-2px);
  }

  &::before {
    content: counter(item);
    counter-increment: item;
    position: absolute;
    left: -1rem;
    top: -1rem;
    width: 2.8rem;
    height: 2.8rem;
    background: ${({ theme }) => theme.colors.black[700]};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;

const RequirementText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const SubText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[700]};
  margin-top: 1rem;
  font-style: italic;
`;

const Highlight = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
