import Headerv2 from "@/shared/ui/header/HeaderV2";
import MemberGrid from "@/features/member/MemberGrid";
import styled from "styled-components";

export default function Project() {
  return (
    <div>
      <Headerv2 />
      <MainContainer>
        <MemberGrid />
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
`;
