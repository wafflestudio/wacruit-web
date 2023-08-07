import { TAnnouncement } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllAnnouncements = () =>
  getRequest<{ items: TAnnouncement[] }>("/announcements", {}, false).then(
    (res) => res.items.reverse(),
  );
