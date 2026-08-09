import { getRequest, postRequest } from "../utility";
import type {
  PreRegisterResponse,
  PreRegisterUserCreate,
  PreRegisterUserResponse,
} from "./preregister.types";

// 활성화된 사전등록이 없으면 404가 내려오므로 null로 변환한다
export const getActivePreregisterInfo = async () => {
  try {
    return await getRequest<PreRegisterResponse>(
      `/v3/pre-registration/active`,
      {},
      false,
    );
  } catch (error) {
    if (error instanceof Response && error.status === 404) {
      return null;
    }
    throw error;
  }
};

export const postPreregisterUser = (user: PreRegisterUserCreate) =>
  postRequest<PreRegisterUserResponse>(
    `/v3/pre-registration/users`,
    user,
    {},
    false,
  );
