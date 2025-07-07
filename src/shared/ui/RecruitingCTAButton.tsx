import styled from "styled-components";
import { useRouteNavigation } from "../routes/useRouteNavigation";
import { BreifRecruiting } from "../api/types/recruiting";

export const RecruitingCTAButton = () => {
  const { toRecruitingList } = useRouteNavigation();

  // /recruitings/active
  const MOCK_ACTIVE_RECRUITINGS: { items: BreifRecruiting[] } = {
    items: [
      {
        id: 0,
        name: "22.5기 루키 리크루팅",
        generation: "22.5",
        type: "ROOKIE",
        is_active: true,
        from_date: "2025-06-30T06:25:02.346Z",
        to_date: "2025-06-30T06:25:02.346Z",
        applicant_count: 0,
        short_description: "string",
      },
    ],
  };
  const { items: recruitings } = MOCK_ACTIVE_RECRUITINGS;

  const currentRecruitingGeneration =
    recruitings.reduce<BreifRecruiting | null>((max, cur) => {
      if (max === null) {
        return cur;
      }
      return parseFloat(cur.generation) > parseFloat(max.generation)
        ? cur
        : max;
    }, null)?.generation;

  // /recruiting/pre-registration
  const MOCK_PRE_REGISTRATION_URL = {
    id: 1,
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdExampleFormID/viewform",
    generation: "23.5",
    isActive: true,
  };

  const {
    url: preRegistrationUrl,
    generation: currentPreRegistrationGeneration,
    isActive: isPreRegistrationActive,
  } = MOCK_PRE_REGISTRATION_URL;

  if (currentRecruitingGeneration !== undefined) {
    return (
      <StyledButton as="button" onClick={toRecruitingList}>
        {currentRecruitingGeneration}기 리크루팅 바로가기
      </StyledButton>
    );
  }

  if (isPreRegistrationActive) {
    return (
      <StyledButton
        as="a"
        href={preRegistrationUrl}
        target="_blank"
        rel="noreferrer"
      >
        {currentPreRegistrationGeneration}기 모집 알림 신청하기
      </StyledButton>
    );
  }

  return (
    <StyledButton as="div">
      {currentRecruitingGeneration !== undefined
        ? `${currentRecruitingGeneration}기 모집 마감`
        : "모집 마감"}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-block;
  background-color: #ff6f61;
  color: white;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #e55b4d;
  }

  &:disabled,
  &[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
