import { getRequest, patchRequest, postRequest } from "../utility";
import type {
  PreRegisterEmailSend,
  PreRegisterEmailSendResponse,
  PreRegisterListResponse,
  PreRegisterResponse,
  PreRegisterUpdate,
  PreRegisterUserCreate,
  PreRegisterUserListParams,
  PreRegisterUserListResponse,
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

// 관리자 전용
export const getPreregisterList = () =>
  getRequest<PreRegisterListResponse>(`/v3/pre-registration`);

export const getPreregisterUsers = ({
  pre_registration_id,
  limit,
  offset,
}: PreRegisterUserListParams) =>
  getRequest<PreRegisterUserListResponse>(
    `/v3/pre-registration/users?pre_registration_id=${pre_registration_id}&limit=${limit}&offset=${offset}`,
  );

export const patchPreregister = ({
  id,
  body,
}: {
  id: PreRegisterResponse["id"];
  body: PreRegisterUpdate;
}) => patchRequest<PreRegisterResponse>(`/v3/pre-registration/${id}`, body);

export const postPreregisterEmail = (body: PreRegisterEmailSend) =>
  postRequest<PreRegisterEmailSendResponse>(
    `/v3/pre-registration/users/email`,
    body,
  );
