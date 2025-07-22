import Headerv2 from "@/shared/ui/header/HeaderV2";
import Close from "@/features/project/Close";
import ProjectDetailBody from "@/features/project/ProjectDetailBody";
import styled from "styled-components";

export default function Project() {
  return (
    <div>
      <Headerv2 />
      <MainContainer>
        <ProjectDetailBody />
      </MainContainer>
      <Close />
    </div>
  );
}

const MainContainer = styled.main`
  min-width: "92.0rem";
`;
