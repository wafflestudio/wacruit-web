import { styled } from "styled-components";
import Header from "../components/rookie/Header/Header";
import { MouseEventHandler, useState } from "react";
import closedListItemIcon from "/icon/announcement/ClosedListItem.svg";
import openedListItemIcon from "/icon/announcement/OpenedListItem.svg";
import { TAnnouncement } from "../types/apiTypes";
import { useQuery } from "react-query";
import { getAllAnnouncements } from "../apis/announcement";
import MarkDownRenderer from "../lib/MarkdownRenderer";

export default function Announcement() {
  const { data: announcements } = useQuery<TAnnouncement[]>({
    queryKey: ["announcement"],
    queryFn: () => getAllAnnouncements().then((res) => res.reverse()),
  });
  const [openedAnnouncementId, setOpenedAnnouncementId] = useState<number>();

  return (
    <>
      <Header />
      <Main>
        <Title>공지사항</Title>
        <Description>
          찾는 공지가 없다면 <span>mailto:recruit@wafflestudio.com</span>{" "}
          이메일로 문의주세요.
        </Description>
        <AnnouncementList>
          <ListHeaderRow>
            <p>NO.</p>
            <p>제목</p>
            <p>등록일</p>
            <div></div>
          </ListHeaderRow>
          {announcements?.map((announcement) => (
            <ListItem
              announcement={announcement}
              isOpened={announcement.id === openedAnnouncementId}
              nothingOpened={openedAnnouncementId === undefined}
              handleOnClick={() => {
                setOpenedAnnouncementId(
                  announcement.id === openedAnnouncementId
                    ? undefined
                    : announcement.id,
                );
              }}
            />
          ))}
        </AnnouncementList>
        {/* TODO: 페이지네이션은 이후 api 페이지네이션 처리되면 작업하겠습니다 */}
      </Main>
    </>
  );
}

type ListItemProps = {
  announcement: TAnnouncement;
  isOpened: boolean;
  nothingOpened: boolean;
  handleOnClick: MouseEventHandler<HTMLLIElement>;
};

function ListItem({
  announcement,
  isOpened,
  nothingOpened,
  handleOnClick,
}: ListItemProps) {
  // TODO: 공지 여러 개 한꺼번에 확인 불가?
  const { id, title, content, updated_at, created_at } = announcement;
  console.log(id, isOpened, nothingOpened);
  return (
    <ListItemRow
      onClick={handleOnClick}
      isOpened={isOpened}
      nothingOpened={nothingOpened}
    >
      <p>{id + 1}</p>
      <p>
        {title}
        {isOpened && <MarkDownRenderer markdownString={content} />}
      </p>
      <p>{(updated_at || created_at).slice(0, 10).split("-").join(".")}</p>
      <div>
        <img
          src={isOpened ? openedListItemIcon : closedListItemIcon}
          style={{ width: "21px", height: "12px" }}
        />
      </div>
    </ListItemRow>
  );
}

const Main = styled.main`
  margin-top: 7vh;
  padding: 9vh max(calc(50vw - 650px), 30px);
`;

const Title = styled.h1`
  font-size: 52px;
  font-weight: 600;
  color: #222222;
`;

const Description = styled.h2`
  margin-top: 12px;
  line-height: 140%;
  font-size: 16px;
  color: #484848;
  > span {
    font-weight: 500;
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const AnnouncementList = styled.ol`
  margin-top: 50px;
  min-width: 970px;
`;

const ListRow = styled.li<{ isOpened?: boolean; nothingOpened?: boolean }>`
  display: grid;
  grid-template-columns: 9fr 68fr 17fr 7fr;
  font-size: 20px;
  line-height: 140%;
  border-bottom: 1px solid #c9c9c9;

  > p:nth-child(3) {
    text-align: center;
  }
`;

const ListHeaderRow = styled(ListRow)`
  border-top: 2px solid #222222;
  font-weight: 600;
  color: #222222;
  padding: 16px 0;

  > p:first-child {
    padding-left: 20%;
  }
`;

const ListItemRow = styled(ListRow)`
  cursor: pointer;
  color: #3c3c3c;
  ${({ isOpened }) => isOpened && { color: "#222222", "font-weight": "500" }}
  ${({ isOpened, nothingOpened }) =>
    !nothingOpened && !isOpened && { color: "#9c9c9c" }}
  padding: 30px 0 32px 0;

  > p:first-child {
    padding-left: 30%;
  }
  > p:nth-child(2) {
    font-weight: 500;
    ${({ isOpened }) => isOpened && { "font-weight": "600" }}
    > p {
      margin-top: 46px;
      font-size: 18px;
      font-weight: normal;
      line-height: 185%;
      color: #373737;
    }
  }
  > div:nth-child(4) {
    padding: 0 38%;
  }
`;
