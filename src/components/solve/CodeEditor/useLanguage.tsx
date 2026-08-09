import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useState } from "react";
import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { java } from "@codemirror/lang-java";
import { c, kotlin } from "@codemirror/legacy-modes/mode/clike";
// import { swift } from "@codemirror/legacy-modes/mode/swift";
import { rust } from "@codemirror/legacy-modes/mode/rust";
import { go } from "@codemirror/legacy-modes/mode/go";
import { LanguageCodeV2 } from "../../../apis/problem/problem.types";

export const languages = [
  "C",
  "C++",
  "Java",
  "Javascript",
  "Python",
  "Kotlin",
  // "Swift",
  "Rust",
  "Go",
  "Typescript",
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
  // Swift: StreamLanguage.define(swift),
  Rust: StreamLanguage.define(rust),
  Go: StreamLanguage.define(go),
  Typescript: javascript({ typescript: true }),
};

export const languageCodesV2: Record<Language, LanguageCodeV2> = {
  C: LanguageCodeV2.C,
  "C++": LanguageCodeV2.CPP,
  Java: LanguageCodeV2.JAVA,
  Javascript: LanguageCodeV2.JAVASCRIPT,
  Python: LanguageCodeV2.PYTHON,
  Kotlin: LanguageCodeV2.KOTLIN,
  // Swift: LanguageCodeV2.SWIFT,
  Rust: LanguageCodeV2.RUST,
  Go: LanguageCodeV2.GO,
  Typescript: LanguageCodeV2.TYPESCRIPT,
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
  "C++": `// c++ 17 버전으로 작성해주세요.
#include <iostream>
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
  // Swift: `// 코드에서 한글은 전부 지워주세요
  // print("Hello, world!")`,
  Rust: `// 코드에서 한글은 전부 지워주세요
fn main() {
    println!("Hello, world!");
}`,
  Go: `// 코드에서 한글은 전부 지워주세요
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`,
  Typescript: `// 코드에서 한글은 전부 지워주세요
console.log("Hello, world!");`,
};

export const languageVersions: Record<Language, string> = {
  C: "GCC 12",
  "C++": "g++ 12",
  Java: "Amazon Corretto 17",
  Javascript: "Node.js 20.18.0",
  Python: "CPython 3.12.13",
  Kotlin: "Kotlin 2.0.21",
  // Swift: "Swift 5.2.3",
  Rust: "rustc 1.81.0",
  Go: "Go 1.23.3",
  Typescript: "TypeScript 5.6.3",
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
