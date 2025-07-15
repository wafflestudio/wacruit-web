import styled from "styled-components";
import { members } from "../mocks/member";
import { sponsors } from "../mocks/sponsor";

export default function MemberGrid() {
  const MEMBER_SORT_OPTIONS = [
    { key: "generation", label: "기수별" },
    { key: "position", label: "포지션별" },
    { key: "is_active", label: "활동 회원 여부" },
  ];
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
          {MEMBER_SORT_OPTIONS.map((option) => (
            <SortButton key={option.key}>{option.label}</SortButton>
          ))}
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
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}
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

const SortButton = styled.div`
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
