import { RestHandler, rest } from "msw";
import {
  getAllMockRecruitings,
  getMockRecruiting,
  toMockRecruitingItem,
} from "../db/recruiting";

const allRecruitings: RestHandler = rest.get(
  "/recruitings",
  (req, res, ctx) => {
    const data = getAllMockRecruitings().map(toMockRecruitingItem);
    return res(ctx.status(200), ctx.delay(), ctx.json(data));
  },
);

const recruiting: RestHandler = rest.get(
  "/recruitings/:recruiting_id",
  (req, res, ctx) => {
    const id = req.params.recruiting_id;
    const data = getMockRecruiting(Number(id));
    if (data === undefined) return res(ctx.status(404));
    return res(ctx.status(200), ctx.delay(), ctx.json(data));
  },
);

export const recruitingHandler = [allRecruitings, recruiting];
