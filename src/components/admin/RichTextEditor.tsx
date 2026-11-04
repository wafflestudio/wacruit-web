import { ReactNode, useEffect, useReducer, useRef, useState } from "react";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import styled from "styled-components";
import { FontSize } from "./fontSize";
import { ATTACHMENT_ACCEPT } from "./emailContent";
import LinkIcon from "../icons/admin/link.svg?react";
import ImageIcon from "../icons/admin/image.svg?react";

// 메일 안에서 크기가 들쭉날쭉하지 않도록 고른 값만 쓴다. 빈 값은 본문 기본 크기(14px)다
const FONT_SIZES = [
  { label: "작게", value: "12px" },
  { label: "보통", value: "" },
  { label: "크게", value: "18px" },
  { label: "아주 크게", value: "24px" },
];

// 흰 배경에서 읽기 어려운 색을 쓰지 않도록 대비가 충분한 색만 제공한다
const TEXT_COLORS = [
  { label: "회색", value: "#6b7280" },
  { label: "빨강", value: "#dc2626" },
  { label: "주황", value: "#ea580c" },
  { label: "초록", value: "#16a34a" },
  { label: "파랑", value: "#2563eb" },
  { label: "남색", value: "#1e3a8a" },
  { label: "보라", value: "#7c3aed" },
  { label: "분홍", value: "#db2777" },
];

const DEFAULT_TEXT_COLOR = "#222222";

const LIST_TYPES = [
  { label: "• 글머리 기호", name: "bulletList" },
  { label: "1. 번호 매기기", name: "orderedList" },
] as const;

/**
 * 서식 툴바가 붙은 메일 본문 편집기. 결과는 HTML 문자열로 넘긴다.
 * 본문 이미지는 onImageFiles가 검사·등록한 뒤 돌려준 주소로 넣는다
 */
export default function RichTextEditor({
  html,
  onChange,
  onImageFiles,
  isImageFull,
  placeholder,
}: {
  html: string;
  onChange: (html: string) => void;
  onImageFiles: (files: File[]) => Promise<string[]>;
  isImageFull: boolean;
  placeholder: string;
}) {
  // editorProps는 편집기를 만들 때 한 번만 읽히므로 최신 콜백을 ref로 넘긴다
  const onImageFilesRef = useRef(onImageFiles);
  onImageFilesRef.current = onImageFiles;
  const editorRef = useRef<Editor | null>(null);

  // pos가 없으면 커서 위치에 넣는다
  const insertImages = async (files: File[], pos?: number) => {
    const srcs = await onImageFilesRef.current(files);
    const editor = editorRef.current;
    if (!editor || editor.isDestroyed || srcs.length === 0) return;
    const content = srcs.map((src) => ({ type: "image", attrs: { src } }));
    const chain = editor.chain().focus();
    // 이미지를 읽는 사이 내용이 줄었을 수 있어 문서 끝을 넘지 않게 한다
    (pos === undefined
      ? chain.insertContent(content)
      : chain.insertContentAt(
          Math.min(pos, editor.state.doc.content.size),
          content,
        )
    ).run();
  };

  // 파일을 편집기에 놓거나 붙여넣으면 브라우저가 파일을 열어버리므로 본문 이미지로 넣는다
  const takeFiles = (fileList?: FileList | null, pos?: number) => {
    const files = Array.from(fileList ?? []);
    if (files.length === 0) return false;
    void insertImages(files, pos);
    return true;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
        blockquote: false,
        code: false,
        codeBlock: false,
        horizontalRule: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ["mailto"],
        HTMLAttributes: { target: "_blank", rel: "noopener noreferrer" },
      }),
      Placeholder.configure({ placeholder }),
      TextStyle,
      Color,
      FontSize,
      // 외부 주소 이미지는 그대로 두고, 붙여넣은 base64 이미지는 메일 용량을 키우므로 받지 않는다
      Image.configure({ allowBase64: false }),
    ],
    content: html,
    editorProps: {
      handleDrop: (view, event) => {
        const pos = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })?.pos;
        const handled = takeFiles(event.dataTransfer?.files, pos);
        if (handled) event.preventDefault();
        return handled;
      },
      handlePaste: (_view, event) => takeFiles(event.clipboardData?.files),
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });
  editorRef.current = editor;

  return (
    <Frame>
      <FormatToolbar
        editor={editor}
        onImageFiles={(files) => void insertImages(files)}
        isImageFull={isImageFull}
      />
      <Content editor={editor} />
    </Frame>
  );
}

type ToolbarButton = {
  label: ReactNode;
  title: string;
  isActive?: boolean;
  run: () => void;
  style?: "bold" | "italic" | "underline" | "strike";
};

const LINK_PROMPT = "링크 주소를 입력하세요. 비우면 링크를 해제합니다.";

function FormatToolbar({
  editor,
  onImageFiles,
  isImageFull,
}: {
  editor: Editor | null;
  onImageFiles: (files: File[]) => void;
  isImageFull: boolean;
}) {
  const [, rerender] = useReducer((n: number) => n + 1, 0);

  // 커서가 움직일 때마다 버튼의 활성 상태를 다시 계산한다
  useEffect(() => {
    if (!editor) return;
    editor.on("transaction", rerender);
    return () => {
      editor.off("transaction", rerender);
    };
  }, [editor]);

  const setLink = () => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href ?? "";
    const input = window.prompt(LINK_PROMPT, previous);
    if (input === null) return;
    const href = input.trim();
    const chain = editor.chain().focus().extendMarkRange("link");
    if (!href) {
      chain.unsetLink().run();
    } else if (editor.state.selection.empty && !editor.isActive("link")) {
      // 선택한 글자가 없으면 주소 자체를 링크 텍스트로 넣는다
      chain
        .insertContent({
          type: "text",
          text: href,
          marks: [{ type: "link", attrs: { href } }],
        })
        .run();
    } else {
      chain.setLink({ href }).run();
    }
  };

  const renderButton = ({
    label,
    title,
    isActive,
    run,
    style,
  }: ToolbarButton) => (
    <FormatButton
      key={title}
      type="button"
      title={title}
      aria-label={title}
      aria-pressed={isActive}
      $active={!!isActive}
      $style={style}
      // 버튼을 눌러도 편집기의 선택 영역이 유지되도록 포커스 이동을 막는다
      onMouseDown={(e) => e.preventDefault()}
      onClick={run}
    >
      {label}
    </FormatButton>
  );

  // 묶음 사이에 목록 선택 드롭다운과 이미지 버튼이 들어간다
  const [formatButtons, linkButtons, clearButtons]: ToolbarButton[][] = editor
    ? [
        [
          {
            label: "B",
            title: "굵게 (⌘B)",
            style: "bold",
            isActive: editor.isActive("bold"),
            run: () => editor.chain().focus().toggleBold().run(),
          },
          {
            label: "I",
            title: "기울임 (⌘I)",
            style: "italic",
            isActive: editor.isActive("italic"),
            run: () => editor.chain().focus().toggleItalic().run(),
          },
          {
            label: "U",
            title: "밑줄 (⌘U)",
            style: "underline",
            isActive: editor.isActive("underline"),
            run: () => editor.chain().focus().toggleUnderline().run(),
          },
          {
            label: "S",
            title: "취소선",
            style: "strike",
            isActive: editor.isActive("strike"),
            run: () => editor.chain().focus().toggleStrike().run(),
          },
          {
            label: "제목",
            title: "제목",
            isActive: editor.isActive("heading", { level: 2 }),
            run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          },
        ],
        [
          {
            label: <LinkIcon aria-hidden />,
            title: "링크",
            isActive: editor.isActive("link"),
            run: setLink,
          },
        ],
        [
          {
            label: "서식 지우기",
            title: "서식 지우기",
            run: () =>
              editor.chain().focus().unsetAllMarks().clearNodes().run(),
          },
        ],
      ]
    : [[], [], []];

  const fontSize: string = editor?.getAttributes("textStyle").fontSize ?? "";

  return (
    <Toolbar role="toolbar" aria-label="텍스트 서식">
      <SizeSelect
        aria-label="글자 크기"
        title="글자 크기"
        value={fontSize}
        onChange={(e) => {
          if (!editor) return;
          const { value } = e.target;
          const chain = editor.chain().focus();
          (value ? chain.setFontSize(value) : chain.unsetFontSize()).run();
        }}
      >
        {/* 직접 붙여넣은 HTML처럼 목록에 없는 크기는 그대로 보여준다 */}
        {fontSize && !FONT_SIZES.some(({ value }) => value === fontSize) && (
          <option value={fontSize}>{fontSize}</option>
        )}
        {FONT_SIZES.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </SizeSelect>
      {editor && <ColorPicker editor={editor} />}
      <Divider />
      {formatButtons.map(renderButton)}
      {editor && <ListPicker editor={editor} />}
      {linkButtons.map(renderButton)}
      <FormatButton
        as="label"
        title={
          isImageFull ? "이미지를 더 넣을 수 없습니다" : "본문에 이미지 넣기"
        }
        $active={false}
        $disabled={isImageFull}
        aria-label="본문에 이미지 넣기"
        onMouseDown={(e) => e.preventDefault()}
      >
        <ImageIcon aria-hidden />
        <input
          type="file"
          accept={ATTACHMENT_ACCEPT}
          multiple
          disabled={isImageFull}
          onChange={(e) => {
            onImageFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </FormatButton>
      {clearButtons.map(renderButton)}
    </Toolbar>
  );
}

/** 툴바 버튼에 붙는 팝오버의 열림 상태. 팝오버 밖을 누르면 닫는다 */
function usePopover() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const close = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [isOpen]);

  return { isOpen, setIsOpen, containerRef };
}

function ListPicker({ editor }: { editor: Editor }) {
  const { isOpen, setIsOpen, containerRef } = usePopover();
  const isList = LIST_TYPES.some(({ name }) => editor.isActive(name));

  // 같은 형태를 다시 고르면 목록을 해제하고, 다른 형태를 고르면 그 형태로 바꾼다
  const apply = (name: (typeof LIST_TYPES)[number]["name"]) => {
    const chain = editor.chain().focus();
    (name === "bulletList"
      ? chain.toggleBulletList()
      : chain.toggleOrderedList()
    ).run();
    setIsOpen(false);
  };

  return (
    <PopoverContainer ref={containerRef}>
      <FormatButton
        type="button"
        title="목록"
        aria-label="목록"
        aria-haspopup="true"
        aria-expanded={isOpen}
        $active={isOpen || isList}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsOpen(!isOpen)}
      >
        목록 ▾
      </FormatButton>
      {isOpen && (
        <ListMenu role="menu" aria-label="목록 형태">
          {LIST_TYPES.map(({ label, name }) => (
            <ListMenuItem
              key={name}
              type="button"
              role="menuitemradio"
              aria-checked={editor.isActive(name)}
              $selected={editor.isActive(name)}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => apply(name)}
            >
              {label}
            </ListMenuItem>
          ))}
        </ListMenu>
      )}
    </PopoverContainer>
  );
}

function ColorPicker({ editor }: { editor: Editor }) {
  const { isOpen, setIsOpen, containerRef } = usePopover();
  const color: string | undefined = editor.getAttributes("textStyle").color;

  const apply = (value?: string) => {
    const chain = editor.chain().focus();
    (value ? chain.setColor(value) : chain.unsetColor()).run();
    setIsOpen(false);
  };

  return (
    <PopoverContainer ref={containerRef}>
      <FormatButton
        type="button"
        title="글자 색"
        aria-label="글자 색"
        aria-haspopup="true"
        aria-expanded={isOpen}
        $active={isOpen}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ColorLetter $color={color ?? DEFAULT_TEXT_COLOR}>A</ColorLetter>
      </FormatButton>
      {isOpen && (
        <Palette role="menu" aria-label="글자 색">
          {TEXT_COLORS.map(({ label, value }) => (
            <Swatch
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={color === value}
              title={label}
              aria-label={label}
              $color={value}
              $selected={color === value}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => apply(value)}
            />
          ))}
          <ResetColorButton
            type="button"
            role="menuitemradio"
            aria-checked={!color}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => apply()}
          >
            기본색
          </ResetColorButton>
        </Palette>
      )}
    </PopoverContainer>
  );
}

const Frame = styled.div`
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2rem;
  min-height: 3.2rem;
  padding: 0.4rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
`;

const SizeSelect = styled.select`
  height: 2.8rem;
  padding: 0 0.4rem;
  border: none;
  border-radius: 0.4rem;
  background: none;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.black[200]};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
  }
`;

const Divider = styled.span`
  width: 0.1rem;
  height: 1.6rem;
  margin: 0 0.4rem;
  background: ${({ theme }) => theme.colors.black[200]};
`;

const PopoverContainer = styled.div`
  position: relative;
`;

const ColorLetter = styled.span<{ $color: string }>`
  display: inline-block;
  padding-bottom: 0.1rem;
  border-bottom: 0.3rem solid ${({ $color }) => $color};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
`;

const popoverBox = `
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: 1;
  border-radius: 0.6rem;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.12);
`;

const Palette = styled.div`
  ${popoverBox}
  display: grid;
  grid-template-columns: repeat(4, 2.4rem);
  gap: 0.6rem;
  padding: 1rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  background: ${({ theme }) => theme.colors.white};
`;

const ListMenu = styled.div`
  ${popoverBox}
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  background: ${({ theme }) => theme.colors.white};
`;

const ListMenuItem = styled.button<{ $selected: boolean }>`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.4rem;
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.black[200] : "none"};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[900]};
  text-align: left;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.black[200]};
  }

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
  }
`;

const Swatch = styled.button<{ $color: string; $selected: boolean }>`
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: ${({ theme, $selected }) =>
    $selected
      ? `0 0 0 0.2rem ${theme.colors.white}, 0 0 0 0.4rem ${theme.colors.black[900]}`
      : "none"};
  cursor: pointer;

  &:focus-visible {
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
    outline-offset: 0.2rem;
  }
`;

const ResetColorButton = styled.button`
  grid-column: 1 / -1;
  height: 2.8rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black[700]};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.black[100]};
  }
`;

const FormatButton = styled.button<{
  $active: boolean;
  $style?: "bold" | "italic" | "underline" | "strike";
  $disabled?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.8rem;
  height: 2.8rem;
  padding: 0 0.8rem;
  border: none;
  border-radius: 0.4rem;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.black[200] : "none"};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme, $style }) =>
    $style === "bold" ? theme.fontWeights.bold : theme.fontWeights.semibold};
  font-style: ${({ $style }) => ($style === "italic" ? "italic" : "normal")};
  text-decoration: ${({ $style }) =>
    $style === "underline"
      ? "underline"
      : $style === "strike"
      ? "line-through"
      : "none"};
  color: ${({ theme, $active, $disabled }) =>
    $disabled
      ? theme.colors.black[300]
      : $active
      ? theme.colors.black[900]
      : theme.colors.black[700]};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? "none" : theme.colors.black[200]};
  }

  &:focus-visible,
  &:focus-within {
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  /* 이미지 버튼의 파일 선택 input은 label로 열리므로 숨긴다 */
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }
`;

const Content = styled(EditorContent)`
  .ProseMirror {
    min-height: 32rem;
    padding: 1.2rem;
    font-size: ${({ theme }) => theme.fontSizes[14]};
    line-height: 160%;
    color: ${({ theme }) => theme.colors.black[900]};
    word-break: break-all;
    outline: none;
  }

  /* 발송되는 메일 HTML의 인라인 스타일(emailContent.ts)과 같은 모양을 유지한다 */
  p,
  ul,
  ol {
    margin: 0;
  }

  ul,
  ol {
    padding-left: 2.4rem;
  }

  /* 전역 스타일이 목록 기호를 지우므로 다시 켠다 */
  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  h2 {
    margin: 0 0 0.8rem;
    font-size: 2rem;
    line-height: 1.4;
  }

  a {
    color: #2383e2;
    text-decoration: underline;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  img.ProseMirror-selectednode {
    outline: 0.2rem solid #2383e2;
  }

  p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    height: 0;
    color: ${({ theme }) => theme.colors.black[300]};
    pointer-events: none;
  }
`;
