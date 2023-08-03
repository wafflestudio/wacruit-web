import { TestCase } from "./common.tsx";
import { useCallback, useMemo, useState } from "react";

export function useCustomTestCases(problemNumber: number) {
  const customTestCasesKey = `customTestCasesOfProblemNumber${problemNumber}`;
  const storedCustomTestCases: TestCase[] = useMemo(
    () => JSON.parse(localStorage.getItem(customTestCasesKey) || "[]"),
    [customTestCasesKey],
  );

  const [customTestCases, setCustomTestCases] = useState<TestCase[]>(
    storedCustomTestCases,
  );

  const setCustomTestCasesWithLocalStorage = useCallback(
    (param: TestCase[] | ((prev: TestCase[]) => TestCase[])) => {
      const newTestCases: TestCase[] =
        typeof param === "function" ? param(customTestCases) : param;
      setCustomTestCases(newTestCases);
      localStorage.setItem(customTestCasesKey, JSON.stringify(newTestCases));
    },
    [customTestCases, customTestCasesKey],
  );
  return [customTestCases, setCustomTestCasesWithLocalStorage] as const;
}
