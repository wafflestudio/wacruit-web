import { styled } from "styled-components";
import Header from "../components/home/Header/Header";
import { MouseEventHandler, useState } from "react";
import closedListItemIcon from "/icon/announcement/ClosedListItem.svg";
import openedListItemIcon from "/icon/announcement/OpenedListItem.svg";
import { TAnnouncement } from "../types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncements } from "../apis/announcement";
import MarkdownRenderer from "../lib/MarkdownRenderer";
import { Union } from "../types/commonTypes";
import { MAILTO_RECRUIT } from "../common/const";

const listItemStates = [
  "nothingSelected",
  "isSelected",
  "SomethingElseSelected",
] as const;
type ListItemState = Union<typeof listItemStates>;

export default function Announcement() {
  const { data: announcements } = useQuery({
    queryKey: ["announcement", "all"],
    queryFn: () => getAllAnnouncements(),
    staleTime: 1,
  });
  const [selectedAnnouncementId, setSelectedAnnouncementId] =
    useState<number>();

  return (
    <>
      <Header />
      <Main>
        <Title>공지사항</Title>
        <Description>
          찾는 공지가 없다면 <Mail href={MAILTO_RECRUIT}>{MAILTO_RECRUIT}</Mail>{" "}
          이메일로 문의주세요.
        </Description>
        <AnnouncementList>
          <ListHeaderRow>
            <p>NO.</p>
            <p>제목</p>
            <p>등록일</p>
            <div></div>
          </ListHeaderRow>
          {announcements &&
            (announcements.length === 0 ? (
              <NoAnnouncements>
                <p>등록된 공지사항이 없습니다.</p>
              </NoAnnouncements>
            ) : (
              announcements.map((announcement, idx) => (
                <ListItem
                  key={idx}
                  announcement={announcement}
                  listItemState={
                    selectedAnnouncementId === undefined
                      ? "nothingSelected"
                      : announcement.id === selectedAnnouncementId
                      ? "isSelected"
                      : "SomethingElseSelected"
                  }
                  handleOnClick={() => {
                    setSelectedAnnouncementId(
                      announcement.id === selectedAnnouncementId
                        ? undefined
                        : announcement.id,
                    );
                  }}
                />
              ))
            ))}
        </AnnouncementList>
        {/* TODO: 페이지네이션은 이후 api 페이지네이션 처리되면 작업하겠습니다 */}
      </Main>
    </>
  );
}

type ListItemProps = {
  announcement: TAnnouncement;
  listItemState: ListItemState;
  handleOnClick: MouseEventHandler<HTMLLIElement>;
};

function ListItem({
  announcement,
  listItemState,
  handleOnClick,
}: ListItemProps) {
  // TODO: 공지 여러 개 한꺼번에 확인 불가?
  const { id, title, content, updated_at, created_at } = announcement;
  return (
    <ListItemRow onClick={handleOnClick} $listItemState={listItemState}>
      <p>{id}</p>
      <p>
        {title}
        {listItemState === "isSelected" && (
          <MarkdownRenderer
            markdownString={content}
            StyledWrapper={MarkdownStyledWrapper}
          />
        )}
      </p>
      <p>{(updated_at || created_at).slice(0, 10).split("-").join(".")}</p>
      <div>
        <img
          src={
            listItemState === "isSelected"
              ? openedListItemIcon
              : closedListItemIcon
          }
          style={{ width: "21px", height: "12px" }}
        />
      </div>
    </ListItemRow>
  );
}

const Main = styled.main`
  padding: 23vh max(50vw - 534px, 30px) 30px;
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

const Mail = styled.a`
  font-weight: 500;
  text-decoration-line: underline;
`;

const AnnouncementList = styled.ol`
  margin-top: 50px;
  min-width: 970px;
`;

const ListRow = styled.li<{ $listItemState?: ListItemState }>`
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
  ${({ $listItemState }) =>
    $listItemState === "isSelected" && {
      color: "#222222",
      "font-weight": "500",
    }}
  ${({ $listItemState }) =>
    $listItemState === "SomethingElseSelected" && { color: "#9c9c9c" }}
  padding: 30px 0 32px 0;

  > p:first-child {
    padding-left: 30%;
  }
  > p:nth-child(2) {
    font-weight: 500;
    ${({ $listItemState }) =>
      $listItemState === "isSelected" && { "font-weight": "600" }}
  }
  > div:nth-child(4) {
    padding: 0 38%;
  }
`;

const NoAnnouncements = styled.div`
  border-bottom: 1px solid #c9c9c9;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  > p {
    color: #3c3c3c;
    font-weight: 500;
    font-size: 20px;
    line-height: 140%;
  }
`;

const MarkdownStyledWrapper = styled.div`
  p {
    margin-top: 46px;
    font-size: 18px;
    font-weight: normal;
    line-height: 185%;
    color: #373737;
    white-space: pre-wrap;
    work-break: keep-all;
  }
  a {
    text-decoration: underline;
    &:hover {
      color: #f0745f;
    }
  }
`;
