import { patchRequest, postRequest } from "../utility";
import {
  User,
  UserInvitationEmails,
  UserUpdate,
  UserRegisterRequest,
} from "./user.types";

export const patchUser = (data: UserUpdate) => patchRequest("/v1/users", data);
export const patchUserInvitationEmails = (data: UserInvitationEmails) =>
  patchRequest("/v1/users/me/invitation-emails", data);

export const getUser = () => patchRequest<User>("/v1/users", {});
export const getInvitation = () =>
  patchRequest<UserInvitationEmails>("/v1/users/me/invitation-emails", {});

export const postUser = (data: UserRegisterRequest) =>
  postRequest<User>(`/v1/users`, data, {}, false);
