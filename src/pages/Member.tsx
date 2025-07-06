import styled from "styled-components";
import { members } from "../mocks/member";
import { sponsors } from "../mocks/sponsor";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5rem;
  gap: 6rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title2 = styled.div`
  font-weight: bold;
  font-size: 3rem;
`;
const Title1 = styled.div`
  font-weight: bold;
  font-size: 3rem;
  text-align: center;
`;
const Sort = styled.div`
  gap: 1rem;
  font-size: 0.875rem;
  display: flex;
`;
const Sort1 = styled.div``;
const Sort2 = styled.div``;
const Sort3 = styled.div`
  font-size: 0.875rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f3f4f6; /* 연한 회색 */
  border-radius: 0.5rem;
  padding: 1rem;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb; /* hover 시 더 진한 회색 */
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const LeftInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RightInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Status = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "green" : "gray")};
  font-weight: bold;
`;

const ProjectText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function MemberGrid() {
  return (
    <Wrapper>
      <Title1>
        와플스튜디오의 발전을 위해
        <br />
        노력해주신 분들
      </Title1>
      <Flex>
        {sponsors.map((sponsor) => (
          <div key={sponsor.id}>{`${sponsor.name} 님`}</div>
        ))}
      </Flex>
      <Row>
        <Title2>와플스튜디오 멤버</Title2>
        <Sort>
          <Sort1>기수별</Sort1>
          <Sort2>포지션별</Sort2>
          <Sort3>활동 회원 여부</Sort3>
        </Sort>
      </Row>
      <Grid>
        {members.map((member) => (
          <Card key={member.id}>
            <HeaderRow>
              <LeftInfo>
                <span>{member.member_name}</span>
                <Status isActive={member.is_active}>
                  {member.is_active ? "• 활동중" : "• 휴식회원"}
                </Status>
              </LeftInfo>
              <RightInfo>
                <span>{member.member_generation}</span>
                <span>{member.member_position}</span>
              </RightInfo>
            </HeaderRow>
            <ProjectText>참여 프로젝트 나열</ProjectText>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}
