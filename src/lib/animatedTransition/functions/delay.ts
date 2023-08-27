let isInitialDelay = true;
let lastTimeoutId: null | number = null;

export const setDelay = (ms: number, value: unknown = null): Promise<true> =>
  new Promise((resolve) => {
    // clear previous timeout
    if (lastTimeoutId !== null) clearTimeout(lastTimeoutId);

    // set delay to 0 if it's initial
    const delay = isInitialDelay ? 0 : ms;
    if (isInitialDelay) {
      isInitialDelay = false;
    }

    // set new timeout
    lastTimeoutId = setTimeout(
      () => {
        resolve(true);
      },
      delay,
      value,
    );
  });
