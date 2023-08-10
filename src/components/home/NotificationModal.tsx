import styled from "styled-components";
import { Link } from "react-router-dom";
import { TAnnouncement } from "../../types/apiTypes";

type NotificationModalProps = {
  announcement: TAnnouncement;
  index: number;
  closeModal: () => void;
  setDontShowModalDate: (date: number) => void;
};

export default function NotificationModal({
  announcement,
  index,
  closeModal,
  setDontShowModalDate,
}: NotificationModalProps) {
  return (
    <Article $index={index}>
      <ContentsWapper>
        <ImageContainer>
          <img src="/icon/Notification.svg" alt="" />
        </ImageContainer>
        <Title>{announcement.title}</Title>
        <MainText>{announcement.content}</MainText>
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

const Article = styled.article<{ $index: number }>`
  position: fixed;
  top: ${({ $index }) => `${124 + $index * 50}px`};
  left: ${({ $index }) => `${164 + $index * 40}px`};
  width: 405px;
  border-radius: 15px;
  background-color: #fff;
`;
const ContentsWapper = styled.div`
  max-height: 600px;
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
  width: 100%;
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 18px;
  font-size: 16px;
  line-height: 170%;
  letter-spacing: 0;
  text-align: center;
  color: #737373;

  /* code start: scrollbar css design */
  &::-webkit-scrollbar {
    width: 17px; // border-left 5px, border-right 5px를 뺀 7px가 보이는 두께
  }
  &::-webkit-scrollbar-thumb {
    background: #737373;
    border-radius: 10px;
    border: 5px solid #fff; // 컨텐츠 배경색과 같은 흰색 border를 줌으로써 스크롤바 오른쪽 여백을 구현
    // 스크롤바의 border-radius까지 figma대로 구현하려면 위처럼 상하좌우 전체에 border를 주고 border-radius를 적용시켜야 함.
  }
  // 스크롤바 위아래 여백
  &::-webkit-scrollbar-button:vertical:start:decrement, // 위 여백
  &::-webkit-scrollbar-button:vertical:end:decrement // 아래 여백
  {
    display: block;
    height: 23px; // 위아래 여백을 28px 주어야 하는데, border-top, border-bottom이 5px 있으므로 23px만
  }
  /* end */
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
