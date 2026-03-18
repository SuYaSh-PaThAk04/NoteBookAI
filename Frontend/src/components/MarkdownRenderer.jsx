// components/MarkdownRenderer.jsx
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "../context/ThemeContext";

const MarkdownRenderer = ({ content }) => {
  const { darkMode } = useTheme();

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          return (
            <code
              className={`p-1 rounded font-mono ${
                inline
                  ? darkMode
                    ? "bg-gray-700 text-green-200"
                    : "bg-gray-200 text-green-700"
                  : darkMode
                  ? "bg-gray-800 text-green-300 block p-3 my-2 overflow-x-auto"
                  : "bg-gray-100 text-green-800 block p-3 my-2 overflow-x-auto"
              }`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
