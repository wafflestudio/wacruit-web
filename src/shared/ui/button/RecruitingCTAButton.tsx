import styled from "styled-components";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { BreifRecruiting } from "../../api/types/recruiting";
import { useRecruitingQuery } from "../../../entities/api/useRecruitingQuery";
import { usePreRegisterQuery } from "../../../entities/api/usePreRegisterQuery";

export const RecruitingCTAButton = () => {
  const { toRecruitingList } = useRouteNavigation();
  const { useGetActiveRecruitings } = useRecruitingQuery();
  const { useGetActivePreRegisterInfo } = usePreRegisterQuery();

  const { data: recruitingData, isError: isRecruitingError } =
    useGetActiveRecruitings();
  const { data: preRegistrationData, isError: isPreRegistrationError } =
    useGetActivePreRegisterInfo();
  if (isRecruitingError || isPreRegistrationError) {
    return (
      <StyledButton onClick={toRecruitingList}>
        23.5기 준회원(Rookies) 지원하러 가기
      </StyledButton>
      //하드코딩 나중에 고치기
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
  background: var(--pink, #ff2c4c);
  color: white;

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
    background-color: #e55b4d;
  }

  &:disabled,
  &[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
