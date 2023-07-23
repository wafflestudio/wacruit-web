import { RestHandler } from "msw";
import { sampleHandler } from "./handler/sampleHandler";
import { userHandler } from "./handler/userHandler";
import { HomeHandler } from "./handler/homeHandler";

export const handlers: RestHandler[] = [
  ...sampleHandler,
  ...userHandler,
  ...HomeHandler,
];
