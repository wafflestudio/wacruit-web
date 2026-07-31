import { BriefRecruiting, RecruitingType } from "./recruiting.types";

// .5 기수는 항상 루키 리크루팅이므로, 루키만 모집 기간이 정해진 시즌 모집으로 본다
const isSeasonal = ({ type }: BriefRecruiting) =>
  type === RecruitingType.ROOKIE;

// 모집 기간이 비어 있는 상시 모집은 항상 열려 있는 것으로 본다
const isOngoing = ({ from_date, to_date }: BriefRecruiting, now: number) =>
  (!from_date || new Date(from_date).getTime() <= now) &&
  (!to_date || now < new Date(to_date).getTime());

// 가장 늦게 시작한 리크루팅을 대표로 삼는다
const latest = (recruitings: BriefRecruiting[]) =>
  recruitings.reduce<BriefRecruiting | null>(
    (latest, cur) =>
      latest === null ||
      new Date(cur.from_date ?? 0) > new Date(latest.from_date ?? 0)
        ? cur
        : latest,
    null,
  );

export const getOngoingRecruitings = (
  recruitings: BriefRecruiting[],
  now = Date.now(),
) => {
  const ongoing = recruitings.filter((recruiting) =>
    isOngoing(recruiting, now),
  );

  return {
    seasonal: latest(ongoing.filter(isSeasonal)),
    continuous: latest(ongoing.filter((recruiting) => !isSeasonal(recruiting))),
  };
};
