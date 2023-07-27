import { RestHandler } from "msw";
import { sampleHandler } from "./handler/sampleHandler";
import { userHandler } from "./handler/userHandler";
import { HomeHandler } from "./handler/homeHandler";
import { recruitingHandler } from "./handler/recruitingHandler";
import { problemHandler } from "./handler/problemHandler";
import { resumeHandler } from "./handler/resumeHandler";
import { announcementHandler } from "./handler/announcementHandler";

export const handlers: RestHandler[] = [
  ...sampleHandler,
  ...HomeHandler,
  ...userHandler,
  ...recruitingHandler,
  ...problemHandler,
  ...resumeHandler,
  ...announcementHandler,
];
