import { PortfolioFile, PortfolioLink } from "../types/apiTypes";
import { deleteRequest, getRequest, postRequest, putRequest } from "./utility";

export const getPortfolioFiles = () =>
  getRequest<{ items: PortfolioFile[] }>(`/portfolios/file`);

export const getPortfolioLinks = () =>
  getRequest<{ items: PortfolioLink[] }>(`/portfolios/url`);

export const postPortfolioLink = (url: string) =>
  postRequest(`/portfolios/url/?url=${url}`, {});

export const deletePortfolioLink = (linkId: number) =>
  deleteRequest(`/portfolios/url/${linkId}`, {});

export const postPortfolioFile = (fileName: string) =>
  postRequest<{ presigned_url: string }>(
    `/portfolios/file/url/upload/?file_name=${fileName}`,
    {},
  );

export const putPortfolioFileToS3 = (presignedUrl: string, file: File) =>
  putRequest(presignedUrl, file, {}, false);
