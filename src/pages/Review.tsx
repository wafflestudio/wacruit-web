import Headerv2 from "@/shared/ui/header/HeaderV2";
import ReviewGrid from "@/features/review/ReviewGrid";
import styled from "styled-components";

export default function Project() {
  return (
    <div>
      <Headerv2 />
      <MainContainer>
        <ReviewGrid />
      </MainContainer>
    </div>
  );
}

const MainContainer = styled.main`
  min-width: "92.0rem";
  display: flex;
  justify-content: center;
`;
