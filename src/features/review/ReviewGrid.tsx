import styled from "styled-components";
import { reviewData } from "../../mocks/review";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 2rem;
  max-width: 120rem;
  padding: 5rem;
  gap: 4rem;
`;

const Title = styled.div`
  padding-top: 6rem;
  font-weight: bold;
  line-height: 150%;
  font-size: 3.2rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 기본 3열 */
  gap: 1.5rem;
  padding: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);  /* 화면 좁아지면 2열 */
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;  /* 더 좁아지면 1열 */
  }
`;


const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6; /* 연한 회색 */
  border-radius: 0.5rem;
  padding: 2.4rem 2.8rem;
  transition: background-color 0.3s;
  cursor: pointer;
  height: 26.8rem;
  min-width: 30rem;
  gap: 2rem;

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
  font-weight: 700;
  font-size: 1.8rem;
`;

const RightInfo = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #5f656f;
  font-weight: 500;
  font-size: 1.3rem;
`;

const Review = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  font-size: 1.6rem;
`;

const Content = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: black;
  font-size: 1.4rem;
`;
