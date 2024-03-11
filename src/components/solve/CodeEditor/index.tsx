import { useCodeMirror } from "@uiw/react-codemirror";
import styled from "styled-components";
import LanguageSelection from "./LanguageSelection.tsx";
import {
  Language,
  languageSupports,
  languageVersions,
} from "./useLanguage.tsx";

interface Props {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  code: string;
  setCode: (code: string) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

export default function CodeEditor({
  isFullScreen,
  setIsFullScreen,
  code,
  setCode,
  setLanguage,
  language,
}: Props) {
  // const [isEditorOpen, setIsEditorOpen] = useState(true);
  const lang = languageSupports[language];
  const { setContainer } = useCodeMirror({
    height: "100%",
    style: { height: "100%" },
    extensions: lang ? [lang] : [],
    value: code,
    onChange: (v) => setCode(v),
  });
  return (
    <Section>
      {/* Header가 Editor를 가리도록, Header를 먼저 배치. 실제 렌더 위치는 grid에 의해 보정됨 */}
      <EditorWrapper ref={(elem) => setContainer(elem ?? undefined)} />
      <Header>
        <HeaderTitle>Script</HeaderTitle>
        <FullscreenButton
          onClick={() => setIsFullScreen(!isFullScreen)}
          $isFullScreen={isFullScreen}
        />
      </Header>
      <LanguageSelection
        language={language}
        onChange={(language) => setLanguage(language)}
      />
      <Version>({languageVersions[language]})</Version>
      {/* <EditorToggle value={isEditorOpen} onChange={(v) => setIsEditorOpen(v)} /> */}
    </Section>
  );
}

const Section = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto auto 1fr auto;

  min-width: 29.5rem; // 탭 모양이 안 깨지는 크기

  /* Solve page layout */
  flex: 1;
  min-height: 0;
`;

const Header = styled.h3`
  background: url("/image/TabHeader.svg");
  background-size: 88.5rem;

  display: flex;
  align-items: center;

  padding-left: 3.2rem;
  padding-right: 3.2rem;
  height: 4.7rem;
  width: 29.3rem;
  margin: 0 0 -0.4rem 0; // 탭 헤더로 테두리 일부를 가린다
  box-sizing: border-box;

  grid-row: 1;
  grid-column: 1;

  span {
    font-weight: bold;
    flex: 1;
  }
`;

const HeaderTitle = styled.span`
  font-size: 1.6rem;
`;

const EditorWrapper = styled.div`
  border: 0.4rem solid #373737;
  border-bottom-width: 0.2rem;
  border-radius: 0 0.4rem 0.4rem 0.4rem;

  flex: 1;
  overflow: auto;
  margin: 0;

  grid-row: 2;
  grid-column: 1 / 5;

  .cm-editor * {
    font-family: monospace;
    font-size: 1.3rem;
  }
`;

const FullscreenButton = styled.button<{ $isFullScreen: boolean }>`
  width: 2rem;
  height: 2rem;

  border: none;
  background: url("${(props) =>
    props.$isFullScreen
      ? "/icon/ExitFullScreen.svg"
      : "/icon/FullScreen.svg"}");
  background-size: 2rem;
  cursor: pointer;
`;

const Version = styled.span`
  font-size: 1.2rem;
  color: #373737;
  margin-left: 0.8rem;
  display: flex;
  align-items: center;
`;
