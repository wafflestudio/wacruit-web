import styled from "styled-components";
import { reviewData } from "../mocks/review";
import Headerv2 from "../shared/ui/header/HeaderV2";

const Section = styled.section`
  width: 100%;
  max-width: 1920px;
  margin: 0 auto;
  padding: 128px 0 140px 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 88px 0 140px 0;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const TitleSection = styled.div`
  text-align: left;
`;

const SectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.black[900]};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -1%;
  margin: 0;
  white-space: nowrap;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;

`;

const ReviewCard = styled.article`
  width: 100%;
  height: 268px;
  background-color: ${({ theme }) => theme.colors.black[100]};
  border-radius: 8px;
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    height: 247px;
    padding: 18px 24px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 19px;
  
`;

const LeftInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MemberName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
`;

const MemberInfo = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black[700]};
`;

const CardContent = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
  
`;

const ReviewTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -1%;
  margin: 0;
`;

const ReviewText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.black[900]};
  line-height: ${({ theme }) => theme.lineHeights.base};
  letter-spacing: -1%;
  margin: 0;
`;

export default function ReviewGrid() {
  return (
    <Section>
      <Headerv2 />
      <ContentWrapper>
        <TitleSection>
          <SectionTitle>
            와플스튜디오 회원들의
            <br />
            생생한 후기를 모았어요!
          </SectionTitle>
        </TitleSection>

        <Grid>
          {reviewData.map((review, index) => (
            <ReviewCard key={index}>
              <CardHeader>
                <LeftInfo>
                  <MemberName>{review.member_name}</MemberName>
                </LeftInfo>
                <MemberInfo>{review.member_generation} {review.member_position}</MemberInfo>
              </CardHeader>

              <CardContent>
                <ReviewTitle>{review.title}</ReviewTitle>
                <ReviewText>{review.content}</ReviewText>
              </CardContent>
            </ReviewCard>
          ))}
        </Grid>
      </ContentWrapper>
    </Section>
  );
}
