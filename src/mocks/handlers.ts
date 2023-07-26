import { RestHandler } from "msw";
import { sampleHandler } from "./handler/sampleHandler";
import { userHandler } from "./handler/userHandler";
import { recruitingHandler } from "./handler/recruitingHandler";
import { problemHandler } from "./handler/problemHandler";
import { resumeHandler } from "./handler/resumeHandler";

export const handlers: RestHandler[] = [
  ...sampleHandler,
  ...userHandler,
  ...recruitingHandler,
  ...problemHandler,
  ...resumeHandler,
];
