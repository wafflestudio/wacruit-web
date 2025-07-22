import { useState } from "react";
import styled from "styled-components";
import { projectData } from "@/mocks/project";
import { useRouteNavigation } from "@/shared/routes/useRouteNavigation";

const ITEMS_PER_PAGE = 6;

export default function ProjectGrid() {
  const { toProjectDetail } = useRouteNavigation();
  const [selectedType, setSelectedType] = useState<"SERVICE" | "STUDY">(
    "SERVICE",
  );

  const filteredProjects = projectData.filter(
    (project) => project.project_type === selectedType,
  );

  const sortedData = [...filteredProjects].sort((a, b) => {
    // 우선순위 1: is_active (true 먼저)
    if (a.is_active !== b.is_active) {
      return Number(b.is_active) - Number(a.is_active);
    }

    // 우선순위 2: member_generation (숫자 내림차순)
    const genA = a.id
    const genB = b.id
    return genB - genA;
  });


  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = sortedData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );
  function formatProjectStatus(project: {
    project_type: string;
    is_active: boolean;
  }): string {
    if (project.project_type === "SERVICE") {
      return project.is_active ? "서비스 중" : "서비스 종료";
    } else {
      return project.is_active ? "활동 중" : "활동 종료";
    }
  }

  return (
    <Wrapper>
      <Title>
        개발과 관련된 것이라면
        <br />
        무엇이든 할 수 있어요!
      </Title>
      <Class>
        <ClassButton
          $active={selectedType === "SERVICE"}
          onClick={() => setSelectedType("SERVICE")}
        >
          서비스
        </ClassButton>
        <ClassButton
          $active={selectedType === "STUDY"}
          onClick={() => setSelectedType("STUDY")}
        >
          스터디
        </ClassButton>
      </Class>
      <Grid>
        {currentItems.map((project) => (
          <Card onClick={() => toProjectDetail(project.id)} key={project.id}>
            <Thumbnail
              src={project.thumbnail_url}
              alt={project.name}
              onError={(e) => {
                e.currentTarget.src = "";
                e.currentTarget.style.backgroundColor = "#e5e7eb";
              }}
            />
            {(project.is_active && (
              <StatusButton>
                {formatProjectStatus(project)}
              </StatusButton>
            ))}
            <TitleRow>
              <Project>{project.name}</Project>
              <Description>{project.summary}</Description>
            </TitleRow>
          </Card>
        ))}
      </Grid>
      <Pagination>
        <Arrow
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          <Icon src="/icon/forward_left.svg" alt="뒤로가기" />
        </Arrow>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageNumber
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PageNumber>
        ))}
        <Arrow
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          <Icon src="/icon/forward_right.svg" alt="앞으로가기" />
        </Arrow>
      </Pagination>
    </Wrapper>
  );
}
const Icon = styled.img`
  margin: 0;
  padding: 0;
  display: block;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`;

const PageNumber = styled.button<{ active: boolean }>`
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  background-color: ${(props) => (props.active ? "#e5e7eb" : "transparent")};
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  cursor: pointer;
  border: none;
`;

const Arrow = styled.button<{ disabled: boolean }>`
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  font-size: 1.25rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3rem;
  line-height: 140%;
  padding-top: 6rem;
`;

const Class = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
`;

const ClassButton = styled.div<{ $active: boolean }>`
  border-bottom: 0.2rem solid
    ${({ $active }) => ($active ? "#000000" : "#FFFFFF")};
  padding-bottom: 1rem;
  text-align: center;
  display: inline-block;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  color: ${({ $active }) => ($active ? "#000000" : "#9ca3af")};
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5rem;
  gap: 5rem;
`;

const Card = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
  position: relative;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 18rem;
  object-fit: cover;
  border-radius: 0.6rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* 호버 시 110% 확대 */
  }
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.4rem;
`;

const Project = styled.h2`
  font-weight: bold;
  font-size: 1.8rem;
  color: var(--black-900, #121212);
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 27px */
  letter-spacing: -0.18px;
`;

const StatusButton = styled.button`
  display: flex;
  padding: 0.3rem 0.8rem;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 6.8rem;
  right: 0;
  border-bottom-right-radius: 0.6rem;
  background-color: black;
  color: white;
  border: none;
  font-family: "Pretendard Variable";
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.13px;
`;

const Description = styled.p`
  font-size: 1.4rem;
  color: var(--black-900, #121212);
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  letter-spacing: -0.14px;
`;
