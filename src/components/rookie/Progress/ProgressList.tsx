import styled from "styled-components";
import { EmptyProgressCard, ProgressCard } from "./ProgressCard";
import { useQuery } from "react-query";
import {
  MockProblemResult,
  MockResumeResult,
} from "../../../mocks/types/types";

export function ProgressList() {
  const {
    data: results,
    isLoading,
    isFetching,
    isRefetching,
  } = useQuery<{
    resume: MockResumeResult;
    problems: MockProblemResult[];
  }>({
    queryKey: ["result"],
    queryFn: () =>
      fetch("/me/result")
        .then((res) => res.json())
        .then((data) => data),
  });

  if (isLoading || isFetching || isRefetching) {
    return (
      <List>
        <EmptyProgressCard />
        <EmptyProgressCard />
        <EmptyProgressCard />
        <EmptyProgressCard />
      </List>
    );
  }

  if (!results) {
    return <div />;
  }

  return (
    <List>
      <ProgressCard
        type="resume"
        title="자기소개서"
        submit={results.resume.submitted}
        correct={null}
        to="./resume"
      />
      {results.problems.map(({ index, submitted, correct }) => (
        <ProgressCard
          type="problem"
          title={`문제 ${index}`}
          submit={submitted}
          correct={correct}
          to={`../solve/${index}`}
        />
      ))}
    </List>
  );
}

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
`;
