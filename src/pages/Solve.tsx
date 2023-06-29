import { useParams } from "react-router-dom";

export default function Solve() {
  const params = useParams();

  return (
    <main>Solve (problem number: {params.problem_number ?? "no number"})</main>
  );
}
