// import { RecruitingCTAButton } from "../../../shared/ui/button/RecruitingCTAButton";

import styled from "styled-components";

export const Hero = () => {
  return (
    <HeroContainer>
      {/* TODO: 다음 주에 UI 구현 예정 */}
      <h1>Hero Section</h1>
      <p>임시 텍스트</p>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  display: flex;
  min-height: 100vh;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  background: var(--brown, #876e00);
`;

// export const Hero = () => {
//   return (
//     <section>
//       <div>
//         <div>
//           <h1>함께 만들고 성장할 개발자를 찾습니다.</h1>
//           <div>
//             <span>
//               서울대학교 최대 규모의 개발 동아리, 와플스튜디오에서 신규 회원을
//               모집합니다.
//             </span>
//             <span>
//               세미나와 프로젝트를 통해 실력있는 개발자로 성장해보세요.
//             </span>
//           </div>
//         </div>
//         <RecruitingCTAButton />
//       </div>
//     </section>
//   );
// };
