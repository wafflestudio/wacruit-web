import styled from "styled-components";
import { members } from "@/mocks/member";
import { sponsors } from "@/mocks/sponsor";

export default function MemberGrid() {
  const MEMBER_SORT_OPTIONS = [
    { key: "generation", label: "기수별" },
    { key: "position", label: "포지션별" },
  ];
  return (
    <Wrapper>
      <Title1>와플스튜디오의 발전을 위해 노력해주신 분들</Title1>
      <Flex>
        {sponsors.map((sponsor) => (
          <div key={sponsor.id}>{`${sponsor.name} 님`}</div>
        ))}
      </Flex>
      <Title2>와플스튜디오 멤버</Title2>
      <Row>
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
  gap: 1.6rem;
  width: 12.8rem;
  margin-bottom: 5rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem;
  gap: 5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title2 = styled.div`
  font-size: 3.2rem;
  color: #000;
  text-align: center;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.32px;
`;
const Title1 = styled.div`
  padding-top: 6rem;
  font-size: 3.2rem;
  text-align: center;
  color: #000;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
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
  width: 22.2rem;
  padding: 1.6rem 2.2rem;
  align-items: flex-start;
  gap: 2.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LeftInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #121212;
  font-family: "Pretendard Variable";
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
`;

const RightInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #5f656f;
  font-family: "Pretendard Variable";
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.13px;
`;
