import Activity from "../components/home/Activity";
import Apply from "../components/home/Apply";
import Banner from "../components/home/Banner";
import Introduce from "../components/home/Introduce";
import Member from "../components/home/Member";
import Service from "../components/home/Service";
import ToHomePage from "../components/home/ToHomePage";
import useModal from "../components/Modal/useModal";
import Modal from "../components/Modal/Modal";
import NotificationModal from "../components/Modal/NotificationModal";
import { useEffect } from "react";

export default function Home() {
  const modalHandle = useModal(0);

  useEffect(() => {
    modalHandle.openModal();
  }, []);

  return (
    <main>
      <Modal
        handle={modalHandle}
        onBackgroundClicked={() => void 0}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.15)"
      >
        <NotificationModal closeModal={modalHandle.closeModal} />
      </Modal>
      <Banner />
      <Introduce />
      <Member />
      <Activity />
      <Service />
      <Apply />
      <ToHomePage />
    </main>
  );
}
