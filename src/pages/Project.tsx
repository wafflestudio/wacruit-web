import Headerv2 from "@/shared/ui/header/HeaderV2";
import ProjectGrid from "@/features/project/ProjectGrid";
import styled from "styled-components";

export default function Project() {
  return (
    <div>
      <Headerv2 />
      <MainContainer>
        <ProjectGrid />
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  min-width: "92.0rem";
`;
