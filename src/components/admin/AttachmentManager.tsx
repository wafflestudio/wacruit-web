import styled from "styled-components";
import {
  ATTACHMENT_ACCEPT,
  MAX_ATTACHMENTS,
  formatFileSize,
} from "./emailContent";
import type { useEmailImages } from "./useEmailImages";

/** 본문과 별도로 보내는 첨부 이미지 목록. 개수 제한은 본문 이미지와 함께 센다 */
export default function AttachmentManager({
  attachments,
  imageCount,
  isFull: isImageFull,
  errors,
  addAttachments,
  removeAttachment,
}: ReturnType<typeof useEmailImages>) {
  return (
    <Attachments>
      {attachments.length > 0 && (
        <AttachmentList>
          {attachments.map(({ file }, index) => (
            <AttachmentItem key={`${file.name}-${index}`}>
              <span>
                {file.name} · {formatFileSize(file.size)}
              </span>
              <RemoveButton
                type="button"
                aria-label={`${file.name} 삭제`}
                title="삭제"
                onClick={() => removeAttachment(index)}
              >
                ×
              </RemoveButton>
            </AttachmentItem>
          ))}
        </AttachmentList>
      )}
      <Toolbar>
        <ToolbarButton
          as="label"
          $disabled={isImageFull}
          aria-disabled={isImageFull}
        >
          + 첨부파일
          <input
            type="file"
            accept={ATTACHMENT_ACCEPT}
            multiple
            disabled={isImageFull}
            onChange={(e) => {
              void addAttachments(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
        </ToolbarButton>
        <Hint>
          본문·첨부 이미지 {imageCount}/{MAX_ATTACHMENTS} · jpg, png, gif, webp
          · 파일당 1MB 이하
          <br />
          본문에 넣으려면 편집기의 이미지 버튼을 쓰거나 편집기에 끌어다 놓으세요
        </Hint>
      </Toolbar>
      {errors.map((error) => (
        <ErrorMessage key={error}>{error}</ErrorMessage>
      ))}
    </Attachments>
  );
}

const Attachments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const AttachmentList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const AttachmentItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 0.4rem 0.4rem 0.4rem 1.2rem;
  border-radius: 0.4rem;
  background: ${({ theme }) => theme.colors.black[100]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.black[700]};
  word-break: break-all;
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

  &:hover {
    background: ${({ theme }) => theme.colors.black[200]};
    color: ${({ theme }) => theme.colors.black[900]};
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.8rem;
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
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes[13]};
  color: ${({ theme }) => theme.colors.pink};
`;
