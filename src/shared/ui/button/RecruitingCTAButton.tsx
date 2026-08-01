import styled from "styled-components";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { useRecruitingQuery } from "../../../apis/recruiting/recruiting.query";
import { getOngoingRecruitings } from "../../../apis/recruiting/recruiting.util";
import { usePreRegisterQuery } from "../../../apis/preregister/preregister.query";
import Modal from "../../../components/Modal/Modal";
import useModals from "../../../components/Modal/useModals";
import { PreRegisterModal } from "../modal/PreRegisterModal";

export const RecruitingCTAButton = () => {
  const { toRecruitingList } = useRouteNavigation();
  const { useGetActiveRecruitings } = useRecruitingQuery();
  const { useGetActivePreRegisterInfo } = usePreRegisterQuery();

  const { data: recruitingData, isLoading: isRecruitingLoading } =
    useGetActiveRecruitings();
  const { data: preRegistration, isLoading: isPreRegistrationLoading } =
    useGetActivePreRegisterInfo();

  const [modalHandle] = useModals(1);

  if (isRecruitingLoading || isPreRegistrationLoading) {
    return <StyledButton onClick={toRecruitingList}>로딩 중...</StyledButton>;
  }

  const { seasonal, continuous } = getOngoingRecruitings(
    recruitingData?.items ?? [],
  );

  // 사전등록을 받던 기수의 모집이 시작되면 사전등록 대신 리크루팅으로 보낸다
  if (seasonal) {
    return (
      <StyledButton as="button" onClick={toRecruitingList}>
        {seasonal.generation}기 리크루팅 바로가기
      </StyledButton>
    );
  }

  // 상시 모집이 열려 있으면 지금 지원할 수 있으므로 사전등록 안내보다 우선한다
  if (preRegistration && !continuous) {
    return (
      <>
        <StyledButton as="button" onClick={modalHandle.openModal}>
          {preRegistration.generation}기 모집 알림 신청하기
        </StyledButton>
        <Modal
          handle={modalHandle}
          modalContainerBackgroundColor={"rgba(0, 0, 0, 0.6)"}
        >
          <PreRegisterModal
            generation={preRegistration.generation}
            onClose={modalHandle.closeModal}
          />
        </Modal>
      </>
    );
  }

  // 상시 모집만 열려 있거나 열린 모집이 아예 없으면 기수 없이 안내한다
  return (
    <StyledButton onClick={toRecruitingList}>
      와플스튜디오 지원하러 가기
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[300]};
    cursor: pointer;
  }
`;
