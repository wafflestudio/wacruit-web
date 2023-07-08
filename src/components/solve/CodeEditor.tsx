import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { LanguageSupport } from "@codemirror/language";
import { useCodeMirror } from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import styled from "styled-components";
import EditorToggle from "./EditorToggle.tsx";
import LanguageSelection, { Language } from "./LanguageSelection.tsx";

interface Props {
  onFullscreenClick: () => void;
}

const languages: Record<Language, LanguageSupport> = {
  Python: python(),
  Java: java(),
  Javascript: javascript(),
};

export default function CodeEditor(props: Props) {
  const [language, setLanguage] = useLanguage();
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  const [code, setCode] = useCode(language);
  const { setContainer } = useCodeMirror({
    height: "100%",
    style: { height: "100%" },
    extensions: [languages[language]],
    value: code,
    onChange: (v) => setCode(v),
  });
  return (
    <Section>
      {/* Header가 Editor를 가리도록, Header를 먼저 배치. 실제 렌더 위치는 grid에 의해 보정됨 */}
      <EditorWrapper ref={(elem) => setContainer(elem ?? undefined)} />
      <Header>
        <span>Script</span>
        <FullscreenButton onClick={props.onFullscreenClick} />
      </Header>
      <LanguageSelection
        language={language}
        onChange={(language) => setLanguage(language)}
      />
      <EditorToggle value={isEditorOpen} onChange={(v) => setIsEditorOpen(v)} />
    </Section>
  );
}

/* 사용자의 패닉을 막기 위해 코드와 사용하던 언어는 새로고침하거나 재접속해도 그대로 유지됨 */

// 문자열이면 그대로, 아니면 빈 문자열을 반환
function safeString(_s: unknown) {
  return typeof _s === "string" ? _s : "";
}

// localStorage에 저장된 코드를 React state로 캐시
function useCode(language: Language) {
  const [codes, setCodes] = useState<Partial<Record<Language, string>>>({});
  const code = codes[language];
  const setCode = useCallback(
    (code: string) => {
      setCodes((codes) => ({ ...codes, [language]: code }));
      localStorage.setItem(`code-${language}`, code);
    },
    [language],
  );
  if (code === undefined) {
    setCodes({
      [language]: safeString(localStorage.getItem(`code-${language}`)),
      ...codes,
    });
  }
  return [code, setCode] as const;
}

// localStorage에 저장된 언어를 불러옴
function getStoredLanguage() {
  const storedLanguage = localStorage.getItem("language") ?? "";
  if (storedLanguage in languages) {
    return storedLanguage as Language;
  }
  return "Python";
}

// localStorage에 저장된 언어를 React state로 캐시
function useLanguage() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const _setLanguage = useCallback((language: Language) => {
    setLanguage(language);
    localStorage.setItem("language", language);
  }, []);
  return [language, _setLanguage] as const;
}

const Section = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto auto 1fr auto;

  min-width: 295px; // 탭 모양이 안 깨지는 크기

  /* Solve page layout */
  flex: 1;
  min-height: 0;
`;

const Header = styled.h3`
  background: url("/image/trapzoid.svg");

  display: flex;
  align-items: center;

  padding-left: 32px;
  padding-right: 32px;
  height: 47px;
  width: 293px;
  margin: 0 0 -4px 0; // 탭 헤더로 테두리 일부를 가린다
  box-sizing: border-box;

  grid-row: 1;
  grid-column: 1;

  span {
    flex: 1;
  }
`;

const EditorWrapper = styled.div`
  border: 4px solid #373737;
  border-bottom-width: 2px;
  border-radius: 0 4px 4px 4px;

  flex: 1;
  overflow: auto;
  margin: 0;

  grid-row: 2;
  grid-column: 1 / 5;
`;

const FullscreenButton = styled.button`
  width: 20px;
  height: 20px;

  border: none;
  background: url("/icon/FullScreen.svg");
  cursor: pointer;
`;
