import styled from "styled-components";
import { useRouteNavigation } from "../../routes/useRouteNavigation";
import { useRecruitingQuery } from "../../../apis/recruiting/recruiting.query";
import { getOngoingRecruitings } from "../../../apis/recruiting/recruiting.util";
import { usePreRegisterQuery } from "../../../apis/preregister/preregister.query";
import Modal from "../../../components/Modal/Modal";
import useModals from "../../../components/Modal/useModals";
import { PreRegisterModal } from "../modal/PreRegisterModal";

export const HeaderRecruitingCTAButton = () => {
  const { toRecruitingList } = useRouteNavigation();

  const { useGetActiveRecruitings } = useRecruitingQuery();
  const { useGetActivePreRegisterInfo } = usePreRegisterQuery();

  const { data: recruitingData, isLoading: isRecruitingLoading } =
    useGetActiveRecruitings();
  const { data: preRegistration, isLoading: isPreRegistrationLoading } =
    useGetActivePreRegisterInfo();

  const [modalHandle] = useModals(1);

  if (isRecruitingLoading || isPreRegistrationLoading) {
    return <StyledButton as="div">로딩 중...</StyledButton>;
  }

  const { seasonal } = getOngoingRecruitings(recruitingData?.items ?? []);

  // 사전등록을 받던 기수의 모집이 시작되면 사전등록 대신 리크루팅으로 보낸다
  if (seasonal) {
    return (
      <StyledButton as="button" onClick={toRecruitingList}>
        {seasonal.generation}기 리크루팅 바로가기
      </StyledButton>
    );
  }

  // 활성화된 사전등록이 있을 때만 사전등록을 받는다
  if (preRegistration) {
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

  // 기수 모집이 없으면 상시 모집만 열려 있으므로 기수 없이 안내한다
  return (
    <StyledButton as="button" onClick={toRecruitingList}>
      와플스튜디오 지원하러 가기
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  padding: 0.4rem 1.2rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  line-height: 150%;
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
