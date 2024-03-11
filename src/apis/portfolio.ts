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

export const postPortfolioLink = (url: string, recruiting_id: number) =>
  postRequest(`/v2/portfolios/url`, {
    url,
    recruiting_id,
  });

export const putPortfolioLink = (
  linkId: number,
  url: string,
  recruiting_id: number,
) =>
  putRequest(`/v2/portfolios/url/${linkId}`, {
    url,
    recruiting_id,
  });

export const deletePortfolioLink = (linkId: number) =>
  deleteRequest(`/v2/portfolios/url/${linkId}`, {});

export const postPortfolioFile = (targetFile: File, recruiting_id: number) =>
  postRequest<{
    presigned_url: string;
    fields: object;
    portfolio_file_id: number;
  }>(`/v2/portfolios/file/url/upload`, {
    recruiting_id,
    file_name: targetFile.name,
  })
    .then(({ presigned_url, fields, portfolio_file_id }) =>
      uploadPortfolioFileToS3(presigned_url, fields, targetFile).then(() =>
        Promise.resolve(portfolio_file_id),
      ),
    )
    .then((id) =>
      notifyOnPortfolioFileUpload(id).then(() => Promise.resolve(id)),
    );

export const downloadPortfolioFile = (id: number) =>
  getRequest<{
    object_name: string;
    presigned_url: string;
    fields: object | null;
  }>(`/v2/portfolios/file/url/download/${id}`).then(
    ({ object_name, presigned_url }) => {
      /**
       * @TODO 정말 이 방법 밖에는 없는가?
       */
      const link = document.createElement("a");
      link.href = presigned_url;
      link.setAttribute("download", `${object_name}`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    },
  );

export const deletePortfolioFile = (id: number) =>
  deleteRequest(`/v2/portfolios/file/delete/${id}`, {});

const notifyOnPortfolioFileUpload = (id: number) =>
  getRequest(`/v2/portfolios/file/url/check-upload-completed/${id}`);

const uploadPortfolioFileToS3 = (
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
