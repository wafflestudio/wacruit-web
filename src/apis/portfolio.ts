import { PortfolioFile, PortfolioLink } from "../types/apiTypes";
import { deleteRequest, getRequest, postRequest } from "./utility";

export const getPortfolioFiles = () =>
  getRequest<{ items: PortfolioFile[] }>(`/portfolios/file`);

export const getPortfolioLinks = () =>
  getRequest<{ items: PortfolioLink[] }>(`/portfolios/url`);

export const postPortfolioLink = (url: string) =>
  postRequest(`/portfolios/url/?url=${url}`, {});

export const deletePortfolioLink = (linkId: number) =>
  deleteRequest(`/portfolios/url/${linkId}`, {});

export const postPortfolioFile = (fileName: string) =>
  getRequest<{ presigned_url: string; fields: object }>(
    `/portfolios/file/url/upload/?file_name=${fileName}`,
  );
export const downloadPortfolioFile = (fileName: string) =>
  getRequest<{
    object_name: string;
    presigned_url: string;
    fields: object | null;
  }>(`/portfolios/file/url/download/?file_name=${fileName}`);
export const deletePortfolioFile = (fileName: string) =>
  deleteRequest(`/portfolios/file/delete/?file_name=${fileName}`, {});

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
  fetch(presignedUrl, {
    method: "POST",
    body: formData,
  });
};
