import { useMemo, useState } from "react";
import { members, ApiMember, ApiPosition } from "../mocks/member";
import { sponsors } from "../mocks/sponsor";

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
  type CorePos,
  type PosFilter,
  type SortOrder,
} from "../features/member/constants";
import { useIsMobile, parseGeneration } from "../features/member/hooks";

const POS_FROM_API: Record<ApiPosition, CorePos> = {
  ANDROID: "android",
  IOS: "ios",
  FRONTEND: "frontend",
  BACKEND: "backend",
  DESIGN: "design",
};

export default function MemberPage() {
  const isMobile = useIsMobile(767);
  const [selectedPosition, setSelectedPosition] = useState<PosFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const processed: ViewMember[] = useMemo(() => {
    const mapped = members.map((m: ApiMember) => {
      const key = POS_FROM_API[m.position];
      return {
        id: m.id,
        name: `${m.last_name}${m.first_name}`,
        generationText: `${m.generation}기`,
        generationNum: parseGeneration(m.generation),
        positionKey: key as CorePos,
      };
    });

    const filtered =
      selectedPosition === "all"
        ? mapped
        : mapped.filter((m) => m.positionKey === selectedPosition);

    filtered.sort((a, b) => {
      if (a.generationNum !== b.generationNum) {
        return sortOrder === "desc"
          ? b.generationNum - a.generationNum
          : a.generationNum - b.generationNum;
      }
      return POSITION_ORDER[a.positionKey] - POSITION_ORDER[b.positionKey];
    });

    return filtered;
  }, [selectedPosition, sortOrder]);

  const toggleSort = () => setSortOrder((p) => (p === "desc" ? "asc" : "desc"));

  return (
    <Wrapper>
      <CombinedSection>
        {/* Sponsors */}
        <SponsorsBlock>
          <Title1>
            <span className="t1-part">와플스튜디오의 발전을 위해</span>
            <span className="t1-part">노력해주신 분들</span>
          </Title1>
          <Flex>
            {sponsors.map((s) => (
              <SponsorName key={s.id}>{`${s.name} 님`}</SponsorName>
            ))}
          </Flex>
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

          <Grid>
            {processed.map((m) => (
              <MemberCard key={m.id} m={m} isMobile={isMobile} />
            ))}
          </Grid>
        </MemberBlock>
      </CombinedSection>
    </Wrapper>
  );
}
