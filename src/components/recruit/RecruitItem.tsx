import { useCallback } from "react";
import styled from "styled-components";
import { checkAuth, tryLogin } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  // to가 null이면 상시 모집이므로 항상 활성화
  const isActive = to ? to.getTime() > Date.now() : true;

  const onApply = useCallback(async (recruit_id: number) => {
    const auth = await checkAuth();
    if (auth === "valid") {
      navigate(`/recruiting/${recruit_id}`);
      return;
    }
    if (auth === "need_register") {
      navigate(`/sso/${recruit_id}`);
      return;
    }
    if (auth === "invalid") {
      tryLogin(recruit_id);
      return;
    }
  }, []);

  return (
    <Container onClick={() => onApply(id)} $isActive={isActive}>
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

const Container = styled.div<{ $isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 4.8rem;
  --color: ${({ $isActive }) => ($isActive ? "#3F3F3F" : "#AAA")};
  color: var(--color);

  // XXX 활성화 시에는 글자색과 동일한데 비활성화 시 글자색하고 다른 건 의도된 건가??
  border-left: 0.5rem solid
    ${({ $isActive }) => ($isActive ? "#3F3F3F" : "#C8C8C8")};
  background: #fff;
  box-shadow: -0.4rem 0rem 1rem 0rem rgba(0, 0, 0, 0.04);

  transition: 0.5s ease;
  cursor: pointer;
  --arrow-gap: 2.2rem;

  &:hover {
    box-shadow: -0.4rem 0rem 2rem 0rem rgba(0, 0, 0, 0.08);
    transform: scale(101%);
    --arrow-gap: 4.2rem;
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
  font-size: 2.8rem;
  font-weight: 600;
  line-height: 140%;
  white-space: nowrap;
`;

const RightArrow = styled.img`
  width: 3.3rem;
  height: 3.3rem;
`;

const RecruitDescriptionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 400;
  line-height: 140%;
`;

const RecruitPeriod = styled.div`
  flex: 0 0 auto;
  white-space: nowrap;
`;

const RecruitDescription = styled.div`
  flex: 1 1 auto;
  min-width: 15rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RecruitDescriptionSeperator = styled.div`
  flex: 0 0 0.1rem;
  height: 2rem;
  background-color: var(--color);
`;
