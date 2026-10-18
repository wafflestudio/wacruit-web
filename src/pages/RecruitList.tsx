import styled from "styled-components";
import { MAIL_RECRUIT } from "../common/const";
import { RecruitItem } from "../components/recruit/RecruitItem";
import { useQuery } from "@tanstack/react-query";
import { getAllRecruitings } from "../apis/recruiting/recruiting.api";
import { generateMailUrl } from "../common/utils";
import {
  RecruitingSummary,
  RecruitingType,
} from "../apis/recruiting/recruiting.types";
import Headerv2 from "../shared/ui/header/HeaderV2";
import HeaderSpacer from "../shared/ui/header/HeaderSpacer";

const isRecruitingActive = (recruiting: RecruitingSummary) =>
  recruiting.is_active &&
  (recruiting.type === RecruitingType.PROGRAMMER ||
    !recruiting.to_date ||
    new Date(recruiting.to_date) > new Date());

export default function RecruitList() {
  const { data } = useQuery({
    queryKey: ["recruiting"],
    queryFn: getAllRecruitings,
    staleTime: 1000 * 60,
    retry: 3,
  });

  const sorted = [...(data?.items ?? [])].sort((r1, r2) => {
    const r1IsContinuous = r1.to_date === null;
    const r2IsContinuous = r2.to_date === null;
    if (r1IsContinuous && r2IsContinuous) return 0;
    if (r1IsContinuous) return -1;
    if (r2IsContinuous) return 1;
    const r1IsActive = !r1.to_date || new Date(r1.to_date) > new Date();
    const r2IsActive = !r2.to_date || new Date(r2.to_date) > new Date();
    if (!r1IsActive) return 1;
    if (!r2IsActive) return -1;
    return r1.id === r2.id ? 0 : r1.id > r2.id ? -1 : 1;
  });

  const groups = [
    { label: "모집 중", items: sorted.filter(isRecruitingActive) },
    {
      label: "마감된 모집",
      items: sorted.filter((r) => !isRecruitingActive(r)),
    },
  ].filter(({ items }) => items.length > 0);

  return (
    <>
      <Headerv2 />
      <HeaderSpacer />
      <Main>
        <Content>
          <Heading>
            <Title>리크루팅 목록</Title>
            <Description>
              관련 질문이 있다면{" "}
              <Mail href={generateMailUrl(MAIL_RECRUIT)}>{MAIL_RECRUIT}</Mail>{" "}
              이메일로 문의주세요.
            </Description>
          </Heading>
          {groups.map(({ label, items }) => (
            <Group key={label}>
              <GroupLabel>
                {label} <Count>{items.length}</Count>
              </GroupLabel>
              <RecruitItemList>
                {items.map((r) => (
                  <li key={r.id}>
                    <RecruitItem
                      id={r.id}
                      name={r.name}
                      description={r.short_description}
                      from={r.from_date ? new Date(r.from_date) : null}
                      to={r.to_date ? new Date(r.to_date) : null}
                      type={r.type}
                      isActive={isRecruitingActive(r)}
                    />
                  </li>
                ))}
              </RecruitItemList>
            </Group>
          ))}
        </Content>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 7.2rem 2rem 10.4rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem 7.2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 100rem;

  @media (max-width: 768px) {
    gap: 3.2rem;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[24]};
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const Mail = styled.a`
  color: ${({ theme }) => theme.colors.black[900]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: underline;
  text-underline-offset: 0.3rem;
`;

const Group = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const GroupLabel = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.black[500]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const RecruitItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;
