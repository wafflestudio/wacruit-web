import { getRecruitingResult } from "../../apis/recruiting";
import { LoaderReturnType } from "../../types/commonTypes";
import {
  PageDataLoader,
  createCompositeLoader,
} from "../../lib/animatedTransition/functions/createCompositeLoader";

export const recruitingResultQuery = (id: number) => ({
  queryKey: ["recruiting", "result", id],
  queryFn: () => getRecruitingResult(id),
  staleTime: Infinity,
});

const resultDataLoader: PageDataLoader<{ result: { status: number } }> =
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

export const resultLoader = createCompositeLoader(resultDataLoader);

export type ResultLoaderReturnType = LoaderReturnType<typeof resultLoader>;
