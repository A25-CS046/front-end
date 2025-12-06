import React, { useRef, useState, useEffect } from "react";
import { SendHorizonal, MessageSquarePlus } from "lucide-react";
import UserChatBubble from "@/components/AIcopilot/UserChatBubble";
import AIChatBubble from "@/components/AIcopilot/AiChatBubble";
import { formatTime } from "@/utils/formatTime";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import LoadingBubble from "@/components/AIcopilot/LoadingBubble";

// API
import { sendCopilotMessage } from "@/services/copilotApi";

export default function AiCopilot() {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      message: "Halo! Apa yang bisa saya bantu hari ini?",
      time: new Date(),
    },
  ]);
  const textareaRef = useAutoResizeTextarea(input);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    "Tampilkan mesin yang memerlukan pemeliharaan minggu ini",
    "Tampilkan status untuk mesin nomor #",
    "Tampilkan riwayat pemeliharaan mesin nomor #",
    "Ada berapa mesin yang sedang rusak saat ini?",
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      message: input,
      time: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    const userInput = input;
    setInput("");
    setIsAnalyzing(true);

    try {
      const result = await sendCopilotMessage(userInput);
      console.log(result);
      const aiMessage = {
        id: Date.now(),
        sender: "ai",
        message: result.data.reply,
        time: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage = {
        id: Date.now(),
        sender: "ai",
        message: "Error: Gagal memproses pertanyaan.",
        time: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsAnalyzing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        message:
          "Halo! Saya dapat membantu Anda menganalisis data mesin, performa mesin, dan lainnya. apa yang ingin anda ketahui?",
        time: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen w-full p-6 space-y-3 dark:bg-slate-950">
      {/* Page Header */}
      <div className="px-1">
        <h1 className="text-xl font-semibold text-primary dark:text-emerald-300">
          AI COPILOT
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Ask questions and get predictive insights powered by machine learning
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col flex-1 min-h-0 bg-base-200 dark:bg-slate-900 rounded-2xl border border-gray-300 dark:border-slate-700 py-2">
        {/* Chat Top Area */}
        <div className="flex justify-between items-center px-6 pb-2 border-b border-gray-300 dark:border-slate-700">
          <div>
            <h2 className="text-md text-primary dark:text-emerald-300">
              AEGIS ASSISTANT
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Online • Ready to help
            </p>
          </div>

          <button
            onClick={handleNewChat}
            className="btn btn-sm btn-ghost text-md border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-slate-800 px-5 py-3"
          >
            <MessageSquarePlus className="w-5 h-5 mr-1" /> New Chat
          </button>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto mt-3 space-y-4 px-6">
          {messages.map((msg) =>
            msg.sender === "user" ? (
              <UserChatBubble
                key={msg.id}
                message={msg.message}
                time={formatTime(msg.time)}
              />
            ) : (
              <AIChatBubble
                key={msg.id}
                message={msg.message}
                time={formatTime(msg.time)}
              />
            )
          )}

          {isAnalyzing && <LoadingBubble />}

          <div ref={messagesEndRef}></div>

          {/* Suggesstion */}
          {messages.length === 1 && (
            <section className="px-3 pb-5">
              <p className="text-sm mb-3 text-gray-600 dark:text-gray-400">
                QUICK QUESTIONS
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left text-sm py-2 px-4 border border-gray-300 dark:border-slate-700 rounded-xl transition-all hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-slate-800 dark:hover:border-cyan-600 text-gray-700 dark:text-gray-300"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Chat Input Area*/}
        <div className="border-t border-gray-300 dark:border-slate-700 px-6 py-4">
          <div className="flex gap-3 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
              placeholder="Ask anything..."
              className="flex-1 textarea textarea-bordered rounded-xl resize-none max-h-[150px] py-2 px-3 dark:bg-slate-800 dark:border-slate-700"
            />
            <button
              disabled={!input.trim()}
              onClick={handleSend}
              className="btn btn-primary text-white disabled:opacity-40"
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
