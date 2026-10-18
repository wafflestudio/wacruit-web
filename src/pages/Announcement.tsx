import { styled } from "styled-components";
import { useState } from "react";
import { TAnnouncement } from "../apis/announcement/announcement.types";
import { useQuery } from "@tanstack/react-query";
import { getAllAnnouncements } from "../apis/announcement/announcement.api";
import MarkdownRenderer from "../lib/MarkdownRenderer";
import { MAIL_RECRUIT } from "../common/const";
import { generateMailUrl } from "../common/utils";
import { useLocation } from "react-router-dom";
import { AnnouncementLocationState } from "../shared/routes/useRouteNavigation";
import Headerv2 from "../shared/ui/header/HeaderV2";
import HeaderSpacer from "../shared/ui/header/HeaderSpacer";

export default function Announcement() {
  const { data: announcements } = useQuery({
    queryKey: ["announcement", "all"],
    queryFn: () => getAllAnnouncements(),
    staleTime: 1,
  });
  const location = useLocation();
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(
    (location.state as AnnouncementLocationState | null)?.announcementId,
  );

  const sortedAnnouncements = [...(announcements ?? [])].sort(
    (a, b) =>
      Number(b.pinned) - Number(a.pinned) ||
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <>
      <Headerv2 />
      <HeaderSpacer />
      <Main>
        <Content>
          <Heading>
            <Title>공지사항</Title>
            <Description>
              찾는 공지가 없다면{" "}
              <Mail href={generateMailUrl(MAIL_RECRUIT)}>{MAIL_RECRUIT}</Mail>{" "}
              이메일로 문의주세요.
            </Description>
          </Heading>
          <AnnouncementList>
            <ListHeaderRow aria-hidden="true">
              <span>NO.</span>
              <span>제목</span>
              <span>등록일</span>
              <span />
            </ListHeaderRow>
            {announcements &&
              (announcements.length === 0 ? (
                <NoAnnouncements>등록된 공지사항이 없습니다.</NoAnnouncements>
              ) : (
                sortedAnnouncements.map((announcement) => (
                  <ListItem
                    key={announcement.id}
                    announcement={announcement}
                    isOpen={announcement.id === selectedAnnouncementId}
                    onToggle={() => {
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
        </Content>
      </Main>
    </>
  );
}

type ListItemProps = {
  announcement: TAnnouncement;
  isOpen: boolean;
  onToggle: () => void;
};

const pinIcon = (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M16 3a1 1 0 0 1 .7 1.7L15 6.4v4.2l2.7 2.7a1 1 0 0 1 .3.7v1a1 1 0 0 1-1 1h-4v4.3a1 1 0 0 1-2 0V16H7a1 1 0 0 1-1-1v-1a1 1 0 0 1 .3-.7L9 10.6V6.4L7.3 4.7A1 1 0 0 1 8 3h8Z" />
  </svg>
);

function ListItem({ announcement, isOpen, onToggle }: ListItemProps) {
  // TODO: 공지 여러 개 한꺼번에 확인 불가?
  const { id, title, content, pinned, created_at } = announcement;
  const date = created_at.slice(0, 10).split("-").join(".");
  const bodyId = `announcement-${id}`;

  return (
    <Item>
      <Row
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={bodyId}
      >
        <NumberCell>
          {pinned ? (
            <PinTag role="img" aria-label="고정 공지">
              {pinIcon}
            </PinTag>
          ) : (
            id
          )}
        </NumberCell>
        <ItemTitle $isOpen={isOpen}>
          {pinned && (
            <MobilePinTag role="img" aria-label="고정 공지">
              {pinIcon}
            </MobilePinTag>
          )}
          {title}
        </ItemTitle>
        <ItemDate>{date}</ItemDate>
        <Chevron $isOpen={isOpen} aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </Chevron>
      </Row>
      {isOpen && (
        <Body id={bodyId}>
          <MarkdownRenderer
            markdownString={content}
            StyledWrapper={MarkdownStyledWrapper}
          />
        </Body>
      )}
    </Item>
  );
}

const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 7.2rem 2rem 10.4rem;

  @media (max-width: 768px) {
    padding: 4rem 2rem 7.2rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 100%;
  max-width: 100rem;

  @media (max-width: 768px) {
    gap: 3.2rem;
  }
`;

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[32]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes[24]};
  }
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const Mail = styled.a`
  color: ${({ theme }) => theme.colors.black[900]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-decoration: underline;
  text-underline-offset: 0.3rem;
`;

const AnnouncementList = styled.ol`
  margin: 0;
  padding: 0;
  border-top: 2px solid ${({ theme }) => theme.colors.black[900]};
  list-style: none;
`;

const rowColumns = `
  display: grid;
  grid-template-columns: 6.4rem minmax(0, 1fr) 11.2rem 3.2rem;
  gap: 1.6rem;
  align-items: center;
`;

const ListHeaderRow = styled.li`
  ${rowColumns}
  padding: 1.4rem 0.8rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  > :nth-child(1),
  > :nth-child(3) {
    text-align: center;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
`;

const Row = styled.button`
  ${rowColumns}
  width: 100%;
  padding: 1.8rem 0.8rem;
  font-family: inherit;
  text-align: left;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.oak};
    outline-offset: -2px;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 2.4rem;
    grid-template-areas:
      "title chevron"
      "date chevron";
    gap: 0.4rem 1.2rem;
    padding: 1.6rem 0.4rem;
  }
`;

const NumberCell = styled.span`
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-align: center;
  font-variant-numeric: tabular-nums;

  @media (max-width: 768px) {
    display: none;
  }
`;

const PinTag = styled.span`
  display: inline-grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  color: ${({ theme }) => theme.colors.black[900]};
  vertical-align: middle;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

const MobilePinTag = styled(PinTag)`
  display: none;
  width: 2.2rem;
  height: 2.2rem;
  margin-right: 0.6rem;

  @media (max-width: 768px) {
    display: inline-grid;
  }
`;

const ItemTitle = styled.span<{ $isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ $isOpen, theme }) =>
    $isOpen ? theme.fontWeights.bold : theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};

  ${Row}:hover & {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }

  @media (max-width: 768px) {
    grid-area: title;
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;

const ItemDate = styled.span`
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  text-align: center;
  font-variant-numeric: tabular-nums;

  @media (max-width: 768px) {
    grid-area: date;
    font-size: ${({ theme }) => theme.fontSizes[13]};
    text-align: left;
  }
`;

const Chevron = styled.span<{ $isOpen: boolean }>`
  display: grid;
  place-items: center;
  color: ${({ theme }) => theme.colors.black[700]};
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0deg")});
  transition: transform 0.2s ease;

  @media (max-width: 768px) {
    grid-area: chevron;
  }
`;

const Body = styled.div`
  padding: 0 0.8rem 2.4rem calc(6.4rem + 1.6rem + 0.8rem);

  @media (max-width: 768px) {
    padding: 0 0 2rem;
  }
`;

const NoAnnouncements = styled.li`
  padding: 12rem 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
  color: ${({ theme }) => theme.colors.black[700]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  text-align: center;
`;

const MarkdownStyledWrapper = styled.div`
  padding: 2.2rem 2.6rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 1.8;
  word-break: keep-all;

  p {
    margin: 0;
    white-space: pre-wrap;
  }
  p + p {
    margin-top: 0.8rem;
  }
  ul,
  ol {
    margin: 0.4rem 0;
    padding-left: 2rem;
    list-style: disc;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }

  @media (max-width: 768px) {
    padding: 1.8rem 2rem;
    font-size: ${({ theme }) => theme.fontSizes[14]};
  }
`;
