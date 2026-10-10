export type EmailBlock =
  | { id: string; type: "text"; text: string }
  | { id: string; type: "image"; file: File };

const ATTACHMENT_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
export const ATTACHMENT_ACCEPT = ".jpg,.jpeg,.png,.gif,.webp";
export const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_BYTES = 1024 * 1024;

let nextBlockId = 0;
const createBlockId = () => `email-block-${nextBlockId++}`;

export const createTextBlock = (text = ""): EmailBlock => ({
  id: createBlockId(),
  type: "text",
  text,
});

export const createImageBlock = (file: File): EmailBlock => ({
  id: createBlockId(),
  type: "image",
  file,
});

export const blocksToText = (blocks: EmailBlock[]) =>
  blocks
    .flatMap((block) =>
      block.type === "text" && block.text.trim() ? [block.text] : [],
    )
    .join("\n\n");

export const blocksToImages = (blocks: EmailBlock[]) =>
  blocks.flatMap((block) => (block.type === "image" ? [block.file] : []));

export const formatFileSize = (bytes: number) =>
  bytes < 1024 ? `${bytes}B` : `${Math.round(bytes / 1024)}KB`;

export const validateImages = (files: File[], currentCount: number) => {
  const errors: string[] = [];
  const accepted: File[] = [];
  files.forEach((file) => {
    if (!ATTACHMENT_TYPES.includes(file.type)) {
      errors.push(`${file.name}: jpg, png, gif, webp만 첨부할 수 있습니다.`);
    } else if (file.size > MAX_ATTACHMENT_BYTES) {
      errors.push(`${file.name}: 1MB 이하 파일만 첨부할 수 있습니다.`);
    } else if (currentCount + accepted.length >= MAX_ATTACHMENTS) {
      errors.push(
        `${file.name}: 이미지는 최대 ${MAX_ATTACHMENTS}개까지 첨부할 수 있습니다.`,
      );
    } else {
      accepted.push(file);
    }
  });
  return { accepted, errors };
};

export const moveBlock = (blocks: EmailBlock[], from: number, gap: number) => {
  const next = [...blocks];
  const [moved] = next.splice(from, 1);
  next.splice(gap > from ? gap - 1 : gap, 0, moved);
  return next;
};
