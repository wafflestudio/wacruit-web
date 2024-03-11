import styled from "styled-components";
import { Link } from "react-router-dom";
import MarkdownRenderer from "../../lib/MarkdownRenderer";
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
        <MainText>
          <MarkdownRenderer
            markdownString={announcement.content}
            StyledWrapper={MarkdownStyledWrapper}
          />
        </MainText>
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
  top: ${({ $index }) => `${12.4 + $index * 5.0}rem`};
  left: ${({ $index }) => `${16.4 + $index * 4.0}rem`};
  width: 40.5rem;
  border-radius: 1.5rem;
  background-color: #fff;
`;
const ContentsWapper = styled.div`
  max-height: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4.9rem 4.3rem 7.5rem;
  border-radius: 1.5rem;

  > a {
    margin-top: 3.5rem;
    line-height: 170%;
    font-size: 1.6rem;
    color: #737373;
    text-decoration: underline;
    text-underline-position: under;
  }
`;
const ImageContainer = styled.div`
  width: 5.6rem;
  height: 5.6rem;
  margin-bottom: 1.1rem;
`;
const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #222222;
  line-height: 140%;
  text-align: center;
`;
const MainText = styled.div`
  width: 100%;
  max-height: 100%;
  overflow-y: auto;

  /* code start: scrollbar css design */
  &::-webkit-scrollbar {
    width: 1.7rem; // border-left 0.5rem, border-right 5px를 뺀 7px가 보이는 두께
  }
  &::-webkit-scrollbar-thumb {
    background: #737373;
    border-radius: 1rem;
    border: 0.5rem solid #fff; // 컨텐츠 배경색과 같은 흰색 border를 줌으로써 스크롤바 오른쪽 여백을 구현
    // 스크롤바의 border-radius까지 figma대로 구현하려면 위처럼 상하좌우 전체에 border를 주고 border-radius를 적용시켜야 함.
  }
  // 스크롤바 위아래 여백
  &::-webkit-scrollbar-button:vertical:start:decrement, // 위 여백
  &::-webkit-scrollbar-button:vertical:end:decrement // 아래 여백
  {
    display: block;
    height: 2.3rem; // 위아래 여백을 2.8rem 주어야 하는데, border-top, border-bottom이 0.5rem 있으므로 23px만
  }
  /* end */
`;
const ButtonWrapper = styled.div`
  height: 7.3rem;
  background-color: #f0745f;
  border-radius: 0 0 1.5rem 1.5rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
`;
const Button = styled.button`
  font-size: 1.8rem;
  letter-spacing: -5%;
  color: #fff;
  text-align: center;
  line-height: 7.3rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const DivideLine = styled.div`
  width: 0;
  height: 3rem;
  border-left: 0.1rem solid #fff;
`;

const MarkdownStyledWrapper = styled.div`
  font-size: 1.6rem;
  line-height: 170%;
  letter-spacing: 0;
  color: #737373;
  p {
    margin-top: 1.8rem;
    white-space: pre-wrap;
    word-break: keep-all;
  }
  ul,
  ol {
    padding: 0;
  }
  li {
    white-space: pre-wrap;
    word-break: keep-all;
  }
  a {
    text-decoration: underline;
    &:hover {
      color: #f0745f;
    }
  }
`;
