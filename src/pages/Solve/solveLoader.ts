import { getProblemById } from "../../apis/problem";
import { Problem } from "../../types/apiTypes";
import {
  PageDataFetcher,
  createPageLoader,
} from "../../lib/animatedTransition/functions/createPageLoader";
import { LoaderReturnType } from "../../types/commonTypes";

export const problemDetailQuery = (problemNumber: number) => ({
  queryKey: ["problem", problemNumber],
  queryFn: () => getProblemById(problemNumber),
  staleTime: 1000 * 60 * 60,
  retry: 1,
});

const solveDataFetcher: PageDataFetcher<{ problem: Problem }> =
  (queryClient) =>
  async ({ params }) => {
    const problemQuery = problemDetailQuery(Number(params.problem_number));
    const cachedProblem = queryClient.getQueryData<Problem>(
      problemQuery.queryKey,
    );
    return {
      problem:
        cachedProblem !== undefined
          ? cachedProblem
          : await queryClient.fetchQuery(problemQuery),
    };
  };

export const solveLoader = createPageLoader(solveDataFetcher, 500);

export type ProblemLoaderReturnType = LoaderReturnType<typeof solveLoader>;
