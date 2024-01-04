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
} from "../../../apis/portfolio";
import { LoadingBackgroundBlink } from "../../../lib/loading";
import { Recruiting } from "../../../types/apiTypes";

type PortfolioCardProps = {
  recruiting: Recruiting;
};

export default function PortfolioCard({ recruiting }: PortfolioCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

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

  const handleAPIError = (r: Response) => {
    r.json().then((res) => alert(res.detail));
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
    if (links) {
      const updated = linksInput.map((input, index) =>
        links.items[index] ? links.items[index] : { id: null, url: "" },
      );
      setLinksInput(updated);
    }
  }, [links]);

  if (files === undefined || links === undefined)
    return <EmptyCard></EmptyCard>;

  return (
    <Card $submit={submit}>
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
            if (!e.target.files) return;
            const targetFile = e.target.files[0];
            if (files.items.length < 1) {
              postPortfolioFile(targetFile, recruiting.id)
                .catch(handleAPIError)
                .finally(refetchFiles);
            } else {
              if (
                confirm(
                  "기존에 업로드한 포트폴리오가 삭제됩니다. 계속하시겠습니까?",
                )
              ) {
                deletePortfolioFile(files.items[0].id)
                  .then(() => postPortfolioFile(targetFile, recruiting.id))
                  .catch(handleAPIError)
                  .finally(refetchFiles);
              } else {
                e.target.value = "";
              }
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
                    alert("다운로드에 실패했습니다."),
                  );
                }}
              >
                {file_name}
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("포트폴리오를 삭제하시겠습니까?")) {
                      deletePortfolioFile(file_id)
                        .then(() => {
                          if (fileInputRef.current === null) return;
                          fileInputRef.current.value = "";
                        })
                        .catch(handleAPIError)
                        .finally(refetchFiles);
                    }
                  }}
                >
                  <img src="/icon/rookie/DeleteFile.svg" />
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
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  border: "0.1rem solid #D1D1D1";
  background: "#fff";
  gap: 1.4rem;
  &:hover {
    background: "#f6f6f6";
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
