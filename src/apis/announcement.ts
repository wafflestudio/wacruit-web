import { Announcement } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllAnnouncements = () =>
  getRequest<Announcement[]>("/announcements");
