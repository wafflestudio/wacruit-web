// 값을 하드코딩하지 말고 이 스케일을 쓸 것.
// 헤더/모달보다 큰 값을 페이지 콘텐츠에 주면 그 위로 튀어나온다.
export const zIndex = {
  background: -1,
  default: 0,
  selectOptions: 1,
  heroConfetti: 2,
  heroTitle: 3,
  header: 100,
  // 모달은 헤더까지 덮어야 하므로 항상 최상단
  modal: 200,
};
