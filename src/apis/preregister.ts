import { getRequest } from "./utility";
import type { PreRegisterResponse } from "../shared/api/types/pre-register";

export const getActivePreregisterInfo = () =>
  getRequest<PreRegisterResponse>(`/v3/pre-registrations/active`);
