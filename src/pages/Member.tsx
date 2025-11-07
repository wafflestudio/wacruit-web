import { useEffect, useMemo, useRef, useState } from "react";
import Headerv2 from "../shared/ui/header/HeaderV2";
import Footer from "../shared/ui/footer/Footer";
import styled from "styled-components";

import { Title1, Title2 } from "../features/member/Titles";
import PositionFilters from "../features/member/PositionFilters";
import SortToggle from "../features/member/SortToggle";
import MemberCard, { type ViewMember } from "../features/member/MemberCard";
import Grid from "../features/member/Grid";
import {
  Wrapper,
  CombinedSection,
  SponsorsBlock,
  Flex,
  SponsorName,
  MemberBlock,
  ControlsRow,
} from "../features/member/Layout";
import {
  POSITION_ORDER,
  type PosFilter,
  type SortOrder,
} from "../features/member/constants";
import { useIsMobile, parseGeneration } from "../features/member/hooks";

import {
  fetchMembers,
  fetchSponsors,
  type ApiMemberItem,
} from "../apis/member";
import { apiToCore, coreToApi } from "../features/member/mapping";
import { getErrorMessage } from "../features/member/utils";

type LocalViewMember = ViewMember & { generationNum: number };

const PAGE_SIZE = 20;

const HeaderOffset = styled.div`
  height: calc(2rem + 2 * 1.2rem + 1px + 80px);
  @media (max-width: 768px) {
    height: calc(2rem + 2 * 1.2rem + 40px);
  }
`;

const Sentinel = styled.div`
  width: 100%;
  height: 1px;
`;

const LoadingRow = styled.div`
  width: 100%;
  text-align: center;
  padding: 16px 0;
`;

export default function MemberPage() {
  const isMobile = useIsMobile(999);

  const [selectedPosition, setSelectedPosition] = useState<PosFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [sponsors, setSponsors] = useState<{ id: number; name: string }[]>([]);
  const [loadingSponsors, setLoadingSponsors] = useState(false);
  const [errorSponsors, setErrorSponsors] = useState<string | null>(null);

  const [membersRaw, setMembersRaw] = useState<ApiMemberItem[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [errorMembers, setErrorMembers] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const ioRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingSponsors(true);
        setErrorSponsors(null);
        const items = await fetchSponsors();
        if (alive) setSponsors(items);
      } catch (err: unknown) {
        if (alive) setErrorSponsors(getErrorMessage(err));
      } finally {
        if (alive) setLoadingSponsors(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;

    setMembersRaw([]);
    setOffset(0);
    setHasMore(true);
    setErrorMembers(null);

    (async () => {
      try {
        setLoadingMembers(true);
        const [items] = await Promise.all([
          fetchMembers({
            position:
              selectedPosition === "all"
                ? undefined
                : coreToApi(selectedPosition),
            offset: 0,
            limit: PAGE_SIZE,
          }),
          new Promise((r) => setTimeout(r, 2000)),
        ]);
        if (!alive) return;

        setMembersRaw(items);
        setHasMore(items.length === PAGE_SIZE);
        setOffset(items.length);
      } catch (err: unknown) {
        if (!alive) return;
        setErrorMembers(getErrorMessage(err));
        setHasMore(false);
      } finally {
        if (alive) setLoadingMembers(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [selectedPosition]);

  /* 페이지 추가 로드 */
  useEffect(() => {
    if (!hasMore) return;
    if (loadingMembers) return;
    const node = sentinelRef.current;
    if (!node) return;

    if (ioRef.current) {
      ioRef.current.disconnect();
      ioRef.current = null;
    }

    ioRef.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        (async () => {
          try {
            setLoadingMembers(true);
            setErrorMembers(null);
            const [items] = await Promise.all([
              fetchMembers({
                position:
                  selectedPosition === "all"
                    ? undefined
                    : coreToApi(selectedPosition),
                offset,
                limit: PAGE_SIZE,
              }),
              new Promise((r) => setTimeout(r, 2000)),
            ]);
            setMembersRaw((prev) => [...prev, ...items]);
            setHasMore(items.length === PAGE_SIZE);
            setOffset((prev) => prev + items.length);
          } catch (err: unknown) {
            setErrorMembers(getErrorMessage(err));
          } finally {
            setLoadingMembers(false);
          }
        })();
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0,
      },
    );

    ioRef.current.observe(node);
    return () => {
      ioRef.current?.disconnect();
      ioRef.current = null;
    };
  }, [hasMore, loadingMembers, offset, selectedPosition]);

  /* 카드 데이터 가공 + 정렬 */
  const processed: ViewMember[] = useMemo(() => {
    const mapped: LocalViewMember[] = membersRaw.map((m, idx) => ({
      id: m.id ?? idx,
      name: `${m.last_name}${m.first_name}`,
      generationText: `${m.generation}`,
      generationNum: parseGeneration(m.generation),
      positionKey: apiToCore(m.position),
    }));

    mapped.sort((a, b) => {
      if (a.generationNum !== b.generationNum) {
        return sortOrder === "desc"
          ? b.generationNum - a.generationNum
          : a.generationNum - b.generationNum;
      }
      return POSITION_ORDER[a.positionKey] - POSITION_ORDER[b.positionKey];
    });

    return mapped.map((m) => {
      return {
        id: m.id,
        name: m.name,
        generationText: m.generationText,
        positionKey: m.positionKey,
      };
    });
  }, [membersRaw, sortOrder]);

  const toggleSort = () => setSortOrder((p) => (p === "desc" ? "asc" : "desc"));

  return (
    <>
      <Headerv2 />
      <HeaderOffset />
      <Wrapper>
        <CombinedSection>
          {/* Sponsors */}
          <SponsorsBlock>
            <Title1>
              <span className="t1-part">와플스튜디오의 발전을 위해</span>
              <span className="t1-part">노력해주신 분들</span>
            </Title1>

            {loadingSponsors && <div>후원자 불러오는 중…</div>}
            {errorSponsors && (
              <div aria-live="polite">후원자 로딩 오류: {errorSponsors}</div>
            )}

            {!loadingSponsors && !errorSponsors && (
              <Flex>
                {sponsors.map((s) => (
                  <SponsorName key={s.id}>{`${s.name} 님`}</SponsorName>
                ))}
              </Flex>
            )}
          </SponsorsBlock>

          {/* Members */}
          <MemberBlock>
            <Title2>와플스튜디오 멤버</Title2>

            <ControlsRow>
              <PositionFilters
                selected={selectedPosition}
                onSelect={setSelectedPosition}
              />
              <SortToggle sortOrder={sortOrder} onToggle={toggleSort} />
            </ControlsRow>

            {errorMembers && (
              <LoadingRow aria-live="polite">
                멤버 로딩 오류: {errorMembers}
              </LoadingRow>
            )}

            <Grid>
              {processed.map((m) => (
                <MemberCard key={m.id} m={m} isMobile={isMobile} />
              ))}
            </Grid>

            {/* 로딩 표시 / 센티넬 / 끝 */}
            {loadingMembers && <LoadingRow>멤버 불러오는 중…</LoadingRow>}
            {!loadingMembers && !errorMembers && !hasMore && (
              <LoadingRow>마지막까지 확인했어요.</LoadingRow>
            )}
            {/* 이 센티넬이 뷰포트에 들어오면 다음 페이지 로드 */}
            <Sentinel ref={sentinelRef} />
          </MemberBlock>
        </CombinedSection>
      </Wrapper>
      <Footer />
    </>
  );
}
