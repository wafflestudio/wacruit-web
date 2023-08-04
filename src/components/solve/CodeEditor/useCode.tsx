import { useCallback, useMemo, useRef, useState } from "react";
import { boilerplates, Language } from "./useLanguage.tsx";

/* 사용자의 패닉을 막기 위해 코드와 사용하던 언어는 새로고침하거나 재접속해도 그대로 유지됨 */

// localStorage에 저장된 코드를 React state로 캐시
export function useCode(language: Language, problemNumber: number) {
  const [codes, setCodes] = useState<Partial<Record<Language, string>>>({});
  const code = codes[language];
  const setCode = useCallback(
    (code: string) => {
      setCodes((codes) => ({ ...codes, [language]: code }));
      localStorage.setItem(`code-lang:${language}-no:${problemNumber}`, code);
    },
    [language, problemNumber],
  );
  if (code === undefined) {
    setCodes({
      [language]: safeString(
        localStorage.getItem(`code-lang:${language}-no:${problemNumber}`),
        boilerplates[language],
      ),
      ...codes,
    });
  }
  return [code, setCode] as const;
}

export function useCodeRef(language: Language, problemNumber: number) {
  const codes = useRef<Partial<Record<Language, string>>>({});
  return useMemo(
    () => ({
      get current() {
        return (
          codes.current[language] ??
          safeString(
            localStorage.getItem(`code-lang:${language}-no:${problemNumber}`),
            boilerplates[language],
          )
        );
      },
      set current(newCode: string) {
        codes.current[language] = newCode;
        localStorage.setItem(
          `code-lang:${language}-no:${problemNumber}`,
          newCode,
        );
      },
    }),
    [language, problemNumber],
  );
}

// 문자열이면 그대로, 아니면 빈 문자열을 반환
function safeString(_s: unknown, or = "") {
  return typeof _s === "string" ? _s : or;
}
