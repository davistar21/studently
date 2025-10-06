import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { sendJunieMessage } from "~/utils/chatService";
import { motion } from "framer-motion";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there 👋! I’m Studently’s assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    try {
      if (!input.trim()) return;
      const userMessage = { from: "user", text: input };
      setMessages((prev) => [...prev, userMessage]);

      const reply = await sendJunieMessage(input);
      console.log("Junie replied", reply);
    } catch (err) {
      console.error("Error here", err?.message);
    } finally {
      setInput("");
    }

    // try {
    //   const res = await fetch("http://localhost:3000/chat", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ message: input }),
    //   });
    //   const data = await res.json();
    //   const botMessage = { from: "bot", text: data.reply };
    //   setMessages((prev) => [...prev, botMessage]);
    // } catch (err) {
    //   console.error("Chat error:", err);
    //   setMessages((prev) => [
    //     ...prev,
    //     { from: "bot", text: "Sorry, something went wrong." },
    //   ]);
    // }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {open && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
            <h2 className="font-semibold text-lg">Studently Chatbot</h2>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.from === "bot"
                    ? "bg-gray-200 self-start"
                    : "bg-blue-600 text-white self-end ml-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-4 flex gap-2 border-t bg-white">
            <input
              type="text"
              className="flex-1 border rounded-lg p-2"
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
      )}
    </>
  );
}
