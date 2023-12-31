import { PortfolioFile, PortfolioLink } from "../types/apiTypes";
import { deleteRequest, getRequest, postRequest, putRequest } from "./utility";

export const getPortfolioFiles = (recruiting_id: number) =>
  getRequest<{ items: PortfolioFile[] }>(
    `/v2/portfolios/file?recruiting_id=${recruiting_id}`,
  );

export const getPortfolioLinks = (recruiting_id: number) =>
  getRequest<{ items: PortfolioLink[] }>(
    `/v2/portfolios/url?recruiting_id=${recruiting_id}`,
  );

export const postPortfolioLink = (url: string) =>
  postRequest(`/v2/portfolios/url`, {
    url,
  });

export const putPortfolioLink = (linkId: number, url: string) =>
  putRequest(`/v2/portfolios/url/${linkId}`, {
    url,
  });

export const deletePortfolioLink = (linkId: number) =>
  deleteRequest(`/v2/portfolios/url/${linkId}`, {});

export const postPortfolioFile = (fileName: string) =>
  getRequest<{ presigned_url: string; fields: object }>(
    `/v2/portfolios/file/url/upload?file_name=${fileName}`,
  );
export const downloadPortfolioFile = (fileName: string) =>
  getRequest<{
    object_name: string;
    presigned_url: string;
    fields: object | null;
  }>(`/v2/portfolios/file/url/download?file_name=${fileName}`);
export const deletePortfolioFile = (fileName: string) =>
  deleteRequest(`/v2/portfolios/file/delete?file_name=${fileName}`, {});

export const uploadPortfolioFileToS3 = (
  presignedUrl: string,
  data: object,
  file: File,
) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key as keyof typeof data]);
  }
  formData.append("file", file);
  return fetch(presignedUrl, {
    method: "POST",
    body: formData,
  });
};
