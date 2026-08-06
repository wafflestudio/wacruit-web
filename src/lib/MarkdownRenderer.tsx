import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
import rehypeMathJax from "rehype-mathjax";
import type { Pluggable, PluggableList } from "unified";

const asPluggable = (p: unknown): Pluggable => p as Pluggable;

function preprocessMarkdown(src: string) {
  let s = src ?? "";

  // 1) 개행/공백 정규화
  s = s.replace(/\r\n?/g, "\n"); // CRLF/CR → LF
  s = s.replace(/\\n/g, "\n"); // 문자열로 들어온 "\n" → 실제 LF
  s = s.replace(/[\u2028\u2029]/g, "\n"); // 유니코드 line/paragraph separator → LF
  s = s.replace(/\u00A0/g, " "); // nbsp → 일반 공백
  s = s.replace(/[\u200B-\u200D\uFEFF]/g, ""); // zero-width chars 제거

  s = s.replace(
    /\\\[([\s\S]*?)\\\]/g,
    (_, expr: string) => "\n$$\n" + expr.trim() + "\n$$\n",
  );
  s = s.replace(
    /\\\(([\s\S]*?)\\\)/g,
    (_, expr: string) => "$" + expr.trim() + "$",
  );

  // 2) 얕은 HTML 래퍼 → 마크다운 문단/줄바꿈
  s = s.replace(/<br\s*\/?>/gi, "  \n"); // <br> → 마크다운 강제개행(스페이스2 + LF)
  s = s.replace(/<p[^>]*>/gi, "");
  s = s.replace(/<\/p>/gi, "\n\n");

  // 2.5) "1. 텍스트" 같은 입력이 자동으로 순서 리스트로 파싱되는 문제 방지
  s = s.replace(/^(\d+)\.\s/gm, "$1\\. ");

  // 3) ATX 헤딩(#) 뒤에 공백 강제 (예: "###2." → "### 2.")
  s = s.replace(/^(#{1,6})(?=[^#\s])/gm, "$1 "); // 줄 시작에서 #...# 다음에 공백 없으면 넣기

  // 4) 구분선(---)이 텍스트 사이에 끼어있으면 앞뒤에 빈 줄 확보
  s = s.replace(/\s*^---\s*$/gm, "\n---\n");

  return s.trim();
}

function CustomReactMarkdown({ markdownString }: { markdownString: string }) {
  const remarkPlugins: PluggableList = [
    asPluggable(remarkGfm),
    asPluggable(remarkBreaks),
    asPluggable(remarkMath),
  ];
  const rehypePlugins: PluggableList = [
    asPluggable(rehypeRaw),
    asPluggable(rehypeMathJax),
  ];

  const normalized = preprocessMarkdown(markdownString);

  return (
    <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins}>
      {normalized}
    </ReactMarkdown>
  );
}

export default function MarkdownRenderer({
  markdownString,
  StyledWrapper,
}: {
  markdownString: string;
  StyledWrapper?: React.ComponentType<{ children: React.ReactNode }>;
}) {
  const Wrapper = StyledWrapper ?? React.Fragment;
  return (
    <Wrapper>
      <CustomReactMarkdown markdownString={markdownString} />
    </Wrapper>
  );
}
