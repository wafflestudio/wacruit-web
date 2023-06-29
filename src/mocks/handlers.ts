import { RestHandler } from "msw";
import { sampleHandler } from "./handler/sampleHandler";

export const handlers: RestHandler[] = [...sampleHandler];
