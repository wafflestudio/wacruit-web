import { QueryClient } from "@tanstack/react-query";
import { getRecruitingById } from "../../apis/recruiting/recruiting.api";
import { Recruiting } from "../../apis/recruiting/recruiting.types";
import { getMyResumes } from "../../apis/resume/resume.api";
import { redirect } from "react-router-dom";
import { checkAuth } from "../../apis/auth/auth.api";

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

export type DashboardLoaderReturnType = {
  recruiting: Recruiting & { applied?: boolean };
  resume: { items: unknown[] };
};

export const dashboardLoader =
  (queryClient: QueryClient) =>
  async ({ params }: { params: Record<string, unknown> }) => {
    const rawId = params.recruit_id;
    const id = Number(rawId);
    if (!rawId || Number.isNaN(id)) {
      throw new Response("Invalid recruit id", { status: 400 });
    }

    let recruiting = queryClient.getQueryData<Recruiting>([
      "recruiting",
      "detail",
      id,
    ]);

    if (!recruiting) {
      try {
        recruiting = await queryClient.fetchQuery<Recruiting>(
          recruitingDetailQuery(id),
        );
      } catch (err) {
        throw new Response("Recruiting not found", { status: 404 });
      }
    }

    const recruitingVal: Recruiting = recruiting;

    if (recruitingVal.type === 3) {
      throw redirect(`/recruiting/programmers/${id}`);
    }

    const isActive =
      recruitingVal.is_active &&
      (!recruitingVal.to_date ||
        new Date(recruitingVal.to_date).getTime() > Date.now());

    if (!isActive) {
      return { recruiting: recruitingVal, resume: { items: [] } };
    }

    const authState = await checkAuth();
    if (authState !== "valid") {
      throw redirect(
        `/login?redirect=${encodeURIComponent(`/recruiting/${id}`)}`,
      );
    }

    let resume;
    try {
      resume = await queryClient.fetchQuery<{ items: unknown[] }>(
        myResumeQuery(id),
      );
    } catch {
      resume = { items: [] };
    }

    return { recruiting: recruitingVal, resume };
  };
