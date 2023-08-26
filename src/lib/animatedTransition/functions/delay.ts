let lastTimeoutId: null | number = null;
export const setDelay = (ms: number, value: unknown = null): Promise<true> =>
  new Promise((resolve) => {
    if (lastTimeoutId !== null) clearTimeout(lastTimeoutId);
    lastTimeoutId = setTimeout(
      () => {
        resolve(true);
      },
      ms,
      value,
    );
  });
