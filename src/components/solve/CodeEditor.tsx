import styled from "styled-components";
import LanguageSelection, { Language } from "./LanguageSelection.tsx";
import { useState } from "react";
import EditorToggle from "./EditorToggle.tsx";

interface Props {
  onFullscreenClick: () => void;
}

export default function CodeEditor(props: Props) {
  const [language, setLanguage] = useState<Language>("Python");
  const [isEditorOpen, setIsEditorOpen] = useState(true);
  return (
    <Section>
      {/* Header가 Editor를 가리도록, Header를 먼저 배치. 실제 렌더 위치는 grid에 의해 보정됨 */}
      <Editor>{'main() {\n  puts("Hello, world!");\n}'}</Editor>
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
  margin: 0 0 -4px 0; // 탭 헤더로 테두리 일부를 가린다
  background: url("/image/trapzoid.svg");
  display: flex;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  height: 47px;
  width: 293px;
  grid-row: 1;
  grid-column: 1;
  box-sizing: border-box;

  span {
    flex: 1;
  }
`;

const Editor = styled.pre`
  margin: 0;
  border: 4px solid #373737;
  border-bottom-width: 2px;
  border-radius: 0 4px 4px 4px;
  flex: 1;
  grid-row: 2;
  grid-column: 1 / 5;
  overflow: auto;
`;

const FullscreenButton = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background: url("/icon/FullScreen.svg");
  cursor: pointer;
`;
