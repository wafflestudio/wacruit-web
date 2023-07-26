import { RestHandler } from "msw";
import { sampleHandler } from "./handler/sampleHandler";
import { userHandler } from "./handler/userHandler";
import { recruitingHandler } from "./handler/recruitingHandler";
import { problemHandler } from "./handler/problemHandler";

export const handlers: RestHandler[] = [
  ...sampleHandler,
  ...userHandler,
  ...recruitingHandler,
  ...problemHandler,
];
