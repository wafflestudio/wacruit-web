export function unreachable(x: never) {
  throw new Error("Unexpected object: " + x);
}
