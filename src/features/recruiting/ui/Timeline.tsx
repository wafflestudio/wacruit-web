// import { RecruitingType } from "../../../shared/api/types/recruiting";
// import { formatPositionByEnglish } from "../lib/formatPositions";
// import { useRecruitingQuery } from "../../../entities/api/useRecruitingQuery";

// export const RecruitTimeline = () => {
//   const { useGetRecruitingTimelineInfo } = useRecruitingQuery();
//   const { data, isError } = useGetRecruitingTimelineInfo();
//   if (isError) {
//     return <div>에러 발생</div>;
//   }
//   if (data === undefined) {
//     return <div>로딩중..</div>;
//   }
//   const { items: recruitingTimelines } = data;

//   const orderedTypes: RecruitingType[] = ["ROOKIE", "PROGRAMMER", "DESIGNER"];

//   const sortedTimeline = [...recruitingTimelines].sort((a, b) => {
//     const typeCompare =
//       orderedTypes.indexOf(a.type) - orderedTypes.indexOf(b.type);
//     if (typeCompare !== 0) {
//       return typeCompare;
//     }
//     return a.info_num - b.info_num;
//   });

//   return (
//     <div>
//       <h3>모집 일정</h3>
//       {orderedTypes.map((type) => (
//         <div key={type}>
//           <h4>{formatPositionByEnglish({ position: type })}</h4>
//           <div>
//             {sortedTimeline
//               .filter((item) => item.type === type)
//               .map((item) => (
//                 <div key={item.id}>
//                   <p>{item.title}</p>
//                   <p>{item.date_info}</p>
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

import styled from "styled-components";

export const Timeline = () => {
  return (
    <TimelineContainer>
      {/* TODO: Figma 디자인에 맞춰 구현 */}
      <TimelineContent>
        <TimelineTitle>모집 일정</TimelineTitle>
        <h2>Timeline Section</h2>
        <p>모집 일정 내용이 들어갈 자리</p>
      </TimelineContent>
    </TimelineContainer>
  );
};

const TimelineContainer = styled.section`
  display: flex;
  padding: 100px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

const TimelineContent = styled.div`
  display: flex;
  max-width: 1200px;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const TimelineTitle = styled.h2`
  color: var(--black-900, #121212);
  text-align: center;

  /* 32/Bold */
  font-family: "Pretendard Variable";
  font-size: var(--fontsize-32, 32px);
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
`;
