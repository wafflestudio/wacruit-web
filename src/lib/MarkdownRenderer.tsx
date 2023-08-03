import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { IStyledComponent, styled } from "styled-components";

type MarkdownRendererProps = {
  markdownString: string;
  StyledWrapper?: IStyledComponent<"web", "div">;
};

export default function MarkdownRenderer({
  markdownString,
  StyledWrapper,
}: MarkdownRendererProps) {
  if (StyledWrapper)
    return (
      <PreventGlobalStylesResetWrapper>
        <StyledWrapper>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {markdownString}
          </ReactMarkdown>
        </StyledWrapper>
      </PreventGlobalStylesResetWrapper>
    );
  else
    return (
      <PreventGlobalStylesResetWrapper>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {markdownString}
        </ReactMarkdown>
      </PreventGlobalStylesResetWrapper>
    );
}

// 그냥 user agent stylesheet 박아넣는 styled Component
const PreventGlobalStylesResetWrapper = styled.div`
  h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h4 {
    display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h5 {
    display: block;
    font-size: 0.83em;
    margin-block-start: 1.67em;
    margin-block-end: 1.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h6 {
    display: block;
    font-size: 0.67em;
    margin-block-start: 2.33em;
    margin-block-end: 2.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  em {
    font-style: italic;
  }
  strong {
    font-weight: bold;
  }
  ul {
    display: block;
    list-style: inside disc; // 공식 default는 outside이긴 하다.
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  ol {
    display: block;
    list-style: inside decimal; // 공식 default는 outside이긴 하다.
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  code {
    font-family: monospace;
  }
`;
