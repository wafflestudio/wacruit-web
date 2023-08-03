import { QueryClient } from "@tanstack/react-query";
import { getRecruitingById } from "../../apis/recruiting";
import { Recruiting } from "../../types/apiTypes";
import { LoaderReturnType } from "../../types/commonTypes";

export const recruitingDetailQuery = (id: number) => ({
  queryKey: ["recruiting", "detail", id],
  queryFn: () => getRecruitingById(id),
  staleTime: 1000 * 60 * 60,
});

export const dashboardLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Record<string, unknown> }) => {
    const query = recruitingDetailQuery(Number(params.recruit_id));
    const cached = queryClient.getQueryData<Recruiting>(query.queryKey);
    return cached !== undefined ? cached : await queryClient.fetchQuery(query);
  };

export type DashboardLoaderReturnType = LoaderReturnType<
  typeof dashboardLoader
>;
