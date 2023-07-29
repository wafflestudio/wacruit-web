import styled from "styled-components";
import { Link } from "react-router-dom";

type NotificationModalProps = {
  closeModal: () => void;
};

export default function NotificationModal({
  closeModal,
}: NotificationModalProps) {
  const notificationData = {
    title: "시스템 점검 일정 안내",
    main: `자기소개서는 500자 이내의
간단한 문항 두 가지로 구성되어 있습니다.
코딩 테스트는 지원 기간 막바지에는
트래픽이 몰려서 사이트가 불안정해질 수 있으니,
여유를 가지고 시간을 내서 푸시는 것을 권장드려요!`,
  };
  return (
    <Article>
      <ContentsWapper>
        <ImageContainer>
          <img src="/icon/Notification.svg" alt="" />
        </ImageContainer>
        <Title>{notificationData.title}</Title>
        <MainText>{notificationData.main}</MainText>
        <Link to="./">자세히보기</Link>
      </ContentsWapper>
      <ButtonWrapper>
        {/* TODO: 오늘 그만보기 onClick 작업 */}
        <Button onClick={closeModal}>오늘 그만보기</Button>
        <DivideLine />
        <Button onClick={closeModal}>닫기</Button>
      </ButtonWrapper>
    </Article>
  );
}

const Article = styled.article`
  position: relative;
  max-width: 405px;
  border-radius: 15px;
`;
const ContentsWapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 49px 43px 75px;
  border-radius: 15px;
  > a {
    margin-top: 35px;
    line-height: 170%;
    font-size: 16px;
    color: #737373;
    text-decoration: underline;
    text-underline-position: under;
  }
`;
const ImageContainer = styled.div`
  width: 56px;
  height: "56px";
  margin-bottom: 11px;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: #222222;
  line-height: 140%;
  text-align: center;
`;
const MainText = styled.p`
  white-space: pre-wrap;
  margin-top: 18px;
  font-size: 16px;
  line-height: 170%;
  letter-spacing: 0;
  text-align: center;
  color: #737373;
`;
const ButtonWrapper = styled.div`
  height: 73px;
  background-color: #f0745f;
  border-radius: 0 0 15px 15px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;
const Button = styled.button`
  font-size: 18px;
  letter-spacing: -5%;
  color: #fff;
  text-align: center;
  line-height: 73px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const DivideLine = styled.div`
  width: 0;
  height: 30px;
  border-left: 1px solid #fff;
`;
