import React, { useRef, useState } from "react";
import { SendHorizonal, Bot, User } from "lucide-react";
import { MessageSquarePlus } from "lucide-react";
import ChatMessage from "@/components/AIcopilot/ChatMessage";
import { formatTime } from "@/utils/formatTime";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import useShrinkHeader from "@/hooks/useShrinkHeader";

export default function AiCopilot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      message: "Halo! Apa yang bisa saya bantu hari ini?",
      time: new Date(),
    },
  ]);
  const textareaRef = useAutoResizeTextarea(input);

  const suggestedQuestions = [
    "Tampilkan mesin yang memerlukan pemeliharaan minggu ini",
    "Tampilkan status untuk mesin nomor #",
    "Berikan rekomendasi perbaikan untuk mesin saya",
    "Tampilkan tren suhu mesin dalam 24 jam terakhir",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      message: input,
      time: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        message: "Halo! Ada yang bisa saya bantu hari ini?",
        time: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen w-full dark:bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 flex flex-row justify-between items-center px-6 py-4 bg-base-100">
        <div className="flex flex-col">
          <h1 className="text-xl text-primary dark:text-emerald-300">
            AI Copilot
          </h1>
          <p className="text-sm text-base-content dark:text-gray-300">
            Ask questions and get predictive insights powered by machine
            learning
          </p>
        </div>
        <button
          className="btn btn-ghost border border-gray-300 dark:border-gray-700 gap-2"
          onClick={handleNewChat}
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Chat
        </button>

        {/* {!isScrolled && (
          <p className="text-sm text-base-content dark:text-gray-300">
            Ask questions and get predictive insights powered by machine
            learning
          </p>
        )} */}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 px-4 md:px-20 pb-50">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            sender={msg.sender}
            message={msg.message}
            time={formatTime(msg.time)}
          />
        ))}
      </div>

      {/* Suggesstion */}
      {messages.length === 1 && (
        <div className="px-5 md:px-30 pb-3 md:pb-4">
          <div className="mx-auto">
            <p className="text-sm mb-2 md:mb-3 text-gray-600 dark:text-gray-400">
              Pertanyaan yang disarankan:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                  }}
                  className="
              text-left py-3 text-sm px-4
              border rounded-xl transition-all
              border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-300
              dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-800 dark:hover:border-cyan-600
            "
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="sticky bottom-0 left-0 right-0 border-t py-3 px-4 md:px-20 border-gray-200 dark:bg-base-100 dark:border-gray-700">
        <div className="mx-auto">
          <div className="flex gap-3 h-auto items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={textareaRef}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 resize-none rounded-2xl py-2 pl-3 max-h-[200px] overflow-y-hidden overflow-x-hidden  whitespace-pre-wrap border input bg-white border-gray-300 placeholder-gray-400 focus:border-blue-500
                   dark:bg-slate-800 dark:border-slate-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-cyan-500"
            />
            <button
              className="flex btn bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 h-min-3 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSend}
              disabled={!input.trim()}
            >
              <SendHorizonal className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs mt-2 text-gray-400 dark:text-gray-500">
            Tekan <b>Enter</b> untuk mengirim pesan. Tekan <b>Shift + Enter</b>{" "}
            untuk memulai paragraf yang baru.
          </p>
        </div>
      </div>
    </div>
  );
}
