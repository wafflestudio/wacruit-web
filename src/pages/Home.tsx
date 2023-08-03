import Activity from "../components/home/Activity";
import Apply from "../components/home/Apply";
import Banner from "../components/home/Banner";
import Introduce from "../components/home/Introduce";
import Member from "../components/home/Member";
import Service from "../components/home/Service";
import ToHomePage from "../components/home/ToHomePage";
import useModal from "../components/Modal/useModal";
import Modal from "../components/Modal/Modal";
import NotificationModal from "../components/home/NotificationModal";
import { useEffect } from "react";
import Header from "../components/home/Header/Header";
import { getAllAnnouncements } from "../apis/announcement";
import { useQuery } from "react-query";

const LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE = "dontShowExpireDate";
// const LOCAL_STORAGE_KEY_LATEST_ANNOUNCEMENT_ID = "latestAnnouncementId";

export default function Home() {
  const modalHandle = useModal(0);
  // const ANNOUNCEMENT_ID = Number(
  //   localStorage.getItem(LOCAL_STORAGE_KEY_LATEST_ANNOUNCEMENT_ID),
  // );
  const DONT_SHOW_MODAL_DATE = Number(
    localStorage.getItem(LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE),
  );

  const { data: announcements } = useQuery({
    queryKey: ["announcement"],
    queryFn: () => getAllAnnouncements(),
    refetchInterval: 1000 * 5,
    staleTime: Infinity,
    retry: 0,
  });
  const latestAnnouncement = announcements ? announcements[0] : undefined;

  useEffect(() => {
    if (latestAnnouncement?.id)
      if (!DONT_SHOW_MODAL_DATE) {
        modalHandle.openModal();
      } else if (new Date().getDate() !== DONT_SHOW_MODAL_DATE) {
        modalHandle.openModal();
        localStorage.setItem(LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE, "");
      }
  }, []);

  return (
    <>
      <Header />
      <main style={{ minWidth: "920px" }}>
        <Modal
          handle={modalHandle}
          onBackgroundClicked={() => void 0}
          modalContainerBackgroundColor="rgba(0, 0, 0, 0.15)"
        >
          <NotificationModal
            closeModal={modalHandle.closeModal}
            setDontShowModalDate={(date: number) => {
              localStorage.setItem(
                LOCAL_STORAGE_KEY_DONT_SHOW_MODAL_DATE,
                date.toString(),
              );
            }}
          />
        </Modal>
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
