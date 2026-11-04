const ATTACHMENT_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
export const ATTACHMENT_ACCEPT = ".jpg,.jpeg,.png,.gif,.webp";
/** 첨부 이미지와 본문 이미지를 합친 최대 개수 */
export const MAX_ATTACHMENTS = 5;
const MAX_ATTACHMENT_BYTES = 1024 * 1024;
/** 서버가 MIME 인코딩 후 메일 전체에 거는 제한. 발송 접수 뒤에 검사하므로 넘으면 조용히 실패한다 */
export const MAX_EMAIL_BYTES = 2 * 1024 * 1024;
// 메일 헤더·MIME 경계 등 본문과 이미지 외에 붙는 몫
const EMAIL_OVERHEAD_BYTES = 16 * 1024;

/** 본문에 넣는 이미지. 편집기에서는 url(blob)로 보여주고, 메일에서는 cid로 참조한다 */
export type InlineImage = {
  cid: string;
  url: string;
  file: File;
  base64: string;
};

export type AttachedImage = {
  file: File;
  base64: string;
};

// 메일 클라이언트는 외부 CSS를 무시하는 경우가 많아 편집기 모양과 같아지도록 인라인 스타일을 넣는다
const EMAIL_TAG_STYLES: Record<string, string> = {
  p: "margin: 0;",
  h2: "margin: 0 0 8px; font-size: 20px; line-height: 1.4;",
  ul: "margin: 0; padding-left: 24px; list-style-type: disc;",
  ol: "margin: 0; padding-left: 24px; list-style-type: decimal;",
  a: "color: #2383e2; text-decoration: underline;",
  img: "display: block; max-width: 100%; height: auto;",
};

const EMAIL_WRAPPER_STYLE =
  "font-family: -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; " +
  "font-size: 14px; line-height: 1.6; color: #222222; word-break: break-all;";

const styleEmailHtml = (html: string, inlineImages: InlineImage[]) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.body.querySelectorAll("img").forEach((img) => {
    const image = inlineImages.find(
      ({ url }) => url === img.getAttribute("src"),
    );
    if (image) img.setAttribute("src", `cid:${image.cid}`);
  });
  Object.entries(EMAIL_TAG_STYLES).forEach(([tag, style]) =>
    doc.body
      .querySelectorAll(tag)
      .forEach((el) => el.setAttribute("style", style)),
  );
  // 크기·색을 지운 뒤 남는 속성 없는 span은 의미가 없으므로 풀어낸다
  doc.body
    .querySelectorAll("span:not([style])")
    .forEach((span) => span.replaceWith(...span.childNodes));
  // 빈 문단은 메일 클라이언트에서 높이가 0이 되므로 줄바꿈을 넣어 빈 줄을 유지한다
  doc.body
    .querySelectorAll("p:empty")
    .forEach((p) => p.append(doc.createElement("br")));
  return doc.body.innerHTML;
};

const hasImage = (html: string) => /<img\b/i.test(html);

/** 편집기 HTML에 메일용 인라인 스타일을 입히고, 본문 이미지의 주소를 cid 참조로 바꾼다 */
export const toEmailHtml = (
  editorHtml: string,
  inlineImages: InlineImage[],
) => {
  if (!htmlToText(editorHtml) && !hasImage(editorHtml)) return "";
  const html = `<div style="${EMAIL_WRAPPER_STYLE}">${styleEmailHtml(
    editorHtml,
    inlineImages,
  )}</div>`;
  // 코드 보기에서 읽고 고치기 쉽도록 블록 태그마다 줄을 바꾼다
  return html.replace(
    /(<\/(?:p|h2|ul|ol|li)>|<(?:div|ul|ol|img)\b[^>]*>)(?=<)/g,
    "$1\n",
  );
};

/** 메일 HTML이 cid로 참조하는 이미지 id 목록 (중복 제거) */
export const getCidRefs = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const cids = Array.from(doc.querySelectorAll("img"))
    .map((img) => img.getAttribute("src")?.trim() ?? "")
    .filter((src) => /^cid:/i.test(src))
    .map((src) => src.slice(4));
  return [...new Set(cids)];
};

/** 미리보기 iframe은 cid를 읽지 못하므로 이미지 데이터를 직접 넣는다 */
export const toPreviewHtml = (html: string, inlineImages: InlineImage[]) => {
  if (inlineImages.length === 0) return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src")?.trim() ?? "";
    const image = inlineImages.find(({ cid }) => src === `cid:${cid}`);
    if (image) {
      img.setAttribute("src", `data:${image.file.type};base64,${image.base64}`);
    }
  });
  return doc.documentElement.outerHTML;
};

const utf8Bytes = (text: string) => new TextEncoder().encode(text).length;

/** 파일을 Base64로 바꿨을 때의 길이 */
export const base64Length = (bytes: number) => Math.ceil(bytes / 3) * 4;

// Base64는 76자마다 줄바꿈(CRLF)이 들어간다
const wrappedBase64Bytes = (length: number) => Math.ceil((length * 78) / 76);

/**
 * 서버가 MIME으로 인코딩한 메일의 크기를 넉넉하게 어림한다.
 * 텍스트·HTML 본문도 Base64로 인코딩된다고 보고 계산한다
 */
export const estimateEmailBytes = (texts: string[], base64Lengths: number[]) =>
  EMAIL_OVERHEAD_BYTES +
  texts.reduce(
    (sum, text) => sum + wrappedBase64Bytes(base64Length(utf8Bytes(text))),
    0,
  ) +
  base64Lengths.reduce((sum, length) => sum + wrappedBase64Bytes(length), 0);

export const formatFileSize = (bytes: number) =>
  bytes < 1024
    ? `${bytes}B`
    : bytes < 1024 * 1024
    ? `${Math.round(bytes / 1024)}KB`
    : `${(bytes / 1024 / 1024).toFixed(1)}MB`;

/**
 * 이미 들어간 이미지(current)에 더해 files를 넣을 수 있는지 검사한다.
 * 개수와 이미지만으로 메일 용량을 넘는지를 함께 본다
 */
export const validateImages = (
  files: File[],
  current: { count: number; base64Lengths: number[] },
) => {
  const errors: string[] = [];
  const accepted: File[] = [];
  const base64Lengths = [...current.base64Lengths];
  files.forEach((file) => {
    const nextBytes = estimateEmailBytes(
      [],
      [...base64Lengths, base64Length(file.size)],
    );
    if (!ATTACHMENT_TYPES.includes(file.type)) {
      errors.push(`${file.name}: jpg, png, gif, webp만 첨부할 수 있습니다.`);
    } else if (file.size > MAX_ATTACHMENT_BYTES) {
      errors.push(`${file.name}: 1MB 이하 파일만 첨부할 수 있습니다.`);
    } else if (current.count + accepted.length >= MAX_ATTACHMENTS) {
      errors.push(
        `${file.name}: 이미지는 본문과 첨부를 합쳐 최대 ${MAX_ATTACHMENTS}개까지 넣을 수 있습니다.`,
      );
    } else if (nextBytes > MAX_EMAIL_BYTES) {
      errors.push(
        `${file.name}: 이미지를 합친 용량이 메일 최대 용량(2MB)을 넘습니다.`,
      );
    } else {
      accepted.push(file);
      base64Lengths.push(base64Length(file.size));
    }
  });
  return { accepted, errors };
};

const BLOCK_TAGS =
  "address,article,blockquote,div,footer,h1,h2,h3,h4,h5,h6,header,hr,li,ol,p,pre,section,table,tr,ul";

/** HTML 메일 본문에서 HTML을 표시하지 못하는 클라이언트용 텍스트 대체본을 만든다 */
export const htmlToText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  doc.querySelectorAll("head,script,style").forEach((el) => el.remove());

  // 소스의 들여쓰기·줄바꿈은 HTML에서 의미가 없으므로 먼저 공백 하나로 접는다
  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.parentElement?.closest("pre")) {
      node.nodeValue = (node.nodeValue ?? "").replace(/\s+/g, " ");
    }
  }

  doc.querySelectorAll("a[href]").forEach((a) => {
    const href = a.getAttribute("href") ?? "";
    if (/^https?:/.test(href) && a.textContent?.trim() !== href) {
      a.append(` (${href})`);
    }
  });
  doc.querySelectorAll("br").forEach((br) => br.replaceWith("\n"));
  doc.querySelectorAll(BLOCK_TAGS).forEach((el) => {
    el.prepend("\n");
    el.append("\n");
  });

  return (doc.body.textContent ?? "")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};
