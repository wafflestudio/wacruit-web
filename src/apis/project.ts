import { getRequest } from "./utility";
import { BreifProjectList } from "../shared/api/types/project";
import { encodeQueryParams } from "./utility";

export const getProjects = ({
  queryParams,
}: {
  queryParams?: { offset: number; limit: number };
}) => {
  if (queryParams === undefined) {
    return getRequest<BreifProjectList>(`/v3/projects`);
  }
  const query = encodeQueryParams({ params: queryParams });
  return getRequest<BreifProjectList>(`/v3/projects/?${query}`);
};
