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
      <Header>
        <HeaderTitle>Script</HeaderTitle>
        <LanguageSelection
          language={language}
          onChange={(language) => setLanguage(language)}
        />
        <Version>({languageVersions[language]})</Version>
        <FullscreenButton
          type="button"
          onClick={() => setIsFullScreen(!isFullScreen)}
          aria-label={isFullScreen ? "전체화면 끄기" : "전체화면"}
        >
          <img
            src={
              isFullScreen ? "/icon/ExitFullScreen.svg" : "/icon/FullScreen.svg"
            }
            alt=""
          />
        </FullscreenButton>
      </Header>
      <EditorWrapper ref={(elem) => setContainer(elem ?? undefined)} />
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const Header = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4.6rem;
  padding: 0 1.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black[200]};
`;

const HeaderTitle = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

const Version = styled.span`
  color: ${({ theme }) => theme.colors.black[500]};
  font-size: ${({ theme }) => theme.fontSizes[12]};
  white-space: nowrap;
`;

const FullscreenButton = styled.button`
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  margin-left: auto;
  border-radius: 0.4rem;
  cursor: pointer;

  img {
    width: 1.8rem;
    height: 1.8rem;
    opacity: 0.7;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;

const EditorWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  border-radius: 0 0 0.8rem 0.8rem;

  .cm-editor * {
    font-family: monospace;
    font-size: 1.3rem;
  }
`;
