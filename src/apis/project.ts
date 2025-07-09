import { getRequest } from "./utility";
import { BreifProjectList } from "../shared/api/types/project";

// V1
export const getProjects = ({
  queryParams,
}: {
  queryParams?: { offset: number; limit: number };
}) =>
  getRequest<BreifProjectList>(
    `/v3/pre-registrations/active/?${
      queryParams?.offset !== undefined ? `offset=${queryParams.offset}` : ""
    }&${queryParams?.limit !== undefined ? `limit=${queryParams.limit}` : ""}`,
  );
