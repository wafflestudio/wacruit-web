import styled from "styled-components";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { BreifRecruiting } from "../../../apis/recruiting/recruiting.types";
import { useRecruitingQuery } from "../../../apis/recruiting/recruiting.query";
import { usePreRegisterQuery } from "../../../apis/preregister/preregister.query";

export const RecruitingCTAButton = () => {
  const { toRecruitingList } = useRouteNavigation();
  const { useGetActiveRecruitings } = useRecruitingQuery();
  const { useGetActivePreRegisterInfo } = usePreRegisterQuery();

  const { data: recruitingData, isError: isRecruitingError } =
    useGetActiveRecruitings();
  const { data: preRegistrationData, isError: isPreRegistrationError } =
    useGetActivePreRegisterInfo();
  if (isRecruitingError || isPreRegistrationError) {
    // TODO: 하드코딩 문구 교체 예정
    return (
      <StyledButton onClick={toRecruitingList}>
        23.5기 준회원(Rookies) 지원하러 가기
      </StyledButton>
    );
  }
  if (recruitingData === undefined || preRegistrationData === undefined) {
    return <StyledButton onClick={toRecruitingList}>로딩 중...</StyledButton>;
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
    <StyledButton onClick={toRecruitingList}>
      리크루팅 정보 확인하기
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  padding: 10px 18px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  // display: inline-block;
  // background-color: pink;
  // color: white;
  // padding: 1.2rem 2.4rem;
  // font-size: 1.4rem;
  // font-weight: bold;
  // text-align: center;
  // text-decoration: none;
  // border: none;
  // border-radius: 8px;
  // cursor: pointer;
  // transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[300]};
    cursor: pointer;
  }

  &:disabled,
  &[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
