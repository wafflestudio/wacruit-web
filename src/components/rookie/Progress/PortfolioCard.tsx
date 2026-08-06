import styled from "styled-components";
import asset from "./progressCardAsset";
import { useEffect, useMemo, useRef, useState } from "react";
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
  const { description, iconSrc, iconAlt } = useMemo(
    () => (submit ? asset.portfolioSubmit : asset.portfolioNotSubmit),
    [submit],
  );

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

  const handleAPIError = async (error: unknown) => {
    openAlert(
      await resolveApiErrorMessage(
        error,
        "요청을 처리하지 못했습니다. 잠시 후 다시 시도해주세요.",
      ),
    );
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
    <Card $submit={submit}>
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
        <img src={iconSrc} alt={iconAlt} />
        <Name>포트폴리오</Name>
        <Description>{description}</Description>
      </InfoSection>
      <FileSection>
        <div>파일 첨부</div>
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
                  downloadPortfolioFile(file_id).catch(() =>
                    openAlert("다운로드에 실패했습니다."),
                  );
                }}
              >
                {file_name}
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
        <div>링크 첨부</div>
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
  position: relative;
  display: flex;
  width: 84rem;
  max-width: 100%;
  height: 19.3rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  animation: ${LoadingBackgroundBlink};
`;

const Card = styled.li<{
  $submit: boolean;
}>`
  position: relative;
  display: flex;
  width: 84rem;
  height: 19.3rem;
  flex-shrink: 0;
  border-radius: 0.5rem;
  border: 0.1rem solid #d1d1d1;
  padding: 2.7rem;
  max-width: 100%;
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  background: #fff;
  gap: 1.4rem;

  &:hover {
    background: #f6f6f6;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    height: auto;
  }
`;

const InfoSection = styled.div`
  width: 26.6rem;
`;

const FileSection = styled.div`
  width: 23.7rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 0.1rem solid #f6f6f6;
  gap: 0.8rem;
  color: #404040;
`;

const FileInputButton = styled.label`
  padding: 0.7rem 1.2rem;
  gap: 1rem;
  border-radius: 0.5rem;
  background: #f0745f;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 160%; /* 2.56rem */
  letter-spacing: 0.064rem;
  cursor: pointer;
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
  width: calc(100% - 1.5rem);
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0.5rem;
  gap: 0.6rem;
  background: #f6f6f6;
`;
const File = styled.div`
  padding: 0.4rem 0.8rem;
  border-radius: 2.5rem;
  border: 0.1rem solid #d1d1d1;
  background: #fff;
  color: #404040;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 160%; /* 1.92rem */
  letter-spacing: 0.048rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1rem;
  &:hover {
    opacity: 0.5;
  }
`;

const LinkSection = styled.div`
  width: 23.7rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;
  color: #404040;
`;

const LinkInput = styled.input`
  width: 26rem;
  padding: 0.7rem 1.2rem;
  color: #404040;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: 0.064rem;
  border: none;
  border-radius: 0.5rem;
  background: #f6f6f6;

  &::placeholder {
    color: #d9d9d9;
  }
`;

const Name = styled.h1`
  font-size: 2.4rem;
  font-weight: 600;
  margin-top: 1.6rem;
  margin-bottom: 0.7rem;
`;

const Description = styled.p`
  color: #737373;
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 160%; /* 2.2399999999999998rem */
  letter-spacing: 0.05600000000000001rem;
  margin: 0;
`;
