import { styled } from "styled-components";
import { ProgressList } from "../components/rookie/Progress/ProgressList";
import Header from "../components/rookie/Header/Header";

export default function Rookie() {
  return (
    <Main>
      <Header />
      <Title>루키 지원 페이지</Title>
      <Description>와플스튜디오의 21.5기 루키를 모집합니다.</Description>
      <Information>
        <div>
          <span>지원 기간 </span> 8월 5일(금) - 8월 14일(일) 23:59
        </div>
        <div>
          <span>지원 방법 </span> 하단 자기소개서 제출 및 문제 풀이를 모두
          완료해주세요.
        </div>
        <div>*합격자 발표는 8월 15일 이메일로 알려드립니다.</div>
      </Information>
      <AnnouncementButton>
        공지 및 변경사항 안내
        <div>
          <img
            src="/icon/rookie/AnnounceRightArrow.svg"
            alt="&rarr;"
            width={20}
          />
        </div>
      </AnnouncementButton>
      <div>
        <ProgressList />
        <Caution>
          아래 내용은 제출 후에도 상시 수정할 수 있으며, 모두 제출해야 지원
          완료됩니다.
        </Caution>
      </div>
    </Main>
  );
}

const Main = styled.main`
  position: relative;
  font-family: Pretendard, sans-serif;
  font-style: normal;
  line-height: normal;
  padding: 23vh max(calc(50vw - 650px), 30px);
`;

const Title = styled.h1`
  color: #222;
  font-size: 40px;
  font-weight: 600;
  margin: 9px 0;
`;

const Description = styled.p`
  color: #373737;
  font-size: 20px;
  font-weight: 500;
  line-height: 160%; /* 32px */
  letter-spacing: 0.8px;
  margin: 0;
  margin-bottom: 37px;
`;

const Information = styled.div`
  color: #737373;
  font-size: 18px;
  font-weight: 400;
  line-height: 170%; /* 30.6px */
  letter-spacing: 0.72px;
  margin-bottom: 34px;
  span {
    color: #b44f3d;
    font-weight: 600;
  }
`;

const AnnouncementButton = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 20px;
  background: #f0745f;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  line-height: 25px;
  margin-bottom: 34px;
  cursor: pointer;

  > div {
    width: 25px;
    height: 25px;
    background: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  &:hover {
    color: #f0745f;
    background: #fff;
    > div {
      background: #f0745f;
    }
  }
`;

const Caution = styled.div`
  color: #515151;
  font-size: 18px;
  font-weight: 400;
  line-height: 160%; /* 28.8px */
  letter-spacing: 0.72px;
  margin-top: 25px;
`;
