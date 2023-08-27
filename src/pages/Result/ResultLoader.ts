import { QueryClient } from "@tanstack/react-query";
import { getRecruitingResult } from "../../apis/recruiting";
import { LoaderReturnType } from "../../types/commonTypes";
import { createPageLoader } from "../../lib/animatedTransition/functions/createPageLoader";

export const recruitingResultQuery = (id: number) => ({
  queryKey: ["recruiting", "result", id],
  queryFn: () => getRecruitingResult(id),
  staleTime: Infinity,
});

const resultDataFetcher =
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

export const resultLoader = createPageLoader(resultDataFetcher, 500);

export type ResultLoaderReturnType = LoaderReturnType<typeof resultLoader>;
