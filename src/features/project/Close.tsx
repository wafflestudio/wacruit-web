import styled from "styled-components";
import { useRouteNavigation } from "@/shared/routes/useRouteNavigation";

export default function Close() {
  const { toProjectList } = useRouteNavigation();
  return (
    <CloseBar onClick={toProjectList}>
      <Icon src="/icon/close.svg" alt="닫기" />
    </CloseBar>
  );
}

const CloseBar = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 5rem;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  background: var(--green, #00cd48);
  cursor: pointer;
`;

const Icon = styled.img`
  width: 2.2944rem;
  height: 2.2944rem;
  flex-shrink: 0;
  aspect-ratio: 22.94/22.94;
`;
