import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getRecruitingInfoByType } from "../../apis/recruiting/recruiting.api";

type TimelineGroup = {
  id: "ROOKIE" | "DESIGNER" | "PROGRAMMER";
  name: string;
  color: string;
};

const timelineGroups: TimelineGroup[] = [
  {
    id: "ROOKIE",
    name: "Rookies",
    color: "#FF2C4C",
  },
  {
    id: "DESIGNER",
    name: "Designers",
    color: "#37007F",
  },
  {
    id: "PROGRAMMER",
    name: "Programmers",
    color: "#876E00",
  },
];

export const Timeline = () => {
  const {
    data: rookieData,
    isLoading: rookieLoading,
    error: rookieError,
  } = useQuery({
    queryKey: ["recruitingInfo", "ROOKIE"],
    queryFn: () => getRecruitingInfoByType("ROOKIE"),
    staleTime: 60_000,
  });

  const {
    data: designerData,
    isLoading: designerLoading,
    error: designerError,
  } = useQuery({
    queryKey: ["recruitingInfo", "DESIGNER"],
    queryFn: () => getRecruitingInfoByType("DESIGNER"),
    staleTime: 60_000,
  });

  const {
    data: programmerData,
    isLoading: programmerLoading,
    error: programmerError,
  } = useQuery({
    queryKey: ["recruitingInfo", "PROGRAMMER"],
    queryFn: () => getRecruitingInfoByType("PROGRAMMER"),
    staleTime: 60_000,
  });

  const isLoading = rookieLoading || designerLoading || programmerLoading;
  const error = rookieError || designerError || programmerError;

  if (isLoading) {
    return (
      <TimelineContainer>
        <TimelineContent>
          <TimelineTitle>모집 일정</TimelineTitle>
          <LoadingMessage>일정을 불러오는 중...</LoadingMessage>
        </TimelineContent>
      </TimelineContainer>
    );
  }

  if (error != null) {
    return (
      <TimelineContainer>
        <TimelineContent>
          <TimelineTitle>모집 일정</TimelineTitle>
          <ErrorMessage>일정을 불러올 수 없습니다</ErrorMessage>
        </TimelineContent>
      </TimelineContainer>
    );
  }

  const dataMap = {
    ROOKIE: rookieData?.items || [],
    DESIGNER: designerData?.items || [],
    PROGRAMMER: programmerData?.items || [],
  };

  return (
    <TimelineContainer>
      <TimelineContent>
        <TimelineTitle>모집 일정</TimelineTitle>

        {timelineGroups.map((group) => {
          const items = dataMap[group.id] || [];

          return (
            <TimelineGroup key={group.id}>
              <GroupName>{group.name}</GroupName>
              <TimelineCards>
                {items.map((item) => (
                  <TimelineCard key={item.id}>
                    <CardHeader $color={group.color}>{item.title}</CardHeader>
                    <CardBody>{item.date_info}</CardBody>
                  </TimelineCard>
                ))}
              </TimelineCards>
            </TimelineGroup>
          );
        })}
      </TimelineContent>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const TimelineContent = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: stretch;
  gap: 40px;
`;

const TimelineTitle = styled.h2`
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.32px;
  margin: 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[700]};
  padding: 60px 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  color: ${({ theme }) => theme.colors.black[700]};
  padding: 60px 20px;
`;

const TimelineGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 26px;
  align-self: stretch;

  @media (max-width: 767px) {
    align-items: center;
  }
`;

const GroupName = styled.h3`
  align-self: stretch;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.18px;
  margin: 0;

  @media (max-width: 767px) {
    text-align: center;
  }
`;

const TimelineCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  width: 100%;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const TimelineCard = styled.div`
  width: 200px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div<{ $color: string }>`
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background-color: ${(props) => props.$color};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.16px;
  text-align: center;
`;

const CardBody = styled.div`
  display: flex;
  padding: 30px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background-color: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.16px;
`;
