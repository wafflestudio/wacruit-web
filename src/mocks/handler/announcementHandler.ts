import { RestHandler, rest } from "msw";
import { getMockAnnouncements } from "../db/announcement";

const announcements: RestHandler = rest.get("/announcements", (req, res, ctx) =>
  res(ctx.status(200), ctx.delay(), ctx.json(getMockAnnouncements())),
);

export const announcementHandler = [announcements];
