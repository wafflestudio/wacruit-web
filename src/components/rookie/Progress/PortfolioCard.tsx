import styled from "styled-components";
import asset from "./progressCardAsset";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePortfolioFile,
  deletePortfolioLink,
  downloadPortfolioFile,
  getPortfolioFiles,
  getPortfolioLinks,
  postPortfolioFile,
  postPortfolioLink,
  putPortfolioLink,
} from "../../../apis/portfolio/portfolio.api";
import { LoadingBackgroundBlink } from "../../../lib/loading";
import { Recruiting } from "../../../apis/recruiting/recruiting.types";
import Modal from "../../Modal/Modal";
import ConfirmModal from "../../Modal/ConfirmModal";
import AlertModal from "../../Modal/AlertModal";
import useModals from "../../Modal/useModals";
import { resolveApiErrorMessage } from "../../../lib/apiErrorMessage";
import { StatusTag } from "../../../shared/ui/tag/Tag";

type PortfolioCardProps = {
  recruiting: Recruiting;
};

export default function PortfolioCard({ recruiting }: PortfolioCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [replaceModal, deleteModal, alertModal] = useModals(3);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  const { data: files } = useQuery({
    queryKey: ["portfolio", "files", recruiting.id],
    queryFn: () => getPortfolioFiles(recruiting.id),
    staleTime: Infinity,
  });
  const { data: links } = useQuery({
    queryKey: ["portfolio", "links", recruiting.id],
    queryFn: () => getPortfolioLinks(recruiting.id),
    staleTime: Infinity,
  });

  const submit = files !== undefined && files.items.length > 0;
  const { variant, label } = submit
    ? asset.portfolioSubmit
    : asset.portfolioNotSubmit;

  const refetchFiles = () => {
    setTimeout(
      () => queryClient.refetchQueries(["portfolio", "files", recruiting.id]),
      100,
    );
  };

  const refetchLinks = () => {
    setTimeout(
      () => queryClient.refetchQueries(["portfolio", "links", recruiting.id]),
      100,
    );
  };

  const openAlert = (message: string) => {
    setAlertMessage(message);
    alertModal.openModal();
  };

  const handleAPIError = async (
    error: unknown,
    fallback = "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
  ) => {
    openAlert(await resolveApiErrorMessage(error, fallback));
  };

  const [linksInput, setLinksInput] = useState<
    {
      id: number | null;
      url: string;
    }[]
  >([
    { id: null, url: "" },
    { id: null, url: "" },
  ]);

  useEffect(() => {
    if (!links) return;
    setLinksInput((prev) =>
      prev.map((_, index) => links.items[index] ?? { id: null, url: "" }),
    );
  }, [links]);

  const clearFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const replaceFile = () => {
    replaceModal.closeModal();
    const target = pendingFile;
    const previousId = files?.items[0]?.id;
    setPendingFile(null);
    if (!target || previousId === undefined) return;
    deletePortfolioFile(previousId)
      .then(() => postPortfolioFile(target, recruiting.id))
      .catch(handleAPIError)
      .finally(refetchFiles);
  };

  const deleteFile = () => {
    deleteModal.closeModal();
    const target = deleteTargetId;
    setDeleteTargetId(null);
    if (target === null) return;
    deletePortfolioFile(target)
      .then(clearFileInput)
      .catch(handleAPIError)
      .finally(refetchFiles);
  };

  if (files === undefined || links === undefined)
    return <EmptyCard></EmptyCard>;

  return (
    <Card>
      <Modal
        handle={replaceModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
        onBackgroundClicked={() => {
          setPendingFile(null);
          replaceModal.closeModal();
        }}
      >
        <ConfirmModal
          title="포트폴리오를 교체할까요?"
          description="기존에 업로드한 포트폴리오가 삭제되고 새로 선택한 파일로 바뀝니다."
          confirmLabel="교체하기"
          onConfirm={replaceFile}
          onClose={() => {
            setPendingFile(null);
            replaceModal.closeModal();
          }}
        />
      </Modal>
      <Modal
        handle={deleteModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
        onBackgroundClicked={() => {
          setDeleteTargetId(null);
          deleteModal.closeModal();
        }}
      >
        <ConfirmModal
          title="포트폴리오를 삭제할까요?"
          description="업로드한 파일이 삭제되며 되돌릴 수 없습니다."
          confirmLabel="삭제하기"
          irreversible
          onConfirm={deleteFile}
          onClose={() => {
            setDeleteTargetId(null);
            deleteModal.closeModal();
          }}
        />
      </Modal>
      <Modal
        handle={alertModal}
        modalContainerBackgroundColor="rgba(0, 0, 0, 0.6)"
      >
        <AlertModal title={alertMessage} onClose={alertModal.closeModal} />
      </Modal>
      <InfoSection>
        <StatusTag $variant={variant}>{label}</StatusTag>
        <Name>포트폴리오</Name>
      </InfoSection>
      <FileSection>
        <SectionLabel>파일 첨부</SectionLabel>
        <FileInputButton htmlFor="portfolio">파일 선택</FileInputButton>
        <FileInput
          ref={fileInputRef}
          type="file"
          id="portfolio"
          onChange={(e) => {
            const targetFile = e.target.files?.[0];
            e.target.value = "";
            if (!targetFile) return;
            if (files.items.length < 1) {
              postPortfolioFile(targetFile, recruiting.id)
                .catch(handleAPIError)
                .finally(refetchFiles);
            } else {
              setPendingFile(targetFile);
              replaceModal.openModal();
            }
          }}
        />
        {files.items.length > 0 && (
          <Files>
            {files.items.map(({ id: file_id, file_name }) => (
              <File
                key={file_id}
                onClick={() => {
                  downloadPortfolioFile(file_id).catch((error: unknown) =>
                    handleAPIError(error, "다운로드에 실패했습니다."),
                  );
                }}
              >
                <FileName>{file_name}</FileName>
                <DeleteButton
                  aria-label="포트폴리오 삭제"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteTargetId(file_id);
                    deleteModal.openModal();
                  }}
                >
                  <img src="/icon/rookie/DeleteFile.svg" alt="" />
                </DeleteButton>
              </File>
            ))}
          </Files>
        )}
      </FileSection>

      <LinkSection>
        <SectionLabel>링크 첨부</SectionLabel>
        {linksInput.map((input, index) => (
          <LinkInput
            key={index}
            placeholder="https://example.com"
            value={input.url}
            onChange={(e) => {
              const copy = [...linksInput];
              copy[index].url = e.target.value;
              setLinksInput(copy);
            }}
            onBlur={() => {
              if (input.url.length < 1) {
                if (input.id === null) return;
                deletePortfolioLink(input.id)
                  .catch(handleAPIError)
                  .finally(refetchLinks);
                return;
              }
              if (input.id === null) {
                postPortfolioLink(input.url, recruiting.id)
                  .catch(handleAPIError)
                  .finally(refetchLinks);
              } else {
                putPortfolioLink(input.id, input.url, recruiting.id)
                  .catch(handleAPIError)
                  .finally(refetchLinks);
              }
            }}
          />
        ))}
      </LinkSection>
    </Card>
  );
}

const EmptyCard = styled.li`
  grid-column: span 3;
  min-height: 15rem;
  border-radius: 0.8rem;
  animation: ${LoadingBackgroundBlink};

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }
`;

const Card = styled.li`
  grid-column: span 3;
  display: grid;
  grid-template-columns: 14rem minmax(0, 1fr) minmax(0, 1fr);
  gap: 2.4rem;
  padding: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[200]};
  border-radius: 0.8rem;
  background-color: ${({ theme }) => theme.colors.white};

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

    > :first-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
    padding: 2rem;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.2rem;
`;

const Name = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[18]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.lineHeights.base};
`;

const SectionLabel = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const FileSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
`;

const FileInputButton = styled.label`
  padding: 0.8rem 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[900]};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[14]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.base};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.black[100]};
  }
`;

const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  padding: 0;
  border: 0;
  visibility: hidden;
`;

const Files = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  width: 100%;
`;

const File = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  max-width: 100%;
  padding: 0.6rem 1rem;
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.black[100]};
  color: ${({ theme }) => theme.colors.black[900]};
  font-size: ${({ theme }) => theme.fontSizes[13]};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const FileName = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const LinkSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1rem;
  min-width: 0;
`;

const LinkInput = styled.input`
  width: 100%;
  padding: 1rem 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.black[300]};
  border-radius: 0.4rem;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black[900]};
  font-family: inherit;
  font-size: ${({ theme }) => theme.fontSizes[14]};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.oak};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.black[500]};
  }
`;
