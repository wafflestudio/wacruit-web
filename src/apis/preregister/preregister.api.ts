import { getRequest } from "../utility";
import type { PreRegisterResponse } from "./preregister.types";

export const getActivePreregisterInfo = () =>
  getRequest<PreRegisterResponse>(`/v3/pre-registrations/active`);
