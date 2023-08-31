import { css, keyframes } from "styled-components";

/**
 * 애니메이션 관련하여 중복되는 css 코드를 간단하게 생성하는 함수 모음
 */

/**
 * 애니메이션 관련 css 속성을 설정하는 함수입니다. `keyframes`는 css의 `animation-name:` 속성으로 따로 넣어주어야 합니다.
 *
 * @param ms 애니메이션의 지속시간 (ms 단위)
 * @param timingFunction animation-timing-function의 타이밍 함수 (기본값 = "ease")
 * @returns styled-components의 tagged template literal 안에 넣어 사용 가능한 css 문자열
 */
export const createAnimationSetup = (
  ms: number,
  fillMode: "both" | "backwards" | "forwards" | "none" = "both",
  timingFunction = "ease",
) => css`
  animation-fill-mode: ${fillMode};
  animation-duration: ${ms / 1000}s;
  animation-timing-function: ${timingFunction};
`;

/**
 * keyframes 안에 들어갈 속성 두 개를 받아 keyframes의 배열을 생성합니다.
 *
 * @param start 애니메이션 시작 시점의 css 속성
 * @param end 애니메이션 종료 시점의 css 속성
 *
 * @returns keyframes 두 개의 배열. 첫 번째는 start -> end, 두 번째는 end -> start 애니메이션입니다.
 */
export const createAlternateKeyframes = (start: string, end: string) => [
  keyframes`from { ${start} } to { ${end} }`,
  keyframes`from { ${end} } to { ${start} }`,
];
