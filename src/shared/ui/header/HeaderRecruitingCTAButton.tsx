import styled from "styled-components";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { BreifRecruiting } from "../../api/types/recruiting";
import { useRecruitingQuery } from "../../../entities/api/useRecruitingQuery";
import { usePreRegisterQuery } from "../../../entities/api/usePreRegisterQuery";

export const HeaderRecruitingCTAButton = () => {
  const { toRecruitingList } = useRouteNavigation();

  const { useGetActiveRecruitings } = useRecruitingQuery();
  const { useGetActivePreRegisterInfo } = usePreRegisterQuery();

  const { data: recruitingData, isError: isRecruitingError } =
    useGetActiveRecruitings();
  const { data: preRegistrationData, isError: isPreRegistrationError } =
    useGetActivePreRegisterInfo();
  if (isRecruitingError || isPreRegistrationError) {
    return <StyledButton as="div">모집 마감</StyledButton>;
  }
  if (recruitingData === undefined || preRegistrationData === undefined) {
    return <StyledButton as="div">로딩 중...</StyledButton>;
  }

  const { items: recruitings } = recruitingData;
  const {
    url: preRegistrationUrl,
    generation: currentPreRegistrationGeneration,
    isActive: isPreRegistrationActive,
  } = preRegistrationData;

  const currentRecruitingGeneration =
    recruitings.reduce<BreifRecruiting | null>((max, cur) => {
      if (max === null) {
        return cur;
      }
      return parseFloat(cur.generation) > parseFloat(max.generation)
        ? cur
        : max;
    }, null)?.generation;

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
  background-color: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  padding: 0.4rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-align: center;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[300]};
  }

  &:disabled,
  &[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
