let isInitialDelay = true;
let lastTimeoutId: null | number | NodeJS.Timeout = null;

/**
 * unmount 애니메이션을 위해 필요한 최소 Delay를 loader에 전달하는 함수입니다.
 * 웹사이트에 접근한 후의 첫 번째 타이머의 경우 unmount 애니메이션이 없으므로 0ms로 설정합니다.
 * @param delayTime 애니메이션이 지속되어야 할 최소 Delay (ms 단위)
 * @param value 딜레이 타이머가 끝나고 반환할 값 (기본값 = true)
 *
 */
export const setDelay = (
  delayTime: number,
  value: unknown = true,
): Promise<unknown> =>
  new Promise((resolve) => {
    // clear previous timeout
    if (lastTimeoutId !== null) clearTimeout(lastTimeoutId);

    // set delay to 0 if it's initial
    const delay = isInitialDelay ? 0 : delayTime;
    if (isInitialDelay) {
      isInitialDelay = false;
    }

    // set new timeout
    lastTimeoutId = setTimeout(() => {
      resolve(value);
    }, delay);
  });
