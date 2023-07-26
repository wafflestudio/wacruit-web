import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { IStyledComponent } from "styled-components";

type MarkDownRendererProps = {
  StyledComponent?: IStyledComponent<"web", string>;
  markdownString: string;
};

export default function MarkDownRenderer({
  StyledComponent,
  markdownString,
}: MarkDownRendererProps) {
  if (StyledComponent !== undefined)
    return (
      <StyledComponent>
        <ReactMarkdown children={markdownString} remarkPlugins={[remarkGfm]} />
      </StyledComponent>
    );
  else
    return (
      <ReactMarkdown children={markdownString} remarkPlugins={[remarkGfm]} />
    );
}
