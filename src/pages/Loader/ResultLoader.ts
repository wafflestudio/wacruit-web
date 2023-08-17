import { QueryClient } from "@tanstack/react-query";
import { getRecruitingResult } from "../../apis/recruiting";
import { LoaderReturnType } from "../../types/commonTypes";

export const recruitingResultQuery = (id: number) => ({
  queryKey: ["recruiting", "result", id],
  queryFn: () => getRecruitingResult(id),
  staleTime: Infinity,
});

export const resultLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Record<string, unknown> }) => {
    const resultQuery = recruitingResultQuery(Number(params.recruit_id));
    const cachedResult = queryClient.getQueryData<{ status: number }>(
      resultQuery.queryKey,
    );
    return {
      result:
        cachedResult !== undefined
          ? cachedResult
          : await queryClient.fetchQuery(resultQuery),
    };
  };

export type ResultLoaderReturnType = LoaderReturnType<typeof resultLoader>;
