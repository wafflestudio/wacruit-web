import { QueryClient } from "@tanstack/react-query";
import { getRecruitingById } from "../../apis/recruiting";
import { Recruiting, Resume } from "../../types/apiTypes";
import { LoaderReturnType } from "../../types/commonTypes";
import { getMyResumes } from "../../apis/resume";

export const recruitingDetailQuery = (id: number) => ({
  queryKey: ["recruiting", "detail", id],
  queryFn: () => getRecruitingById(id),
  staleTime: Infinity,
});

export const myResumeQuery = (id: number) => ({
  queryKey: ["resume", "answer", id],
  queryFn: () => getMyResumes(id),
  staleTime: Infinity,
});

export const dashboardLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Record<string, unknown> }) => {
    const recruitingQuery = recruitingDetailQuery(Number(params.recruit_id));
    const resumeQuery = myResumeQuery(Number(params.recruit_id));
    const cachedRecruiting = queryClient.getQueryData<Recruiting>(
      recruitingQuery.queryKey,
    );
    const cachedResume = queryClient.getQueryData<{ items: Resume[] }>(
      resumeQuery.queryKey,
    );
    return {
      recruiting:
        cachedRecruiting !== undefined
          ? cachedRecruiting
          : await queryClient.fetchQuery(recruitingQuery),
      resume:
        cachedResume !== undefined
          ? cachedResume
          : await queryClient.fetchQuery(resumeQuery),
    };
  };

export type DashboardLoaderReturnType = LoaderReturnType<
  typeof dashboardLoader
>;
