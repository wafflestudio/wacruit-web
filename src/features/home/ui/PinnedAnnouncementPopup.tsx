import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useAnnouncementQuery } from "../../../apis/announcement/announcement.query";
import { TAnnouncement } from "../../../apis/announcement/announcement.types";
import MarkdownRenderer from "../../../lib/MarkdownRenderer";
import { zIndex } from "../../../lib/zIndex";
import { useRouteNavigation } from "../../../shared/routes/useRouteNavigation";

const HIDE_DATE_KEY_PREFIX = "announcementPopupHiddenDate";
const hideDateKey = (announcementId: number) =>
  `${HIDE_DATE_KEY_PREFIX}_${announcementId}`;

const getTodayString = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${date}`;
};

const isHiddenToday = (announcementId: number) => {
  try {
    return (
      localStorage.getItem(hideDateKey(announcementId)) === getTodayString()
    );
  } catch {
    return false;
  }
};

const hideToday = (announcementIds: number[]) => {
  try {
    const today = getTodayString();
    announcementIds.forEach((id) =>
      localStorage.setItem(hideDateKey(id), today),
    );
  } catch {
    // localStorage에 접근할 수 없으면 '오늘 하루 보지 않기'를 저장하지 않고 넘어간다.
  }
};


let hasClosedInThisSession = false;

const CLOSING_TIME = 300;
const MAX_SIDE_BY_SIDE_COUNT = 2;

export const PinnedAnnouncementPopup = () => {
  const { useGetPinnedAnnouncements } = useAnnouncementQuery();
  const { data: pinnedAnnouncements } = useGetPinnedAnnouncements();
  const { toAnnouncement } = useRouteNavigation();

 
  const visibleAnnouncements = useMemo(
    () =>
      (pinnedAnnouncements ?? []).filter(
        (announcement) => !isHiddenToday(announcement.id),
      ),
    [pinnedAnnouncements],
  );

  const [openIds, setOpenIds] = useState<number[]>([]);
  const [closingIds, setClosingIds] = useState<number[]>([]);
  // 나란히 배치된 상태에서 닫힌 팝업은 자리만 차지하도록 남겨, 나머지 팝업의 위치가 바뀌지 않게 한다.
  const [placeholderIds, setPlaceholderIds] = useState<number[]>([]);
  // 처음 뜰 때의 공지 개수로 배치를 정해, 닫는 중에 배치가 바뀌지 않게 한다.
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    if (hasClosedInThisSession) return;
    setOpenIds(visibleAnnouncements.map(({ id }) => id));
    setIsStacked(visibleAnnouncements.length > MAX_SIDE_BY_SIDE_COUNT);
  }, [visibleAnnouncements]);

  const timeoutIds = useRef<number[]>([]);
  useEffect(() => () => timeoutIds.current.forEach(window.clearTimeout), []);

  const openAnnouncements = visibleAnnouncements.filter(({ id }) =>
    openIds.includes(id),
  );

  const closePopups = (ids: number[]) => {
    if (openIds.every((id) => ids.includes(id) || closingIds.includes(id))) {
      hasClosedInThisSession = true;
    }
    const shouldKeepPlace = !isStacked;
    setClosingIds((prev) => [...prev, ...ids]);
    timeoutIds.current.push(
      window.setTimeout(() => {
        setOpenIds((prev) => prev.filter((id) => !ids.includes(id)));
        setClosingIds((prev) => prev.filter((id) => !ids.includes(id)));
        if (shouldKeepPlace) setPlaceholderIds((prev) => [...prev, ...ids]);
      }, CLOSING_TIME),
    );
  };

  if (openAnnouncements.length === 0) return null;

  const renderedAnnouncements = visibleAnnouncements.filter(
    ({ id }) => openIds.includes(id) || placeholderIds.includes(id),
  );
  const isAllClosing = openIds.every((id) => closingIds.includes(id));

  return createPortal(
    <Overlay $isClosing={isAllClosing} onClick={() => closePopups(openIds)}>
      <PopupList $isStacked={isStacked}>
        {renderedAnnouncements.map((announcement, idx) => (
          <AnnouncementPopupCard
            key={announcement.id}
            announcement={announcement}
       
            stackOrder={renderedAnnouncements.length - idx}
            isClosing={closingIds.includes(announcement.id)}
            isPlaceholder={placeholderIds.includes(announcement.id)}
            onClose={() => closePopups([announcement.id])}
            onHideToday={() => {
              hideToday([announcement.id]);
              closePopups([announcement.id]);
            }}
            onShowDetail={() => {
              hasClosedInThisSession = true;
              toAnnouncement({ announcementId: announcement.id });
            }}
          />
        ))}
      </PopupList>
    </Overlay>,
    document.body,
  );
};

type AnnouncementPopupCardProps = {
  announcement: TAnnouncement;
  stackOrder: number;
  isClosing: boolean;
  isPlaceholder: boolean;
  onClose: () => void;
  onHideToday: () => void;
  onShowDetail: () => void;
};

const AnnouncementPopupCard = ({
  announcement,
  stackOrder,
  isClosing,
  isPlaceholder,
  onClose,
  onHideToday,
  onShowDetail,
}: AnnouncementPopupCardProps) => {
  return (
    <Article
      $isClosing={isClosing}
      $isPlaceholder={isPlaceholder}
      aria-hidden={isPlaceholder}
      style={{ zIndex: stackOrder }}
      onClick={(e) => e.stopPropagation()}
    >
      <Header>
        <TitleRow>
          <Label>공지사항</Label>
          <CloseButton type="button" onClick={onClose} aria-label="닫기">
            <img src="/icon/CloseModal.svg" alt="" />
          </CloseButton>
        </TitleRow>
        <Title>{announcement.title}</Title>
      </Header>
      <Content>
        <MarkdownRenderer
          markdownString={announcement.content}
          StyledWrapper={MarkdownStyledWrapper}
        />
      </Content>
      <Footer>
        <PrimaryButton type="button" onClick={onShowDetail}>
          자세히 보기
        </PrimaryButton>
        <TextButton type="button" onClick={onHideToday}>
          오늘 하루 보지 않기
        </TextButton>
      </Footer>
    </Article>
  );
};

const Overlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  display: flex;
  overflow-y: auto;
  padding: 4rem 2rem;
  container-type: inline-size;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: ${zIndex.modal};
  animation: announcement-popup-appear ${CLOSING_TIME}ms;
  transition: opacity ${CLOSING_TIME}ms;
  ${({ $isClosing }) => $isClosing && "opacity: 0; pointer-events: none;"}

  @keyframes announcement-popup-appear {
    from {
      opacity: 0;
    }
  }
`;

const stackedLayout = `
  display: grid;
  gap: 0;

  > * {
    grid-area: 1 / 1;
  }
`;

const PopupList = styled.div<{ $isStacked: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 2.4rem;
  margin: auto;
  ${({ $isStacked }) => $isStacked && stackedLayout}

  @media (max-width: 768px) {
    ${stackedLayout}
  }

  /* 카드 2장(44rem * 2)과 gap(2.4rem)이 한 줄에 들어가지 않아 줄바꿈되는 폭에서는 겹쳐서 보여준다. */
  @container (width < 904px) {
    ${stackedLayout}
  }
`;

const Article = styled.article<{
  $isClosing: boolean;
  $isPlaceholder: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 44rem;
  max-width: calc(100vw - 4rem);
  max-height: calc(100vh - 8rem);
  padding: 3.2rem;
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: left;
  transition: opacity ${CLOSING_TIME}ms;
  ${({ $isClosing }) => $isClosing && "opacity: 0; pointer-events: none;"}
  ${({ $isPlaceholder }) => $isPlaceholder && "visibility: hidden;"}
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
`;

const Label = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const CloseButton = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  margin-right: -0.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  img {
    width: 100%;
    height: 100%;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes[24]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  word-break: keep-all;
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const MarkdownStyledWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[16]};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.black[700]};

  p + p {
    margin-top: 1.2rem;
  }
  p,
  li {
    white-space: pre-wrap;
    word-break: keep-all;
  }
  strong {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.black[900]};
  }
  a {
    text-decoration: underline;
    text-underline-position: under;
    &:hover {
      color: ${({ theme }) => theme.colors.black[900]};
    }
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const PrimaryButton = styled.button`
  width: 100%;
  padding: 1.2rem 0;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.black[900]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes[16]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[700]};
  }
`;

const TextButton = styled.button`
  align-self: center;
  padding: 0.6rem 0.8rem;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  color: ${({ theme }) => theme.colors.black[500]};
  text-decoration: underline;
  text-underline-position: under;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.black[700]};
  }
`;
