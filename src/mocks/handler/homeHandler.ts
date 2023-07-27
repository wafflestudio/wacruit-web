import { rest, RestHandler } from "msw";
import { MockApplyNumber } from "../types/types";

/**
 * ! Deprecated
 */

const apply: RestHandler = rest.get("/apply/number", (req, res, ctx) => {
  const response: MockApplyNumber = {
    rookie: Math.floor(Math.random() * 100),
    designer: Math.floor(Math.random() * 100),
  };
  return res(ctx.status(200), ctx.delay(), ctx.json(response));
});

export const HomeHandler = [apply];
