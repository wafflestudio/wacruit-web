import Activity from "../components/home/Activity";
import Apply from "../components/home/Apply";
import Banner from "../components/home/Banner";
import Introduce from "../components/home/Introduce";
import Member from "../components/home/Member";
import Service from "../components/home/Service";
import ToHomePage from "../components/home/ToHomePage";
import useModals from "../components/Modal/useModals";
import Modal from "../components/Modal/Modal";
import NotificationModal from "../components/home/NotificationModal";
import { useEffect } from "react";
import Header from "../components/home/Header/Header";
import { getPinnedAnnouncements } from "../apis/announcement";
import { useQuery } from "@tanstack/react-query";

const LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE = "dontShowExpireDate";
const localStorageKeyOfAnnouncementId = (announcementId: number) =>
  `${LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE}_${announcementId}`;

export default function Home() {
  const { data: pinnedAnnouncements } = useQuery({
    queryKey: ["announcement", "pinned"],
    queryFn: () => getPinnedAnnouncements().then(),
    staleTime: 1,
    initialData: [],
  });
  const modalHandles = useModals(5, 0); // 최대 5개 띄운다
  // 공지와 모달핸들러를 하나씩 짝짓는다
  const announcementModalHandlePairs = [
    ...Array(pinnedAnnouncements?.length),
  ].map((_, idx) => ({
    announcement: pinnedAnnouncements[idx],
    modalHandle: modalHandles[idx],
  }));

  useEffect(() => {
    announcementModalHandlePairs.forEach(({ announcement, modalHandle }) => {
      // '오늘 그만보기'의 처리를 각 단위마다 실행
      const KEY = localStorageKeyOfAnnouncementId(announcement.id);
      const DONT_SHOW_MODAL_DATE = Number(localStorage.getItem(KEY));
      if (!DONT_SHOW_MODAL_DATE) {
        modalHandle.openModal();
      } else if (new Date().getDate() !== DONT_SHOW_MODAL_DATE) {
        modalHandle.openModal();
        localStorage.setItem(KEY, "");
      }
    });
    // api 응답이 성공했을 때 처리하기 위하여 dep array에 pinnedAnnouncements를 추가
  }, [pinnedAnnouncements]);

  return (
    <>
      <Header />
      <main style={{ minWidth: "920px" }}>
        {announcementModalHandlePairs
          .filter(({ announcement }) => {
            const KEY = localStorageKeyOfAnnouncementId(announcement.id);
            const DONT_SHOW_MODAL_DATE = Number(localStorage.getItem(KEY));
            return !DONT_SHOW_MODAL_DATE;
          })
          .map(({ announcement, modalHandle }, idx) => {
            return (
              <Modal
                key={idx}
                handle={modalHandle}
                onBackgroundClicked={() => void 0}
                // 가장 아래에 위치할 모달을 제외하고는 transparent로 처리
                modalContainerBackgroundColor={
                  idx === 0 ? "rgba(0, 0, 0, 0.15)" : "transparent"
                }
              >
                <NotificationModal
                  announcement={announcement}
                  index={idx} // 위치를 조금씩 옮겨주기 위한 prop
                  closeModal={modalHandle.closeModal}
                  setDontShowModalDate={(date: number) => {
                    const KEY = `${LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE}_${announcement.id}`;
                    localStorage.setItem(KEY, date.toString());
                  }}
                />
              </Modal>
            );
          })}
        <Banner />
        <Introduce />
        <Member />
        <Activity />
        <Service />
        <Apply />
        <ToHomePage />
      </main>
    </>
  );
}
