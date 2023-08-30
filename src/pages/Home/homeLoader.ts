import { createCompositeLoader } from "../../lib/animatedTransition/functions/createCompositeLoader";

export const homeLoader = createCompositeLoader(
  () => () => Promise.resolve({}),
);
