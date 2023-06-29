import { rest, RestHandler } from "msw";

const ping: RestHandler = rest.get("/ping", (req, res, ctx) =>
  res(ctx.status(200), ctx.json({ isSuccess: true, data: "pong" })),
);

export const sampleHandler = [ping];
