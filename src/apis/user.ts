import { patchRequest } from "./utility.ts";
import { User, UserInvitationEmails, UserUpdate } from "../types/apiTypes.ts";
import { UserRegisterRequest } from "../types/apiTypes";
import { postRequest } from "./utility";

export const patchUser = (data: UserUpdate) => patchRequest("/users", data);
export const patchUserInvitationEmails = (data: UserInvitationEmails) =>
  patchRequest("/users/me/invitation-emails", data);

export const getUser = () => patchRequest<User>("/users", {});
export const getInvitation = () =>
  patchRequest<UserInvitationEmails>("/users/me/invitation-emails", {});

export const postUser = (data: UserRegisterRequest) =>
  postRequest(`/users`, data);
