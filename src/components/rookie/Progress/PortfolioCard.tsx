import styled from "styled-components";
import asset from "./progressCardAsset";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePortfolioFile,
  deletePortfolioLink,
  downloadPortfolioFile,
  getPortfolioFiles,
  getPortfolioLinks,
  postPortfolioFile,
  postPortfolioLink,
  uploadPortfolioFileToS3,
} from "../../../apis/portfolio";
import { LoadingBackgroundBlink } from "../../../lib/loading";

type PortfolioCardProps = {
  submit: boolean;
};

export default function PortfolioCard({ submit }: PortfolioCardProps) {
  const queryClient = useQueryClient();
  const { description, iconSrc, iconAlt } = useMemo(
    () => (submit ? asset.portfolioSubmit : asset.portfolioNotSubmit),
    [submit],
  );
  const { data: files } = useQuery({
    queryKey: ["portfolio", "files"],
    queryFn: () => getPortfolioFiles(),
    staleTime: Infinity,
  });
  const { data: links } = useQuery({
    queryKey: ["portfolio", "links"],
    queryFn: () => getPortfolioLinks(),
    staleTime: Infinity,
  });

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
        links.items[index] ? links.items[index] : input,
      );
      setLinksInput(updated);
    }
  }, [files, links]);

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
          type="file"
          id="portfolio"
          onChange={(e) => {
            if (!e.target.files) return;
            const targetFile = e.target.files[0];
            if (files.items.length < 1) {
              console.log(targetFile);
              postPortfolioFile(targetFile.name)
                .then((res) => {
                  uploadPortfolioFileToS3(
                    res.presigned_url,
                    res.fields,
                    targetFile,
                  );
                })
                .then(
                  () => {
                    queryClient.refetchQueries(["portfolio", "files"]);
                  },
                  (e) => console.log(e),
                );
            } else {
              if (
                confirm(
                  "기존에 업로드한 포트폴리오가 삭제됩니다. 계속하시겠습니까?",
                )
              ) {
                deletePortfolioFile(files.items[0].portfolio_name).finally(() =>
                  postPortfolioFile(targetFile.name)
                    .then((res) => {
                      uploadPortfolioFileToS3(
                        res.presigned_url,
                        res.fields,
                        targetFile,
                      );
                    })
                    .then(
                      () => {
                        queryClient.refetchQueries(["portfolio", "files"]);
                      },
                      (e) => console.log(e),
                    ),
                );
              } else {
                e.target.value = "";
              }
            }
          }}
        />
        {files.items.length > 0 && (
          <Files>
            {files.items.map(({ portfolio_name }) => (
              <File
                key={portfolio_name}
                onClick={() => {
                  downloadPortfolioFile("test.png")
                    .then(({ object_name, presigned_url }) => {
                      /**
                       * @TODO 정말 이 방법 밖에는 없는가?
                       */
                      const link = document.createElement("a");
                      link.href = presigned_url;
                      link.setAttribute("download", `${object_name}`);
                      document.body.appendChild(link);
                      link.click();
                      link.parentNode?.removeChild(link);
                    })
                    .catch(() => alert("다운로드에 실패했습니다."));
                }}
              >
                {portfolio_name}
                <DeleteButton
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("포트폴리오를 삭제하시겠습니까?")) {
                      deletePortfolioFile(portfolio_name).finally(() => {
                        console.log("refetch");
                        queryClient.refetchQueries(["portfolio", "files"]);
                      });
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
            placeholder="https://example.com"
            value={input.url}
            onChange={(e) => {
              const copy = [...linksInput];
              copy[index].url = e.target.value;
              setLinksInput(copy);
            }}
            onBlur={() => {
              if (input.url.length < 1) return;
              if (input.id === null) {
                postPortfolioLink(input.url);
              } else {
                deletePortfolioLink(input.id)
                  .finally(() => postPortfolioLink(input.url))
                  .then(
                    () => {
                      void queryClient.refetchQueries(["portfolio", "links"]);
                    },
                    (e) => console.log(e),
                  );
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
  width: 840px;
  height: 193px;
  flex-shrink: 0;
  border-radius: 5px;
  animation: ${LoadingBackgroundBlink};
`;

const Card = styled.li<{
  $submit: boolean;
}>`
  position: relative;
  display: flex;
  width: 840px;
  height: 193px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  padding: 27px;
  color: ${(props) => (props.$submit ? "#64CB3F" : "#F0745F")};
  border: "1px solid #D1D1D1";
  background: "#fff";
  gap: 14px;
  &:hover {
    background: "#f6f6f6";
  }
`;

const InfoSection = styled.div`
  width: 266px;
`;

const FileSection = styled.div`
  width: 237px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-right: 1px solid #f6f6f6;
  gap: 8px;
  color: #404040;
`;

const FileInputButton = styled.label`
  padding: 7px 12px;
  gap: 10px;
  border-radius: 5px;
  background: #f0745f;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
  cursor: pointer;
`;
const FileInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  padding: 0;
  border: 0;
`;
const Files = styled.div`
  width: calc(100% - 15px);
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  gap: 6px;
  background: #f6f6f6;
`;
const File = styled.div`
  padding: 4px 8px;
  border-radius: 25px;
  border: 1px solid #d1d1d1;
  background: #fff;
  color: #404040;
  font-size: 12px;
  font-weight: 400;
  line-height: 160%; /* 19.2px */
  letter-spacing: 0.48px;
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const LinkSection = styled.div`
  width: 237px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  color: #404040;
`;

const LinkInput = styled.input`
  width: 260px;
  padding: 7px 12px;
  color: #404040;
  font-size: 16px;
  font-weight: 400;
  line-height: 160%; /* 25.6px */
  letter-spacing: 0.64px;
  border: none;
  border-radius: 5px;
  background: #f6f6f6;

  &::placeholder {
    color: #d9d9d9;
  }
`;

const Name = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 7px;
`;

const Description = styled.p`
  color: #737373;
  font-size: 14px;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: 0.56px;
  margin: 0;
`;
