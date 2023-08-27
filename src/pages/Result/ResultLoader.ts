import { getRecruitingResult } from "../../apis/recruiting";
import { LoaderReturnType } from "../../types/commonTypes";
import {
  PageDataFetcher,
  createPageLoader,
} from "../../lib/animatedTransition/functions/createPageLoader";

export const recruitingResultQuery = (id: number) => ({
  queryKey: ["recruiting", "result", id],
  queryFn: () => getRecruitingResult(id),
  staleTime: Infinity,
});

const resultDataFetcher: PageDataFetcher<{ result: { status: number } }> =
  (queryClient) =>
  async ({ params }) => {
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
