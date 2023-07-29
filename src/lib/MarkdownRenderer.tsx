import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type MarkDownRendererProps = {
  markdownString: string;
};

export default function MarkDownRenderer({
  markdownString,
}: MarkDownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
      {markdownString}
    </ReactMarkdown>
  );
}
