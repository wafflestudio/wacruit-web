import styled from "styled-components";

export const WaffleHistory = () => {
  // history
  const MOCK_HISTORY_DATA = {
    startDate: "2022-07-01",
    operationPeriod: 2,
    totalProjects: 150,
    totalUsers: 10000,
    totalMembers: 3000,
  };

  const { operationPeriod, totalProjects, totalUsers, totalMembers } =
    MOCK_HISTORY_DATA;

  return (
    <Container>
      <TextBlock>
        <Title>서울대 개발 커뮤니티의 중심</Title>
        <Description>
          와플스튜디오에서는 개발을 좋아하는 서울대학교 학생들의 네트워크를
          형성하고, 함께 성장할 수 있는 기회를 제공합니다. 전공과 학번에
          상관없이 모든 학생들에게 열려 있습니다. 공익적 목적으로 모든 인원이
          자율적으로 프로젝트에 참여하여 모두에게 도움이 되는 가치를 창출하는
          것을 목표로 합니다.
        </Description>
      </TextBlock>
      <StatsGrid>
        <StatCard>
          <Label>운영 기간</Label>
          <Value>{operationPeriod}년</Value>
        </StatCard>
        <StatCard>
          <Label>누적 프로젝트 수</Label>
          <Value>{totalProjects}개</Value>
        </StatCard>
        <StatCard>
          <Label>누적 서비스 이용자 수</Label>
          <Value>{totalUsers.toLocaleString()}명</Value>
        </StatCard>
        <StatCard>
          <Label>누적 회원수</Label>
          <Value>{totalMembers.toLocaleString()}명</Value>
        </StatCard>
      </StatsGrid>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffefba, #ffffff);
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
`;

const TextBlock = styled.div`
  max-width: 800px;
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #222;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 800px;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Label = styled.p`
  font-size: 0.95rem;
  color: #777;
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  font-size: 1.6rem;
  font-weight: bold;
  color: #111;
`;
