import { createPageLoader } from "../../lib/animatedTransition/functions/createPageLoader";

export const homeLoader = createPageLoader(
  () => () => Promise.resolve({}),
  500,
);
