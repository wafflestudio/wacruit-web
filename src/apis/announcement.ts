import { TAnnouncement } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllAnnouncements = () =>
  getRequest<{ items: TAnnouncement[] }>("/announcements/", {}, false).then(
    (res) => res.items.reverse(),
  );

export const getPinnedAnnouncements = () =>
  getRequest<{ items: TAnnouncement[] }>(
    "/announcements/pinned",
    {},
    false,
  ).then((res) => res.items);
