import Headerv2 from "../components/home/Header/HeaderV2";
import styled from "styled-components";

export default function HomeV2() {
  return (
    <>
      <Headerv2 />
      <MainContainer></MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  minwidth: "92.0rem";
`;
