export const setDelay = (ms: number, value: unknown = null): Promise<true> =>
  new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(true);
      },
      ms,
      value,
    );
  });
