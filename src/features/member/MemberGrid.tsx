import styled from "styled-components";
import { members } from "@/mocks/member";
import { sponsors } from "@/mocks/sponsor";
import { useState } from "react";

export default function MemberGrid() {
  const [selectedPosition, setSelectedPosition] = useState<string>("전체");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortOpen, setSortOpen] = useState(false);
  const positions = ["전체", "Android", "IOS", "Frontend", "Backend", "Design"];
  const filtered = members.filter((member) =>
    selectedPosition === "전체"
      ? true
      : member.member_position === selectedPosition,
  );

  const sorted = [...filtered].sort((a, b) => {
    const getGen = (gen: string) => parseFloat(gen.replace("기", ""));
    return sortOrder === "asc"
      ? getGen(a.member_generation) - getGen(b.member_generation)
      : getGen(b.member_generation) - getGen(a.member_generation);
  });

  return (
    <Wrapper>
      <Title1>와플스튜디오의 발전을 위해 노력해주신 분들</Title1>
      <Flex>
        {sponsors.map((sponsor) => (
          <div key={sponsor.id}>{`${sponsor.name} 님`}</div>
        ))}
      </Flex>
      <Title2>와플스튜디오 멤버</Title2>
      <Filter>
        <FilterBar>
          {positions.map((pos) => (
            <FilterButton
              key={pos}
              $active={selectedPosition === pos}
              onClick={() => setSelectedPosition(pos)}
            >
              {pos}
              {pos !== "전체" && positionColors[pos] && (
                <ColorDot color={positionColors[pos]} />
              )}
            </FilterButton>
          ))}
        </FilterBar>
        <FilterBar>
          <Sort>기수 정렬</Sort>
          <SortButton onClick={() => setSortOpen((prev) => !prev)}>
            {sortOrder === "desc" ? (
              <>
                <SortOrder>내림차순</SortOrder>
                <img src="/icon/arrow_down.svg" />
              </>
            ) : (
              <>
                <SortOrder>오름차순</SortOrder>
                <img src="/icon/arrow_up.svg" />
              </>
            )}
          </SortButton>
        </FilterBar>
        {sortOpen && (
          <Dropdown>
            <li onClick={() => setSortOrder("asc")}>오름차순</li>
            <li onClick={() => setSortOrder("desc")}>내림차순</li>
          </Dropdown>
        )}
      </Filter>

      <Grid>
        {sorted.map((member) => (
          <Card key={member.id}>
            {positionColors[member.member_position] && (
              <ColorDot color={positionColors[member.member_position]} />
            )}
            <HeaderRow>
              <LeftInfo>
                <span>{member.member_name}</span>
              </LeftInfo>
              <RightInfo>
                <span>{member.member_generation}</span>
                <span>{member.member_position}</span>
              </RightInfo>
            </HeaderRow>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}

const positionColors: Record<string, string> = {
  Android: "#876E00",
  IOS: "#E69754",
  Frontend: "#37007F",
  Backend: "#00CD48",
  Design: "#FF2C4C",
};

const ColorDot = styled.div<{ color: string }>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: 10px;
  height: 10px;
  aspect-ratio: 1/1;
  border-top-right-radius: 0.5rem;
  background-color: ${({ color }) => color};
`;

const Sort = styled.div`
  color: var(--black-900, #121212);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.16px;
`;
const SortOrder = styled.div`
  color: #121212;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.16px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  width: 12.8rem;
  margin-bottom: 5rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5rem 0;
  gap: 5rem;
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;
const Filter = styled(FilterBar)`
  && {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media (max-width: 1160px) {
      flex-direction: column;
      gap: 2rem;
      align-items: center;
    }
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  position: relative;
  background-color: ${({ $active }) => ($active ? "#000" : "#f5f5f5")};
  color: ${({ $active }) => ($active ? "#fff" : "#000")};
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  cursor: pointer;
  text-align: center;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.16px;
  display: flex;
  width: 10.8rem;
  padding: 0.4rem 0;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Dropdown = styled.ul`
  position: absolute;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  background-color: white;
  list-style: none;
  padding: 0.5rem 0;
  border-radius: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);

  li {
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 0.875rem;
    &:hover {
      background-color: #f3f4f6;
    }
  }
`;

const Title2 = styled.div`
  font-size: 3.2rem;
  color: #000;
  text-align: center;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.32px;
`;
const Title1 = styled.div`
  padding-top: 6rem;
  font-size: 3.2rem;
  text-align: center;
  color: #000;
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 48px */
  letter-spacing: -0.32px;
  flex-wrap: wrap;
`;

const SortButton = styled.div`
  font-size: 0.875rem;
  display: flex;
  width: 10.8rem;
  padding: 0.4rem 0.8rem 0.4rem 1.2rem;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  border: 0.1rem solid var(--black-700, #5f656f);
  background: var(--white, #fff);
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
`;

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #f3f4f6; /* 연한 회색 */
  border-radius: 0.5rem;
  padding: 1rem;
  transition: background-color 0.3s;
  cursor: pointer;
  width: 22.2rem;
  padding: 1.6rem 2.2rem;
  align-items: flex-start;
  gap: 2.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const LeftInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #121212;
  font-family: "Pretendard Variable";
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 24px */
  letter-spacing: -0.16px;
`;

const RightInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #5f656f;
  font-family: "Pretendard Variable";
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.13px;
`;
