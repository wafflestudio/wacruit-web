import { getRequest, patchRequest } from "./utility.ts";
import { User, UserUpdate } from "../types/apiTypes.ts";

export const patchUser = (data: UserUpdate) => patchRequest("/users", data);
export const patchUserInvitationEmails = (data: UserUpdate) =>
  patchRequest("/users/me/invitation-emails", data);

export const getUser = () => getRequest<User>("/user");
import { UserRegisterRequest } from "../types/apiTypes";
import { postRequest } from "./utility";

export const postUser = (data: UserRegisterRequest) =>
  postRequest(`/users`, data);
