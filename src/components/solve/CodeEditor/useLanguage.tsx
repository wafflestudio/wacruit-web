import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useState } from "react";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { java } from "@codemirror/lang-java";
import { c, kotlin } from "@codemirror/legacy-modes/mode/clike";
import { swift } from "@codemirror/legacy-modes/mode/swift";
import { LanguageCode, LanguageCodeV2 } from "../../../types/apiTypes";

export const languages = [
  "C",
  "C++",
  "Java",
  "Javascript",
  "Python",
  "Kotlin",
  "Swift",
] as const;
export type Language = (typeof languages)[number];
export const languageSupports: Record<
  Language,
  LanguageSupport | StreamLanguage<unknown> | null
> = {
  C: StreamLanguage.define(c),
  "C++": cpp(),
  Java: java(),
  Javascript: javascript(),
  Python: python(),
  Kotlin: StreamLanguage.define(kotlin),
  Swift: StreamLanguage.define(swift),
};

export const languageCodes: Record<Language, LanguageCode> = {
  C: LanguageCode.C,
  "C++": LanguageCode.CPP,
  Java: LanguageCode.JAVA,
  Javascript: LanguageCode.JAVASCRIPT,
  Python: LanguageCode.PYTHON,
  Kotlin: LanguageCode.KOTLIN,
  Swift: LanguageCode.SWFIT,
};

export const languageCodesV2: Record<Language, LanguageCodeV2> = {
  C: LanguageCodeV2.C,
  "C++": LanguageCodeV2.CPP,
  Java: LanguageCodeV2.JAVA,
  Javascript: LanguageCodeV2.JAVASCRIPT,
  Python: LanguageCodeV2.PYTHON,
  Kotlin: LanguageCodeV2.KOTLIN,
  Swift: LanguageCodeV2.SWIFT,
};

export const boilerplates: Record<Language, string> = {
  C: `#include <stdio.h>
#include <stdlib.h>

// 코드에서 한글은 전부 지워주세요
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
// 코드에서 한글은 전부 지워주세요 
class Main {
  public static void main(String[] args) {
    System.out.println("Hello World!");
  }
}`,
  Javascript: `// 코드에서 한글은 전부 지워주세요
console.log("Hello, world!");`,
  Python: `# 코드에서 한글은 전부 지워주세요
print("Hello, world!")`,
  Kotlin: `// 코드에서 한글은 전부 지워주세요
fun main(args: Array<String>) {
  println("Hello, world!")
}`,
  Swift: `// 코드에서 한글은 전부 지워주세요
print("Hello, world!")`,
};

export const languageVersions: Record<Language, string> = {
  C: "gcc 9.2.0",
  "C++": "g++ 9.2.0 (C++14)",
  Java: "OpenJDK 13.0.1",
  Javascript: "Node.js 18.15.0",
  Python: "Python 3.11.2",
  Kotlin: "Kotlin 1.3.70",
  Swift: "Swift 5.2.3",
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
