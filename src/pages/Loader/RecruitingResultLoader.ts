import { QueryClient } from "@tanstack/react-query";
import { redirect } from "react-router-dom";
import { checkAuth } from "../../apis/auth/auth.api";
import {
  getAllRecruitingsAsAdmin,
  getRecruitingSubmissions,
} from "../../apis/recruiting/recruiting.api";
import { RecruitingSummary } from "../../apis/recruiting/recruiting.types";
import { isForbiddenError } from "../../apis/utility";
import { LoaderReturnType } from "../../types/commonTypes";
import { PATH } from "../../shared/routes/constants";

export const adminRecruitingListQuery = {
  queryKey: ["admin", "recruiting", "list"],
  queryFn: getAllRecruitingsAsAdmin,
  staleTime: 1000 * 60,
};

export const adminSubmissionQuery = (id: number) => ({
  queryKey: ["admin", "recruiting", "submission", id],
  queryFn: () => getRecruitingSubmissions(id),
  staleTime: 1000 * 60,
});

const checkAdminAccess = async (
  queryClient: QueryClient,
  recruitings: RecruitingSummary[],
): Promise<boolean> => {
  const probeTarget = recruitings[0];

  if (!probeTarget) return true;

  try {
    await queryClient.fetchQuery(adminSubmissionQuery(probeTarget.id));
    return true;
  } catch (error) {
    if (isForbiddenError(error)) return false;

    return true;
  }
};

const ensureAdminAccess = async (
  queryClient: QueryClient,
  redirectTo: string,
) => {
  const authState = await checkAuth();
  if (authState !== "valid") {
    throw redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  }

  let recruitings: RecruitingSummary[];
  try {
    const data = await queryClient.fetchQuery(adminRecruitingListQuery);
    recruitings = data.items ?? [];
  } catch (error) {
    if (isForbiddenError(error)) return { forbidden: true as const };
    throw new Response("리크루팅 목록을 불러오지 못했습니다.", {
      status: 500,
    });
  }

  const isAdmin = await checkAdminAccess(queryClient, recruitings);
  if (!isAdmin) return { forbidden: true as const };

  return { forbidden: false as const, recruitings };
};

export const adminLoader = (queryClient: QueryClient) => () =>
  ensureAdminAccess(queryClient, PATH.ADMIN);

export const recruitingResultLoader = (queryClient: QueryClient) => () =>
  ensureAdminAccess(queryClient, PATH.RECRUITING_RESULT);

export type AdminLoaderReturnType = LoaderReturnType<typeof adminLoader>;

export type RecruitingResultLoaderReturnType = LoaderReturnType<
  typeof recruitingResultLoader
>;
