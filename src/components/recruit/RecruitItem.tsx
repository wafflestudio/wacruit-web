import styled from "styled-components";

type RecruitItemComponentProps = {
  id: number;
  name: string;
  description: string;
  from: Date | null;
  to: Date | null;
};

export function RecruitItem({
  id,
  name,
  description,
  from,
  to,
}: RecruitItemComponentProps) {
  // to가 null이면 상시 모집이므로 항상 활성화
  const isActive = to ? to.getMilliseconds() > Date.now() : true;

  return (
    <Container href={`/recruiting/${id}`} $isActive={isActive}>
      <RecruitNameArea>
        <RecruitName>{name}</RecruitName>
        <RightArrow src="/image/rightAngleBracket.svg" />
      </RecruitNameArea>
      <RecruitDescriptionArea>
        <RecruitPeriod>
          {to
            ? `${from?.toISOString().split("T")[0] ?? ""}
          ${" ~ "}${to.toISOString().split("T")[0]}`
            : "상시 모집"}
        </RecruitPeriod>
        <RecruitDescriptionSeperator />
        <RecruitDescription>{description}</RecruitDescription>
      </RecruitDescriptionArea>
    </Container>
  );
}

const Container = styled.a<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 48px;
  --color: ${({ $isActive }) => ($isActive ? "#3F3F3F" : "#AAA")};
  color: var(--color);

  // XXX 활성화 시에는 글자색과 동일한데 비활성화 시 글자색하고 다른 건 의도된 건가??
  border-left: 5px solid
    ${({ $isActive }) => ($isActive ? "#3F3F3F" : "#C8C8C8")};
  background: #fff;
  box-shadow: -4px 0px 10px 0px rgba(0, 0, 0, 0.04);

  transition: 0.5s ease;
  cursor: pointer;
  --arrow-gap: 22px;

  &:hover {
    box-shadow: -4px 0px 20px 0px rgba(0, 0, 0, 0.08);
    transform: scale(101%);
    --arrow-gap: 42px;
  }
`;

const RecruitNameArea = styled.div`
  display: flex;
  align-items: center;
  gap: var(--arrow-gap);
  transition: gap 0.5s ease;
`;

const RecruitName = styled.h2`
  color: #3f3f3f;
  font-size: 28px;
  font-weight: 600;
  line-height: 140%;
  white-space: nowrap;
`;

const RightArrow = styled.img`
  width: 33px;
  height: 33px;
`;

const RecruitDescriptionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 140%;
`;

const RecruitPeriod = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
`;

const RecruitDescription = styled.div`
  flex: 1 1 auto;
  min-width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RecruitDescriptionSeperator = styled.div`
  flex: 0 0 1px;
  height: 20px;
  background-color: var(--color);
`;
