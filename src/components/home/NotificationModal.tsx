import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncements } from "../../apis/announcement";

type NotificationModalProps = {
  closeModal: () => void;
  setDontShowModalDate: (date: number) => void;
};

export default function NotificationModal({
  closeModal,
  setDontShowModalDate,
}: NotificationModalProps) {
  const { data: latestAnnouncement } = useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAllAnnouncements().then((res) => res[0]),
    staleTime: 1,
  });
  return (
    <Article>
      <ContentsWapper>
        <ImageContainer>
          <img src="/icon/Notification.svg" alt="" />
        </ImageContainer>
        <Title>{latestAnnouncement?.title}</Title>
        <MainText>{latestAnnouncement?.content}</MainText>
        {/* TODO : 오류 해결 */}
        <Link to="/announcement/">자세히보기</Link>
      </ContentsWapper>
      <ButtonWrapper>
        <Button
          onClick={() => {
            closeModal();
            setDontShowModalDate(new Date().getDate());
          }}
        >
          오늘 그만보기
        </Button>
        <DivideLine />
        <Button onClick={closeModal}>닫기</Button>
      </ButtonWrapper>
    </Article>
  );
}

const Article = styled.article`
  position: fixed;
  top: 124px;
  left: 164px;
  width: 405px;
  border-radius: 15px;
  background-color: #fff;
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
