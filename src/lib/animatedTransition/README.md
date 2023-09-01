# Animated Transition

제작 & 유지보수: @[designDefined](https://github.com/designDefined)
열심히 고쳐서 publish 해보겠습니다!

## 목차

- [사용 방법](#사용-방법)
- [주의사항](#주의사항)

## 사용 방법

페이지 이동 시 사용할 api를 콜하면서, 동시에 전환 애니메이션을 넣고 싶다면 다음과 같이 작업하시면 됩니다.
작업의 전체 순서는 다음과 같습니다.

1. [dataLoader 함수 정의하기](#1-dataloader-함수-정의하기)
2. [compositeLoader 생성하기](#2-compositeloader-생성하기)
3. [usePageData로 데이터 가져오기](#3-usepagedata로-데이터-가져오기)
4. [페이지/컴포넌트 별 애니메이션 정의하기](#4-페이지컴포넌트-별-애니메이션-정의하기)
5. [usePageAnimation으로 애니메이션 적용하기](#5-usepageanimation으로-애니메이션-적용하기)

---

### 1. dataLoader 함수 정의하기

PageDataLoader 타입을 이용하여 api 데이터를 가져오는 함수를 정의하세요. queryClient와 react-router-dom의 loader에서 사용하는 인자 등을 받아 객체 Promise를 리턴하는 함수입니다.
react-query와 함께 사용하기 위해 dataLoader에서는 단순 fetch가 아니라 queryFunction을 이용해 데이터를 가져오는 것이 권장됩니다.

```typescript
// result page의 예시

// react-query를 이용할 것이기 때문에 queryFunction을 작성.
export const recruitingResultQuery = (id: number) => ({
  queryKey: ["recruiting", "result", id],
  queryFn: () => getRecruitingResult(id),
  staleTime: Infinity, // cacheTime, staleTime 등을 적절하게 작성
});

// PageDataLoader 타입의 함수 작성
const resultDataLoader: PageDataLoader<{ result: { status: number } }> =
  // queryClient는 react-query를 사용하기 위해 필요하다.
  // main.tsx에서 주입한다.


    (queryClient) =>
    async ({ params }) => {
      // api를 가져올 query를 생성한다.
      const resultQuery = recruitingResultQuery(Number(params.recruit_id));
      // query에서 cache된 데이터가 있는 지 확인하여 가져온다.
      // 같은 페이지로 재진입할 때 유효한 cache가 있다면 데이터를 다시 가져오지 않는다.
      const cachedResult = queryClient.getQueryData<{ status: number }>(
        resultQuery.queryKey,
      );

      // 객체로 리턴
      return {
        result:
          // cache가 없다면 fethQuery 함수로 데이터를 가져와 react-query에 저장하면서 리턴한다.
          cachedResult !== undefined
            ? cachedResult
            : await queryClient.fetchQuery(resultQuery),
      };
    };
```

react-query를 사용하고 싶지 않을 경우, queryClient를 이용하지 않고 단순한 fetch 함수로 데이터를 불러와도 상관 없습니다. 또, 가져올 데이터가 없는 경우, 빈 dataLoader 함수를 이용해도 상관 없습니다.

```typescript
// home page에서 빈 dataLoader를 이용하는 예시
export const homeLoader = createCompositeLoader(
  () => () => Promise.resolve({}), // 아무 내용이 없는 dataLoader 함수
);
```

### 2. compositeLoader 생성하기

compositeLoader는 dataLoader에 애니메이션 관련 기능을 넣어주는 함수입니다. dataLoader와 animation 관련 config를 인자로 받습니다.

```typescript
export const someLoader = createCompositeLoader(dataLoader, {
  transitionType: "phased", // 전환 애니메이션의 타입. 현재는 phased만 지원
  duration: 1000, // 애니메이션의 지속시간(ms). 기본값은 500.
});
```

생성된 loader는 `main.tsx`의 browerRouter에 넣어주셔야 합니다. 이 때 queryClient를 주입하면 됩니다.

```typescript
// 브라우저 라우터의 일부
{
  path: "",
  element: <Home />,
  loader: homeLoader(queryClient),
  ...
},
```

### 3. usePageData로 데이터 가져오기

dataLoader에서 가져온 값은 `usePageData` hook으로 접근할 수 있습니다. 이 때 pageData는 `Promise`가 아니라 마치 awaited된 값처럼 늘 존재하게 되므로, 별도의 상태 처리 없이 사용하거나 useQuery의 initialData로 사용할 수 있습니다.

usePageData는 어떤 로더에서 데이터를 가져오는 지 알 수 없기 때문에 타입을 반드시 직접 지정해주어야 합니다. 로더에서 타입을 안전하게 가져오기 위해서는 아래의 방법을 사용하시기 바랍니다.

```typescript
// 반환할 데이터 타입을 PageDataLoader의 제네릭으로 명시
const someDataLoader: PageDataLoader<반환할 데이터 타입> =
  (queryClient) =>
  async () => {
    ...
    return {
      ...
    };
  };

// compositeLoader 생성
export const someCompositeLoader = createCompositeLoader(someDataLoader);

// LoaderReturnType을 이용하여 compositeLoader에서 타입을 추출
export type SomeLoaderReturnType = LoaderReturnType<typeof someCompositeLoader>;


//page에서 사용
export function Page () {
  const initialData = usePageData<SomeLoaderReturnType>()
  ...
}
```

pageData는 보통 dataLoader와 동일한 query 함수를 이용하는 `useQuery` 훅의 initialData 값으로 이용됩니다. 이 경우 react-query의 status는 `loading`이 되지 않으므로, 불필요한 분기 처리나 로딩 스피너를 사용할 필요가 없어집니다.

**주의**
굳이 페이지 최상단이 아니라, 어떤 컴포넌트에서든 usePageData를 사용할 수 있습니다. 그러나 해당 컴포넌트가 복수의 페이지에서 마운트되는 경우, usePageData가 반환하는 값이 달라질 수 있으니 타입 처리에 주의를 요합니다.

### 4. 페이지/컴포넌트 별 애니메이션 정의하기

페이지 전환 애니메이션은 어디에 정의할까요? 페이지 별로 하나의 dataLoader가 사용되는 것과 달리, 애니메이션은 컴포넌트마다 상이할 수 있으므로 여러 개를 정의할 수 있습니다. 따라서 이를 사용하는 컴포넌트에 인접하게 정의하거나, 하나의 페이지에서 사용하는 모든 애니메이션을 한 번에 정의하는 것을 추천합니다.

애니메이션은 styled-components의 `css(RuleSet 타입)` 요소로 생성됩니다. 페이지 전환의 상태나 목적지에 따라 적절한 애니메이션을 생성하는 함수를 `animator`라고 하겠습니다.

animator는 Animator 타입을 import하여 생성할 수 있습니다.

```typescript
// 간단한 animator의 예시

// keyframes 생성
export const [increaseOpacity, decreaseOpacity] = createAlternateKeyframes(
  `opacity: 0;`,
  `opacity: 1;`,
);

// keyframes를 이용하여 animator 생성
export const commonOpacityAnimator: Animator = ({
  duration,
  animationStatus,
}) => css`
  ${createAnimationSetup(duration)}
  animation-name: ${animationStatus === "unmount"
    ? decreaseOpacity
    : increaseOpacity};
`;
```

다음과 같은 함수들은 애니메이션 생성을 쉽게 해주는 함수들로, 굳이 이를 사용하지 않고 일반적인 css animation을 정의하는 것과 동일하게 작성해도 상관 없습니다.

- createAnimationSetup: duration, timingFunction, fillMode 등을 입력하여 `animation-name`을 제외한 다른 css 속성들을 축약하여 생성하는 함수입니다.
- createAlternateKeyframes: css 속성 문자열 두 개를 받아, `from - to`의 속성이 서로 반대인 css keyframes 2개를 생성합니다.

animator를 생성할 때는 다음과 같은 인자를 사용할 수 있습니다.

- animationStatus: "mount" 또는 "unmount". 컴포넌트가 사라지는 중인지 생성되는 중인지 표시.
- url: 이동 중인 페이지의 주소. new URL 객체입니다.
- params: react-router-dom이 인식한 이동 주소의 패러미터.
- duration: compositeLoader에서 정의한 애니메이션의 지속 시간.

이를 응용하면 다음과 같은 애니메이션을 복잡한 애니메이션을 작성할 수도 있습니다.

```typescript
// dashboardAnimation의 예시

// 카드가 mount | unmount할 때의 keyframes 먼저 생성
const cardKeyframes = createAlternateKeyframes(
  `transform: translate(0, 100%); opacity: 0;`,
  `transform: translate(0, 0); opacity: 1;`,
);

// 카드가 선택되었을 때의 keyframes
const selectedCardKeyframes = keyframes`
from { transform: translateY(-10px) }
to { transform: translateY(-50%) } 
`;

export const progressCardAnimator =
  // 각각의 카드에서, index와 pathname을 받아 animator를 생성하는 함수.


    (index: number, pathname?: string): Animator =>
    ({ url, duration, animationStatus }) => {
      // 특정 카드가 클릭되었을 경우, 해당 카드에 선언된 pathname과 이동 중인 url의 뒷부분이 일치할 것
      // 따라서 클릭 된 카드에만 다른 전환 효과를 적용합니다.
      if (pathname && url.pathname.endsWith(pathname)) {
        return css`
          ${createAnimationSetup(duration)}
          animation-name: ${selectedCardKeyframes}
        `;
      }

      // animationStatus로 분기를 주어 mount/unmount 때마다 반대 방향의 애니메이션이 작동하게 한다.
      // animation-delay를 카드의 index에 따라 다르게 적용하여 물결 효과를 구현.
      return css`
        ${createAnimationSetup(duration, "backwards")}
        animation-delay: ${index / 10}s;
        animation-name: ${animationStatus === "unmount"
          ? cardKeyframes[1]
          : cardKeyframes[0]};
      `;
    };
```

### 5. usePageAnimation으로 애니메이션 적용하기

애니메이션 적용은 usePageAnimation 훅을 이용합니다. 적용이 필요한 컴포넌트마다 해당 훅을 선언하고, 적절한 애니메이터를 인자로 넣어주시면 됩니다.

```typescript
// Dashboard.tsx 내부
const animation = usePageAnimation(dashboardMainAnimator);
```

훅이 반환하는 값은 styled-components의 CSS Ruleset이므로, styled-components의 props 기능으로 적용시켜주시면 됩니다. 정확한 타입 처리를 위해 반환값의 타입은 stlyed-components에 동봉된 `RuleSet`으로 지정할 수 있습니다.

```tsx
function Dashboard() {
  // dashboardMainAnimator는 컴포넌트 파일 외부에 정의!
  const animation = usePageAnimation(dashboardMainAnimator);
  return <Main $transitionAnimation={animation}>...</Main>;
}

// transitionAnimation의 타입은 RuleSet
const Main = styled.main<{
  $transitionAnimation: RuleSet;
}>`
  ...적용할 css 속성들
  ${(props) => props.$transitionAnimation};
`;
```

단순히 컴포넌트의 투명도만이 변화하는 애니메이션을 적용하고자 하거나, 테스트를 위해 사용할 간단한 애니메이션이 필요하다면 미리 정의된 **common 애니메이터**를 사용하세요.

```tsx
// 샘플로 이용할 수 있는 commonOpacityAnimator
const animation = usePageAnimation(commonOpacityAnimator);
```

---

## 주의사항

라이브러리는 아직 미완성입니다. 사용하시면서 다음과 같은 점들을 주의하시기 바랍니다. 또, 이런 부분들을 개선할 아이디어가 있다면 건의해주시면 감사하겠습니다!

**duration의 의미**
compositeLoader에서 정의하는 duration은 **로더의 최소 로딩 시간**을 결정합니다. 따라서 animator가 반환하는 애니메이션의 지속시간이 이보다 짧을 수는 있지만, 더 길게 되면 **애니메이션이 중간에 잘릴 수 있습니다.** 따라서 가능하면 동일한 duration을 사용하길 추천드리고, 이는 애니메이터의 duration 인자를 `createAnimationSetup()` 함수에 그대로 전달함으로써 간단히 구현할 수 있습니다.

**duration보다 fetch가 오래 걸릴 경우**
duration보다 dataLoader의 fetch 작업이 오래 걸릴 경우, 화면은 unmount 애니메이션의 마지막 키프레임인 상태로 지속되게 됩니다(fetch가 끝나야 mount 애니메이션이 작동합니다.) 따라서 데이터 fetch가 너무 오래 걸릴 것 같다면 일반적인 useQuery를 사용하는 것처럼 로딩 스피너를 이용하거나, unmount 애니메이션의 마무리가 스피너로 이어지게 구성할 수 있습니다.

**animation-fill-mode로 인한 오류**
animationStatus의 특성 상 `mounting`과 `mounted` 상태가 구분되지 않기 때문에, 항상 `mount` 상태에 해당하는 애니메이션이 컴포넌트에 적용 중이게 됩니다. 이 때 `animation-fill-mode`가 `forward`나 `both`로 되어 있을 경우, 마지막 keyframe에서 적용한 css 속성이 항상 컴포넌트 자체의 css 속성을 덮어쓰게 됩니다. 여기에서 예상하지 못한 css 오류가 발생할 수 있으니 주의 바랍니다.
가능하면 animationStatus를 개선할 생각이 있으나, 현재는 animator의 코드를 최대한 간단하게 만들기 위해 이렇게 구현해두었습니다.

**애니메이션 중에 navigate**
animation 중에 다른 페이지 이동 요청을 보낸다면: 마지막 요청이 항상 반영되게 됩니다. 이 과정에서 애니메이션이 이상하게 작동할 수 있습니다.
이를 방지하고자 한다면 animator에서 "unmount" 상태일 때의 css 코드에 클릭 방지 속성을 추가하세요!
