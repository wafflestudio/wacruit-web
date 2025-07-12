import styled from "styled-components";
import { Hero } from "../features/recruiting/ui/Hero";
import { ApplicantRequirements } from "../features/recruiting/ui/ApplicantRequirements";
import { Positions } from "../features/recruiting/ui/Positions";
import { RecruitTimeline } from "../features/recruiting/ui/Timeline";

const RecruitInfoV2 = () => {
  return (
    <MainContainer>
      <Hero />
      <ApplicantRequirements />
      <Positions />
      <RecruitTimeline />
    </MainContainer>
  );
};

const MainContainer = styled.main`
  min-width: "92.0rem";
`;

export default RecruitInfoV2;
