import { ReactNode } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html as htmlLanguage } from "@codemirror/lang-html";
import { EditorView } from "@codemirror/view";
import styled from "styled-components";

const extensions = [htmlLanguage(), EditorView.lineWrapping];

export type HtmlPanelView = "preview" | "code";

const VIEW_LABELS: Record<HtmlPanelView, string> = {
  preview: "미리보기",
  code: "코드",
};

/**
 * 발송될 HTML을 미리보기 또는 코드로 보여주는 패널. editable이면 코드를 직접 고칠 수 있다.
 * 미리보기는 cid 이미지를 그릴 수 있도록 바꾼 previewHtml을 쓴다
 */
export default function HtmlPanel({
  html,
  previewHtml,
  view,
  onViewChange,
  editable = false,
  onChange,
  action,
}: {
  html: string;
  previewHtml: string;
  view: HtmlPanelView;
  onViewChange: (view: HtmlPanelView) => void;
  editable?: boolean;
  onChange?: (html: string) => void;
  action?: ReactNode;
}) {
  return (
    <Panel>
      <PanelHeader>
        <Toggle role="tablist" aria-label="HTML 보기 방식">
          {(Object.keys(VIEW_LABELS) as HtmlPanelView[]).map((key) => (
            <ToggleButton
              key={key}
              type="button"
              role="tab"
              aria-selected={view === key}
              $active={view === key}
              onClick={() => onViewChange(key)}
            >
              {VIEW_LABELS[key]}
            </ToggleButton>
          ))}
        </Toggle>
        {action}
      </PanelHeader>
      {view === "preview" ? (
        <HtmlEmailPreview html={previewHtml} />
      ) : (
        <CodeFrame $editable={editable}>
          <CodeMirror
            value={html}
            onChange={onChange}
            extensions={extensions}
            editable={editable}
            readOnly={!editable}
            height="100%"
            style={{ height: "100%" }}
            placeholder={
              editable
                ? "HTML을 입력하세요."
                : "왼쪽에 본문을 입력하면 HTML 코드가 표시됩니다."
            }
            basicSetup={{
              foldGutter: false,
              highlightActiveLine: editable,
              highlightActiveLineGutter: editable,
            }}
          />
        </CodeFrame>
      )}
    </Panel>
  );
}

/** 작성한 HTML이 관리자 페이지에 영향을 주지 않도록 스크립트가 막힌 iframe에 그린다 */
export function HtmlEmailPreview({ html }: { html: string }) {
  return <PreviewFrame title="메일 본문 미리보기" sandbox="" srcDoc={html} />;
}

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 0;
  height: 100%;
`;

const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  min-height: 2.8rem;
`;

const Toggle = styled.div`
  display: flex;
  gap: 0.2rem;
  padding: 0.2rem;
  border-radius: 0.6rem;
  background: ${({ theme }) => theme.colors.black[100]};
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.4rem 1.2rem;
  border: none;
  border-radius: 0.4rem;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.white : "transparent"};
  box-shadow: ${({ $active }) =>
    $active ? "0 0.1rem 0.2rem rgba(0, 0, 0, 0.1)" : "none"};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.black[900] : theme.colors.black[500]};
  cursor: pointer;

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
  }
`;

const panelBox = `
  flex: 1;
  min-height: 40rem;
  border-radius: 0.4rem;
  box-sizing: border-box;
`;

const CodeFrame = styled.div<{ $editable: boolean }>`
  ${panelBox}
  overflow: hidden;
  border: 0.1rem solid
    ${({ theme, $editable }) =>
      $editable ? theme.colors.black[300] : theme.colors.black[200]};
  background: ${({ theme, $editable }) =>
    $editable ? theme.colors.white : theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[12]};

  /* CodeMirror 기본 배경이 흰색이라 읽기 전용일 때는 패널 배경을 그대로 보여준다 */
  .cm-editor,
  .cm-gutters {
    background: transparent;
  }

  .cm-focused {
    outline: none;
  }
`;

const PreviewFrame = styled.iframe`
  ${panelBox}
  display: block;
  width: 100%;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  background: ${({ theme }) => theme.colors.white};
`;
