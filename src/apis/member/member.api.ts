import { getJSON } from "../../features/member/utils";

export type ApiPosition =
  | "FRONTEND"
  | "BACKEND"
  | "DESIGNER"
  | "ANDROID"
  | "IOS"
  | "DESIGN";

export type ApiMemberItem = {
  id?: number;
  first_name: string;
  last_name: string;
  introduction?: string;
  department?: string;
  college?: string;
  phone_number?: string;
  github_id?: string;
  is_active: boolean;
  generation: string;
  position: ApiPosition;
};
export type ApiMemberResponse = { items: ApiMemberItem[] };

export type ApiSponsorItem = {
  id: number;
  name: string;
  sponsored_date?: string;
};
export type ApiSponsorResponse = { items: ApiSponsorItem[] };

export type SponsorQuery = {
  order?: string;
  year?: number;
};

export type MemberQuery = {
  position?: ApiPosition;
  offset?: number;
  limit?: number;
};

export async function fetchSponsors(
  query?: SponsorQuery,
): Promise<ApiSponsorItem[]> {
  const params = new URLSearchParams();
  if (query?.order) params.set("order", query.order);
  if (query?.year != null) params.set("year", String(query.year));
  const qs = params.toString();
  const data = await getJSON<ApiSponsorResponse>(
    `/api/v3/sponsor${qs ? `?${qs}` : ""}`,
  );
  return data.items ?? [];
}

export async function fetchMembers(
  query: MemberQuery,
): Promise<ApiMemberItem[]> {
  const params = new URLSearchParams();
  if (query.position) params.set("position", query.position);
  params.set("offset", String(query.offset ?? 0));
  params.set("limit", String(query.limit ?? 200));

  const data = await getJSON<ApiMemberResponse>(
    `/api/v3/members?${params.toString()}`,
  );
  return data.items ?? [];
}
