import { useQuery } from "react-query";

export default function Home() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["ping"],
    queryFn: () =>
      fetch("/ping")
        .then((res) => res.json())
        .then((data) => data.data),
  });

  return (
    <main>
      Home
      <div>ping: {isLoading ? "loading..." : error ? "error" : data}</div>
    </main>
  );
}
