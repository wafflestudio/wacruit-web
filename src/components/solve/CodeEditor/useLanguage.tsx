import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useState } from "react";
import { LanguageSupport } from "@codemirror/language";
import { java } from "@codemirror/lang-java";

export const languages = ["C", "C++", "Java", "Javascript", "Python"] as const;
export type Language = (typeof languages)[number];
export const languageSupports: Record<Language, LanguageSupport | null> = {
  C: cpp(),
  "C++": cpp(),
  Java: java(),
  Javascript: javascript(),
  Python: python(),
};

export const languageCodes: Record<Language, number> = {
  C: 50,
  "C++": 54,
  Java: 62,
  Javascript: 93,
  Python: 92
};

export const boilerplates: Record<Language, string> = {
  C: `#include <stdio.h>
#include <stdlib.h>

int main(void)
{
  printf("Hello World!\\n");
  return 0;
}
`,
  "C++": `#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main()
{
    cout << "Hello World!" << endl;
    return 0;
}`,
  Java: `// Java 클래스 이름은 반드시 Main으로 하여 제출해주세요
class Main {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}`,
  Javascript: `console.log("Hello, world!");`,
  Python: `print("Hello, world!")`,
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
