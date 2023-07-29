import { TAnnouncement } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getAllAnnouncements = () =>
  getRequest<TAnnouncement[]>("/announcements");
