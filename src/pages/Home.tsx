import Activity from "../components/home/Activity";
import Apply from "../components/home/Apply";
import Banner from "../components/home/Banner";
import Introduce from "../components/home/Introduce";
import Member from "../components/home/Member";
import Service from "../components/home/Service";

export default function Home() {
  return (
    <main style={{ minWidth: "920px" }}>
      <Banner />
      <Introduce />
      <Member />
      <Activity />
      <Service />
      <Apply />
    </main>
  );
}
