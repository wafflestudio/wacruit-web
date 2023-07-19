import { RestHandler } from "msw";
import { sampleHandler } from "./handler/sampleHandler";
import { userHandler } from "./handler/userHandler";

export const handlers: RestHandler[] = [...sampleHandler, ...userHandler];
