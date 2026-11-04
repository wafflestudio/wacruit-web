import { useEffect, useRef, useState } from "react";
import {
  AttachedImage,
  InlineImage,
  MAX_ATTACHMENTS,
  getCidRefs,
  validateImages,
} from "./emailContent";

const readBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.slice(dataUrl.indexOf(",") + 1));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

let cidSeq = 0;
// 서버 규칙: 첫 글자는 영문·숫자, 나머지는 영문·숫자·_.@- 만 허용
const createCid = () => `image${Date.now().toString(36)}${++cidSeq}`;

/**
 * 첨부 이미지와 본문 이미지를 함께 관리한다. 둘은 개수·용량 제한을 공유한다.
 * 본문 이미지는 편집기에서 지워도 되돌리기로 살아날 수 있어 목록에 남겨두고,
 * 발송할 메일 HTML이 실제로 참조하는 것만 세고 보낸다.
 * 메일 HTML은 본문 이미지의 cid에 따라 달라지므로 buildEmailHtml로 받아 여기서 만든다
 */
export function useEmailImages(
  buildEmailHtml: (inlineImages: InlineImage[]) => string,
) {
  const [attachments, setAttachments] = useState<AttachedImage[]>([]);
  const [inlineImages, setInlineImages] = useState<InlineImage[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const emailHtml = buildEmailHtml(inlineImages);
  const cidRefs = getCidRefs(emailHtml);
  const usedInlineImages = inlineImages.filter(({ cid }) =>
    cidRefs.includes(cid),
  );
  // HTML을 직접 고치다 없는 cid를 적으면 서버가 422로 거절한다
  const missingCids = cidRefs.filter(
    (cid) => !inlineImages.some((image) => image.cid === cid),
  );
  const imageCount = attachments.length + usedInlineImages.length;
  const isFull = imageCount >= MAX_ATTACHMENTS;

  const inlineImagesRef = useRef(inlineImages);
  inlineImagesRef.current = inlineImages;
  useEffect(
    () => () =>
      inlineImagesRef.current.forEach(({ url }) => URL.revokeObjectURL(url)),
    [],
  );

  const readImages = async (files: File[]) => {
    const { accepted, errors } = validateImages(files, {
      count: imageCount,
      base64Lengths: [...attachments, ...usedInlineImages].map(
        ({ base64 }) => base64.length,
      ),
    });
    const results = await Promise.allSettled(accepted.map(readBase64));
    const images: AttachedImage[] = [];
    results.forEach((result, index) => {
      const file = accepted[index];
      if (result.status === "fulfilled") {
        images.push({ file, base64: result.value });
      } else {
        errors.push(`${file.name}: 파일을 읽지 못했습니다.`);
      }
    });
    setErrors(errors);
    return images;
  };

  const addAttachments = async (files: File[]) => {
    const images = await readImages(files);
    setAttachments((prev) => [...prev, ...images]);
  };

  /** 본문에 넣을 이미지를 등록하고, 편집기에 넣을 수 있게 돌려준다 */
  const addInlineImages = async (files: File[]) => {
    const images: InlineImage[] = (await readImages(files)).map((image) => ({
      ...image,
      cid: createCid(),
      url: URL.createObjectURL(image.file),
    }));
    setInlineImages((prev) => [...prev, ...images]);
    return images;
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
    setErrors([]);
  };

  return {
    emailHtml,
    attachments,
    inlineImages,
    usedInlineImages,
    missingCids,
    imageCount,
    isFull,
    errors,
    addAttachments,
    addInlineImages,
    removeAttachment,
  };
}
