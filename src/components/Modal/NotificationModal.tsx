import styled from "styled-components";

type NotificationModalProps = {
  closeModal: () => void;
};

export default function NotificationModal({
  closeModal,
}: NotificationModalProps) {
  const notificationData = {
    title: "모집일정 변경사항",
    titleDescription: "학사 내 사정으로 인한",
    main: `공지사항공지사항 공지사항공지사항 공지사항 공
    공지사항공지사항공지사항공지사항
    공지사항공지사항\n
    공지사항공지사항공지사항공지사항공지사항공
    공지사항공지사항공지사항공지사항`,
  };
  return (
    <Article>
      <ContentsWapper>
        <ImageContainer>
          <img src="/icon/Notification.svg" alt="" />
        </ImageContainer>
        <TitleDescription>{notificationData.titleDescription}</TitleDescription>
        <Title>{notificationData.title}</Title>
        <MainText>{notificationData.main}</MainText>
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
  /* TODO: GlobalStyles pr 머지 후 아래 내용 삭제 */
  * {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    list-style-type: none;
    text-decoration: none;
    border-collapse: collapse;
  }
  margin: 0;
  box-sizing: border-box;

  position: relative;
  max-width: 406px;
  border: 1px solid #000;
  border-radius: 15px;
`;
const ContentsWapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 27px 45px 61px 45px;
  border-radius: 15px;
`;
const ImageContainer = styled.div`
  width: 54px;
  height: "54px";
`;
const TitleDescription = styled.h2`
  margin-top: 15px;
  font-size: 14px;
  letter-spacing: 3%;
  color: #707070;
`;
const Title = styled.h1`
  margin-top: 3px;
  font-size: 32px;
  font-weight: 600;
  color: #1e1e1e;
`;
const MainText = styled.p`
  white-space: pre-wrap;
  margin-top: 38px;
  font-size: 14px;
  letter-spacing: 3%;
  line-height: 150%;
  text-align: center;
  color: #575757;
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
