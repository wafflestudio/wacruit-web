import { getRequest, patchRequest } from "./utility.ts";
import { User, UserUpdate } from "../types/apiTypes.ts";

export const patchUser = (data: UserUpdate) => patchRequest("/users/me", data);
export const getUser = () => getRequest<User>("/users/me");