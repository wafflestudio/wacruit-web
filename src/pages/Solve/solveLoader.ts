import { getProblemById } from "../../apis/problem";
import { Problem } from "../../types/apiTypes";
import { LoaderReturnType } from "../../types/commonTypes";
import {
  PageDataLoader,
  createCompositeLoader,
} from "../../lib/animatedTransition/functions/createCompositeLoader";

export const problemDetailQuery = (problemNumber: number) => ({
  queryKey: ["problem", problemNumber],
  queryFn: () => getProblemById(problemNumber),
  staleTime: 1000 * 60 * 60,
  retry: 1,
});

const solveDataLoader: PageDataLoader<{ problem: Problem }> =
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

export const solveLoader = createCompositeLoader(solveDataLoader);

export type ProblemLoaderReturnType = LoaderReturnType<typeof solveLoader>;
