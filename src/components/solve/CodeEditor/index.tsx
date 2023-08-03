import { useCodeMirror } from "@uiw/react-codemirror";
import styled from "styled-components";
import LanguageSelection from "./LanguageSelection.tsx";
import { Language, languageSupports } from "./useLanguage.tsx";

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
  const { setContainer } = useCodeMirror({
    height: "100%",
    style: { height: "100%" },
    extensions: [languageSupports[language]],
    value: code,
    onChange: (v) => setCode(v),
  });
  return (
    <Section>
      {/* Header가 Editor를 가리도록, Header를 먼저 배치. 실제 렌더 위치는 grid에 의해 보정됨 */}
      <EditorWrapper ref={(elem) => setContainer(elem ?? undefined)} />
      <Header>
        <span>Script</span>
        <FullscreenButton
          onClick={() => setIsFullScreen(!isFullScreen)}
          $isFullScreen={isFullScreen}
        />
      </Header>
      <LanguageSelection
        language={language}
        onChange={(language) => setLanguage(language)}
      />
      {/* <EditorToggle value={isEditorOpen} onChange={(v) => setIsEditorOpen(v)} /> */}
    </Section>
  );
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
  background: url("/image/TabHeader.svg");

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
    font-weight: bold;
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

  .cm-editor * {
    font-family: monospace;
  }
`;

const FullscreenButton = styled.button<{ $isFullScreen: boolean }>`
  width: 20px;
  height: 20px;

  border: none;
  background: url("${(props) =>
    props.$isFullScreen
      ? "/icon/ExitFullScreen.svg"
      : "/icon/FullScreen.svg"}");
  cursor: pointer;
`;
