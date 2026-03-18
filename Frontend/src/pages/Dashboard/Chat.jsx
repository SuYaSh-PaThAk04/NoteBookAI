import React, { useState, useRef, useEffect } from "react";
import { OctagonX, Send } from "lucide-react";
import { getAnswer, reset } from "../../api/api";
import { useTheme } from "../../context/ThemeContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // supports tables, strikethrough, task lists
import toast from "react-hot-toast";

function Chat() {
  const { darkMode } = useTheme();
  const [messages, setMessages] = useState(() => {
    const savedChat = localStorage.getItem("chatHistory");
    return savedChat ? JSON.parse(savedChat) : [];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleReset = async () => {
    try {
      await reset();
      toast.success("Clearing all messages.")
      setMessages([]);
      localStorage.removeItem("chatHistory");
    } catch (error) {
      toast.error("Some thing went wrong.Please try again.")
      console.log(error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => {
      const updated = [...prev, userMessage];
      localStorage.setItem("chatHistory", JSON.stringify(updated));
      return updated;
    });

    const question = input;
    setInput("");
    setLoading(true);

    try {
      const data = await getAnswer(question);
      const aiReply = data?.data?.answer || "Sorry, I couldn't find an answer.";
      setMessages((prev) => {
        const updated = [...prev, { role: "ai", content: aiReply }];
        localStorage.setItem("chatHistory", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error("Error getting AI answer:", error);
      setMessages((prev) => {
        const updated = [
          ...prev,
          { role: "ai", content: "Oops! Something went wrong." },
        ];
        localStorage.setItem("chatHistory", JSON.stringify(updated));
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-[600px] w-full shadow-lg rounded-xl overflow-hidden ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b flex flex-col sm:flex-row justify-between items-center ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-green-50 border-green-200"
        }`}
      >
        <h2 className="text-xl font-semibold">💬 Chat</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 sm:mt-0">
          Ask questions about your uploaded sources
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-md text-md break-words leading-loose shadow ${
                msg.role === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : darkMode
                  ? "bg-gray-700 text-gray-200 rounded-bl-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.role === "ai" ? (
                <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "")
      return !inline ? (
        <pre
          className={`overflow-x-auto rounded-md my-2 p-3 text-sm ${
            darkMode
              ? "bg-gray-900 text-green-300"
              : "bg-gray-100 text-green-800"
          }`}
        >
          <code {...props}>{children}</code>
        </pre>
      ) : (
        <code
          className={`px-1 rounded ${
            darkMode ? "bg-gray-800 text-green-300" : "bg-gray-200 text-green-800"
          }`}
          {...props}
        >
          {children}
        </code>
      )
    },
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    ul: ({ children }) => (
      <ul className="list-disc ml-6">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal ml-6">{children}</ol>
    ),
    a: ({ href, children }) => (
      <a href={href} target="_blank" rel="noreferrer" className="text-green-500 underline">
        {children}
      </a>
    ),
  }}
>
  {msg.content}
</ReactMarkdown>

              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="text-gray-500 dark:text-gray-300 text-base text-left animate-pulse">
            AI is typing...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div
        className={`p-3 border-t flex items-center gap-3 ${
          darkMode
            ? "bg-gray-700 border-gray-700"
            : "bg-green-100 border-green-200"
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className={`flex-1 bg-transparent outline-none px-3 py-2 rounded-lg ${
            darkMode
              ? "text-white placeholder-gray-400"
              : "text-gray-900 placeholder-gray-600"
          }`}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className={`p-2 rounded-lg transition ${
            darkMode
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <OctagonX size={20} />
        </button>

        <button
          onClick={handleSend}
          disabled={loading}
          className={`p-2 rounded-lg transition ${
            darkMode
              ? "bg-green-600 hover:bg-green-500 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

export default Chat;
