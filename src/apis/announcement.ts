import { TAnnouncement } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllAnnouncements = () =>
  getRequest<{ items: TAnnouncement[] }>("/v1/announcements", {}, false).then(
    (res) => res.items.reverse(),
  );

export const getPinnedAnnouncements = () =>
  getRequest<{ items: TAnnouncement[] }>(
    "/v1/announcements/pinned",
    {},
    false,
  ).then((res) => res.items);
