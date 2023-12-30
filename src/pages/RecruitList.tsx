import styled from "styled-components";
import Header from "../components/home/Header/Header";
import { MAILTO_RECRUIT } from "../common/const";
import { RecruitItem } from "../components/recruit/RecruitItem";
import { useQuery } from "@tanstack/react-query";
import { getAllRecruitings } from "../apis/recruiting";

export default function RecruitList() {
  const { data } = useQuery({
    queryKey: ["recruiting"],
    queryFn: getAllRecruitings,
    staleTime: 1000 * 60,
    retry: 3,
  });

  return (
    <>
      <Header />
      <Main>
        <Title>리크루팅 목록</Title>
        <Description>
          관련 질문이 있다면 <Mail href={MAILTO_RECRUIT}>{MAILTO_RECRUIT}</Mail>{" "}
          이메일로 문의주세요.
        </Description>
        <RecruitItemList>
          {data?.items
            .sort((r1, r2) => {
              const r1IsContinuous = r1.to_date === null;
              const r2IsContinuous = r2.to_date === null;
              if (r1IsContinuous && r2IsContinuous) return 0;
              if (r1IsContinuous) return -1;
              if (r2IsContinuous) return 1;
              const r1IsActive =
                !r1.to_date || new Date(r1.to_date) > new Date();
              const r2IsActive =
                !r2.to_date || new Date(r2.to_date) > new Date();
              if (!r1IsActive) return 1;
              if (!r2IsActive) return -1;
              return r1.id == r2.id ? 0 : r1.id > r2.id ? -1 : 1;
            })
            .map((r) => (
              <RecruitItem
                key={r.id}
                title={r.name}
                description={r.short_description}
                from={r.from_date ? new Date(r.from_date) : null}
                to={r.to_date ? new Date(r.to_date) : null}
              />
            ))}
        </RecruitItemList>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 23vh max(50vw - 534px, 30px) 0;
`;

const Title = styled.h1`
  color: #222;
  font-size: 52px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Description = styled.p`
  color: #484848;
  font-size: 16px;
  font-weight: 400;
  line-height: 140%;
  margin-bottom: 139px;
`;

const Mail = styled.a`
  font-weight: 500;
  text-decoration-line: underline;
`;

const RecruitItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;
