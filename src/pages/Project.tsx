import styled from "styled-components";
import { projectData } from "../mocks/project";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3rem;
`;

const Class = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Class1 = styled.div`
  text-decoration: underline;
  text-align: center;
  flex: 1 1 50%;
`;

const Class2 = styled.div`
  text-decoration: underline;
  text-align: center;
  flex: 1 1 50%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5rem;
  gap: 5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 18rem;
  object-fit: cover;
  border-radius: 1rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Project = styled.h2`
  font-weight: bold;
  font-size: 1.125rem;
`;

const StatusButton = styled.button<{ isService: boolean }>`
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.isService ? "#bbf7d0" : "#e5e7eb")};
  color: ${(props) => (props.isService ? "#166534" : "#374151")};
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function ProjectGrid() {
  return (
    <Wrapper>
      <Title>
        개발과 관련된 것이라면
        <br />
        무엇이든 할 수 있어요!
      </Title>
      <Class>
        <Class1>서비스</Class1>
        <Class2>스터디</Class2>
      </Class>
      <Grid>
        {projectData.map((project, index) => (
          <Card key={index}>
            <Thumbnail
              src={project.thumbnail_url}
              alt={project.name}
              onError={(e) => {
                e.currentTarget.src = ""; // 이미지 src를 비워서 배경색만 남게
                e.currentTarget.style.backgroundColor = "#e5e7eb"; // 회색 배경
              }}
            />
            <TitleRow>
              <Project>{project.name}</Project>
              <StatusButton isService={project.is_service}>
                {project.is_service ? "서비스 중" : "서비스 종료"}
              </StatusButton>
            </TitleRow>
            <Description>{project.brief_introduction}</Description>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}
