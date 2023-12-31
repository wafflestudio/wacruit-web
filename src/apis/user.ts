import { patchRequest } from "./utility.ts";
import { User, UserInvitationEmails, UserUpdate } from "../types/apiTypes.ts";
import { UserRegisterRequest } from "../types/apiTypes";
import { postRequest } from "./utility";

export const patchUser = (data: UserUpdate) => patchRequest("/v1/users", data);
export const patchUserInvitationEmails = (data: UserInvitationEmails) =>
  patchRequest("/v1/users/me/invitation-emails", data);

export const getUser = () => patchRequest<User>("/v1/users", {});
export const getInvitation = () =>
  patchRequest<UserInvitationEmails>("/v1/users/me/invitation-emails", {});

export const postUser = (data: UserRegisterRequest) =>
  postRequest(`/v1/users`, data);
