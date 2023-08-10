export const filterObject = (
  targetObject: object,
  predicate: (entry: [string, any]) => boolean,
): object => {
  return Object.fromEntries(Object.entries(targetObject).filter(predicate));
};
