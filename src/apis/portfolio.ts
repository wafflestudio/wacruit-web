import { PortfolioFile, PortfolioLink } from "../types/apiTypes";
import { getRequest } from "./utility";

export const getPortfolioFiles = () =>
  getRequest<{ items: PortfolioFile[] }>(`/portfolios/file`);

export const getPortfolioLinks = () =>
  getRequest<{ items: PortfolioLink[] }>(`/portfolios/url`);
