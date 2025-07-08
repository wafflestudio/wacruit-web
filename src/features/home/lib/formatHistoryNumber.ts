export const formatUserCount = ({ count }: { count: number }): string => {
  if (count < 1_000) {
    return `${count}명`;
  } else if (count < 10_000) {
    const thousands = Math.floor(count / 1_000);
    return `${thousands}천명`;
  } else if (count < 100_000) {
    const man = Math.floor(count / 10_000);
    return `${man}만명`;
  } else if (count < 10_000_000) {
    const million = Math.floor(count / 100_000);
    return `${million}백만명`;
  } else if (count <= 100_000_000) {
    const tenMillion = Math.floor(count / 10_000_000);
    return `${tenMillion}천만명`;
  } else {
    return `${count.toLocaleString()}명`;
  }
};
