import {
  DragEvent,
  KeyboardEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import {
  ATTACHMENT_ACCEPT,
  EmailBlock,
  MAX_ATTACHMENTS,
  createImageBlock,
  createTextBlock,
  formatFileSize,
  moveBlock,
  validateImages,
} from "./emailBlocks";


export default function EmailBlockEditor({
  blocks,
  onChange,
}: {
  blocks: EmailBlock[];
  onChange: (blocks: EmailBlock[]) => void;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropGap, setDropGap] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const imageCount = blocks.filter((block) => block.type === "image").length;
  const draggingIndex = blocks.findIndex(({ id }) => id === draggingId);

  const insertImages = (files: File[], gap: number) => {
    const { accepted, errors } = validateImages(files, imageCount);
    const next = [...blocks];
    next.splice(gap, 0, ...accepted.map(createImageBlock));
    onChange(next);
    setErrors(errors);
  };

  const updateText = (id: string, text: string) =>
    onChange(
      blocks.map((block) =>
        block.id === id && block.type === "text" ? { ...block, text } : block,
      ),
    );

  const removeBlock = (id: string) => {
    const next = blocks.filter((block) => block.id !== id);
    onChange(next.length > 0 ? next : [createTextBlock()]);
    setErrors([]);
  };

  const isFileDrag = (e: DragEvent) =>
    draggingId === null && e.dataTransfer.types.includes("Files");

  const clearDrag = () => {
    setDraggingId(null);
    setDropGap(null);
  };

  const handleBlockDragOver = (e: DragEvent<HTMLElement>, index: number) => {
    if (draggingId === null && !isFileDrag(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = draggingId ? "move" : "copy";

    const rect = e.currentTarget.getBoundingClientRect();
    const gap = e.clientY < rect.top + rect.height / 2 ? index : index + 1;
    const isNoop =
      draggingIndex !== -1 &&
      (gap === draggingIndex || gap === draggingIndex + 1);
    setDropGap(isNoop ? null : gap);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (dropGap !== null) {
      if (draggingIndex !== -1) {
        onChange(moveBlock(blocks, draggingIndex, dropGap));
      } else if (e.dataTransfer.files.length > 0) {
        insertImages(Array.from(e.dataTransfer.files), dropGap);
      }
    }
    clearDrag();
  };

  const handleListDragLeave = (e: DragEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setDropGap(null);
    }
  };

  const handleHandleKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (e.key === "ArrowUp" && index > 0) {
      e.preventDefault();
      onChange(moveBlock(blocks, index, index - 1));
    } else if (e.key === "ArrowDown" && index < blocks.length - 1) {
      e.preventDefault();
      onChange(moveBlock(blocks, index, index + 2));
    }
  };

  return (
    <div>
      <BlockList
        onDragOver={(e) => {
          if (draggingId !== null || isFileDrag(e)) e.preventDefault();
        }}
        onDragLeave={handleListDragLeave}
        onDrop={handleDrop}
      >
        {blocks.map((block, index) => (
          <BlockRow
            key={block.id}
            data-email-block
            $dragging={block.id === draggingId}
            $dropBefore={dropGap === index}
            $dropAfter={
              dropGap === blocks.length && index === blocks.length - 1
            }
            onDragOver={(e) => handleBlockDragOver(e, index)}
          >
            <Handle
              type="button"
              draggable
              aria-label="드래그해서 순서 변경 (위/아래 방향키로도 이동)"
              title="드래그해서 순서 변경"
              onDragStart={(e) => {
                const row = e.currentTarget.closest("[data-email-block]");
                if (row) e.dataTransfer.setDragImage(row, 16, 16);
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", block.id);
                setDraggingId(block.id);
              }}
              onDragEnd={clearDrag}
              onKeyDown={(e) => handleHandleKeyDown(e, index)}
            >
              ⋮⋮
            </Handle>

            <BlockBody>
              {block.type === "text" ? (
                <AutoResizeTextarea
                  value={block.text}
                  onChange={(text) => updateText(block.id, text)}
                  placeholder={
                    blocks.length === 1 ? "메일 본문을 입력하세요" : "텍스트"
                  }
                />
              ) : (
                <ImageBlockBody>
                  <BlockImage file={block.file} />
                  <ImageMeta>
                    {block.file.name} · {formatFileSize(block.file.size)}
                  </ImageMeta>
                </ImageBlockBody>
              )}
            </BlockBody>

            <RemoveButton
              type="button"
              aria-label="블록 삭제"
              title="블록 삭제"
              onClick={() => removeBlock(block.id)}
            >
              ×
            </RemoveButton>
          </BlockRow>
        ))}
      </BlockList>

      <Toolbar>
        <ToolbarButton
          type="button"
          onClick={() => onChange([...blocks, createTextBlock()])}
        >
          + 텍스트
        </ToolbarButton>
        <ToolbarButton
          as="label"
          $disabled={imageCount >= MAX_ATTACHMENTS}
          aria-disabled={imageCount >= MAX_ATTACHMENTS}
        >
          + 이미지
          <input
            type="file"
            accept={ATTACHMENT_ACCEPT}
            multiple
            disabled={imageCount >= MAX_ATTACHMENTS}
            onChange={(e) => {
              insertImages(Array.from(e.target.files ?? []), blocks.length);
              e.target.value = "";
            }}
          />
        </ToolbarButton>
        <Hint>
          이미지 {imageCount}/{MAX_ATTACHMENTS} · jpg, png, gif, webp · 파일당
          1MB 이하
        </Hint>
      </Toolbar>

      {errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
    </div>
  );
}

/** 확인 단계에서 블록 순서 그대로 보여주는 읽기 전용 미리보기 */
export function EmailBlockPreview({ blocks }: { blocks: EmailBlock[] }) {
  return (
    <PreviewList>
      {blocks.map((block) =>
        block.type === "text" ? (
          block.text.trim() && (
            <PreviewText key={block.id}>{block.text}</PreviewText>
          )
        ) : (
          <BlockImage key={block.id} file={block.file} />
        ),
      )}
    </PreviewList>
  );
}

function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <TextInput
      ref={ref}
      rows={1}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function BlockImage({ file }: { file: File }) {
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return <Image src={src} alt={file.name} draggable={false} />;
}

const BlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.8rem 0;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
`;

const Handle = styled.button`
  flex-shrink: 0;
  width: 2.4rem;
  height: 2.8rem;
  padding: 0;
  border: none;
  border-radius: 0.4rem;
  background: none;
  font-size: ${({ theme }) => theme.fontSizes[12]};
  letter-spacing: -0.2rem;
  color: ${({ theme }) => theme.colors.black[500]};
  cursor: grab;
  opacity: 0;
  transition: opacity 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.black[200]};
  }

  &:focus-visible {
    opacity: 1;
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
  }

  &:active {
    cursor: grabbing;
  }
`;

const RemoveButton = styled.button`
  flex-shrink: 0;
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  border: none;
  border-radius: 0.4rem;
  background: none;
  font-size: ${({ theme }) => theme.fontSizes[20]};
  line-height: 1;
  color: ${({ theme }) => theme.colors.black[500]};
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.1s;

  &:hover {
    background: ${({ theme }) => theme.colors.black[200]};
    color: ${({ theme }) => theme.colors.black[900]};
  }

  &:focus-visible {
    opacity: 1;
  }
`;

const BlockRow = styled.div<{
  $dragging: boolean;
  $dropBefore: boolean;
  $dropAfter: boolean;
}>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem 0.4rem 0.4rem;
  opacity: ${({ $dragging }) => ($dragging ? 0.4 : 1)};

  &:hover ${Handle}, &:hover ${RemoveButton}, &:focus-within ${RemoveButton} {
    opacity: 1;
  }

  /* 놓일 위치를 노션처럼 파란 선으로 표시한다 */
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 3.2rem;
    right: 0.8rem;
    height: 0.3rem;
    border-radius: 0.2rem;
    background: #2383e2;
    pointer-events: none;
    opacity: 0;
  }

  &::before {
    top: -0.35rem;
    opacity: ${({ $dropBefore }) => ($dropBefore ? 1 : 0)};
  }

  &::after {
    bottom: -0.35rem;
    opacity: ${({ $dropAfter }) => ($dropAfter ? 1 : 0)};
  }
`;

const BlockBody = styled.div`
  flex: 1;
  min-width: 0;
`;

const TextInput = styled.textarea`
  display: block;
  width: 100%;
  min-height: 2.8rem;
  padding: 0.3rem 0.4rem;
  border: none;
  border-radius: 0.4rem;
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 160%;
  color: ${({ theme }) => theme.colors.black[900]};
  resize: none;
  overflow: hidden;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.black[100]};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[300]};
  }
`;

const ImageBlockBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.3rem 0.4rem;
`;

const Image = styled.img`
  display: block;
  /* flex 컬럼 안에서 늘어나지 않고 원본 크기를 넘지 않도록 한다 */
  align-self: flex-start;
  max-width: 100%;
  max-height: 32rem;
  border-radius: 0.4rem;
  object-fit: contain;
  background: ${({ theme }) => theme.colors.black[100]};
`;

const ImageMeta = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
  margin-top: 0.8rem;
`;

const ToolbarButton = styled.button<{ $disabled?: boolean }>`
  position: relative;
  padding: 0.6rem 1.2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.black[300] : theme.colors.black[900]};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    border-color: ${({ theme, $disabled }) =>
      $disabled ? theme.colors.black[300] : theme.colors.black[900]};
  }

  &:focus-within {
    outline: 0.2rem solid ${({ theme }) => theme.colors.black[900]};
    outline-offset: 0.2rem;
  }

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }
`;

const Hint = styled.span`
  font-size: ${({ theme }) => theme.fontSizes[12]};
  color: ${({ theme }) => theme.colors.black[500]};
`;

const ErrorMessage = styled.p`
  margin: 0.8rem 0 0;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.pink};
`;

const PreviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const PreviewText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[14]};
  line-height: 160%;
  color: ${({ theme }) => theme.colors.black[700]};
  white-space: pre-wrap;
  word-break: break-all;
`;
