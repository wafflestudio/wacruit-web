import styled from "styled-components";

type RecruitItemComponentProps = {
  title: string;
  description: string;
  from?: Date;
  to?: Date;
};

export function RecruitItem({
  title,
  description,
  from,
  to,
}: RecruitItemComponentProps) {
  // to가 undefined이면 상시 모집
  const isActive = to !== undefined ? to.getMilliseconds() < Date.now() : true;

  return (
    <Container isActive={isActive}>
      <RecruitTitle>{title}</RecruitTitle>
      <RecruitDescription>
        {from && to
          ? `${from.toISOString().split("T")[0]} ~ ${
              to.toISOString().split("T")[0]
            }`
          : "상시 모집"}
        <RecruitDescriptionSeperator />
        {description}
      </RecruitDescription>
    </Container>
  );
}

const Container = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 48px;
  color: ${({ isActive }) => (isActive ? "#AAA" : "#3F3F3F")};

  // XXX 활성화 시에는 글자색과 동일한데 비활성화 시 글자색하고 다른 건 의도된 건가??
  border-left: 5px solid ${({ isActive }) => (isActive ? "#C8C8C8" : "#3F3F3F")};
  background: #fff;
  box-shadow: -4px 0px 10px 0px rgba(0, 0, 0, 0.04);
`;

const RecruitTitle = styled.h2`
  color: #3f3f3f;
  font-size: 28px;
  font-weight: 600;
  line-height: 140%;
`;

const RecruitDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 140%;
`;

const RecruitDescriptionSeperator = styled.div`
  width: 1px;
  height: 20px;
  background-color: #3f3f3f;
`;
