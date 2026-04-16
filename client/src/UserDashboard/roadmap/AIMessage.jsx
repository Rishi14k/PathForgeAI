import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AIMessage = ({ content }) => {
  if (!content) return null;

  const formatted = content.replace(/\\n/g, "\n");

  return (
    <div className="prose prose-invert max-w-none break-words w-full overflow-hidden">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => (
            <div className="overflow-x-auto rounded-lg bg-black/40">
              <pre className="p-4 text-sm">{children}</pre>
            </div>
          ),

          code({ inline, children }) {
            return inline ? (
              <code className="bg-white/10 px-1 py-0.5 rounded">
                {children}
              </code>
            ) : (
              <code>{children}</code>
            );
          },

          p: ({ children }) => (
            <p className="whitespace-pre-wrap">{children}</p>
          ),
        }}
      >
        {formatted}
      </ReactMarkdown>
    </div>
  );
};

export default AIMessage;