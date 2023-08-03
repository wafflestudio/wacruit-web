import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useState } from "react";
import { LanguageSupport } from "@codemirror/language";

export const languages = ["Python", "C++", "Javascript"] as const;
export type Language = (typeof languages)[number];
export const languageSupports: Record<Language, LanguageSupport> = {
  Python: python(),
  "C++": cpp(),
  Javascript: javascript(),
};

export const languageCodes: Record<Language, number> = {
  "C++": 101,
  Javascript: 103,
  Python: 104,
};

// localStorage에 저장된 언어를 불러옴
function getStoredLanguage() {
  const storedLanguage = localStorage.getItem("language") ?? "";
  if (storedLanguage in languageSupports) {
    return storedLanguage as Language;
  }
  return "Python";
}

// localStorage에 저장된 언어를 React state로 캐시
export function useLanguage() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const _setLanguage = useCallback((language: Language) => {
    setLanguage(language);
    localStorage.setItem("language", language);
  }, []);
  return [language, _setLanguage] as const;
}
