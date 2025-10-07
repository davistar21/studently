import { useEffect, useRef, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { sendJunieMessage } from "~/utils/chatService";
import { motion, AnimatePresence } from "framer-motion";
import Error from "./Error";
import Loader from "./Loader";
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there 👋! I’m Junie, Studently’s AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sendMessage = async () => {
    try {
      setIsLoading(true);
      setInput("");
      if (!input.trim()) return;
      const userMessage = { from: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);

      const reply = await sendJunieMessage(input);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: reply.reply,
        },
      ]);
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const containerElem = containerRef.current;
    containerElem && (containerElem.scrollTop = containerElem.scrollHeight);
  }, [messages]);
  if (error) return <Error error={error} />;
  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-gray-800 text-white rounded-full p-4 shadow-lg hover:bg-gray-700 transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Blurred Background Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)} // Close when clicking on the overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Chat Window */}
            <motion.div
              ref={containerRef}
              className="fixed bottom-0 left-0 right-0 md:-translate-1/2 md:top-1/2 md:left-1/2 z-50 flex flex-col w-full bg-white dark:bg-gray-900 shadow-xl max-w-[680px] min-h-[60vh] max-h-[80vh] mx-auto rounded-t-2xl md:rounded-2xl rounded-t-2xl border-gray-300 dark:border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 25,
                duration: 0.4,
              }}
              style={{ maxHeight: "80%" }}
            >
              <div className="flex justify-between items-center p-4 bg-gray-800 dark:bg-gray-700 text-white">
                <h2 className="font-semibold text-lg !text-gray-200">
                  Studently Chatbot
                </h2>
                <button onClick={() => setOpen(false)} className="text-white">
                  <X />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 scrollbar overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-800">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded-lg w-fit min-w-[200px] max-w-[80%] leading-relaxed ${
                      msg.from === "bot"
                        ? "bg-gray-200 dark:bg-gray-700 self-start"
                        : "bg-blue-600 text-white self-end ml-auto"
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                {isLoading && (
                  <div className="animate-pulse self-start bg-gray-200 dark:bg-gray-700 p-2 w-fit rounded-lg italic text-sm font-semibold">
                    typing...
                  </div>
                )}
              </div>

              {/* Input and Send Button */}
              <div className="p-4 flex gap-2 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
                <input
                  type="text"
                  className="flex-1 border rounded-lg p-2 bg-gray-100 dark:!bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-300"
                  placeholder="Ask me anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
                >
                  Send
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
