import styled from "styled-components";
import { reviewData } from "../mocks/review";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5rem;
  gap: 5rem;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 3rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1.5rem;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f3f4f6; /* 연한 회색 */
  border-radius: 0.5rem;
  padding: 1rem;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb; /* hover 시 더 진한 회색 */
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
`;

const LeftInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const RightInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Status = styled.span<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? "green" : "gray")};
  font-weight: bold;
`;

const Review = styled.h2`
  font-size: 1.125rem;
  font-weight: bold;
`;

const Content = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

export default function ReviewGrid() {
  return (
    <Wrapper>
      <Title>
        와플스튜디오 회원들의
        <br />
        생생한 후기를 모았어요!
      </Title>
      <Grid>
        {reviewData.map((review, index) => (
          <Card key={index}>
            <HeaderRow>
              <LeftInfo>
                <span>{review.member_name}</span>
                <Status isActive={review.is_active}>
                  {review.is_active ? "• 활동중" : "• 휴식회원"}
                </Status>
              </LeftInfo>
              <RightInfo>
                <span>{review.member_generation}</span>
                <span>{review.member_position}</span>
              </RightInfo>
            </HeaderRow>
            <Review>{review.title}</Review>
            <Content>{review.content}</Content>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
}
