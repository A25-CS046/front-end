import React, { useRef, useState, useEffect } from "react";
import { MessageSquarePlus } from "lucide-react";
import { useAutoResizeTextarea } from "@/hooks/useAutoResizeTextarea";
import { getSessionId } from "@/utils/session";

// Component
import { Button } from "@/components/ui/Button";
import ChatContainerTabs from "@/components/AIcopilot/ChatContainerTabs";
import HistoryChatTab from "@/components/AIcopilot/HistoryChatContent";
import CurrentChatContent from "@/components/AIcopilot/CurrentChatContent";

// API
import { sendCopilotMessage } from "@/services/copilotApi";
import ChatContainerInput from "@/components/AIcopilot/ChatContainerInput";

export default function AiCopilot() {
  const sessionId = getSessionId();
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  const [messages, setMessages] = useState([
    {
      id: Date.now(),
      sender: "ai",
      message: "Halo! Apa yang bisa saya bantu hari ini?",
      time: Date.now(),
    },
  ]);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);

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

    // const userInput = input;
    setInput("");
    setIsAnalyzing(true);

    try {
      const result = await sendCopilotMessage(userMessage.message);

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
    if (currentSessionId) saveSession(messages, currentSessionId);

    const newId = crypto.randomUUID();
    setCurrentSessionId(newId);

    setActiveTab("current");

    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        message:
          "Halo! Saya dapat membantu Anda menganalisis data mesin, performa mesin, dan lainnya. Apa yang ingin anda ketahui?",
        time: Date.now(),
      },
    ]);
  };

  const saveSession = (messages, sessionIdOverride) => {
    if (messages.length < 2) return;

    const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");

    const id = sessionIdOverride || crypto.randomUUID();

    const session = {
      id: id,
      title: messages[1]?.message || "New Conversation",
      messages: messages,
      createdAt: Date.now(),
    };

    const exists = history.find((s) => s.id === id);

    let updated;
    if (exists) {
      updated = history.map((s) => (s.id === id ? session : s));
    } else {
      updated = [...history, session];
    }

    localStorage.setItem("chatHistory", JSON.stringify(updated));
    setHistory(updated);
  };

  const deleteSession = (sessionId) => {
    const updatedHistory = history.filter((s) => s.id !== sessionId);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);

    if (currentSessionId === sessionId) {
      setCurrentSessionId(null);
      setMessages([
        {
          id: Date.now(),
          sender: "ai",
          message: "Halo! Apa yang bisa saya bantu hari ini?",
          time: Date.now(),
        },
      ]);
      setActiveTab("current");
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen w-full p-6 space-y-3 dark:bg-slate-950">
      {/* Page Header */}
      <div className="flex px-1 justify-between">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-primary dark:text-emerald-300">
            AI COPILOT
          </h1>
          <p className="hidden md:block text-gray-600 dark:text-gray-400 text-sm">
            Ask questions and get predictive insights powered by machine
            learning
          </p>
        </div>
        <Button
          onClick={handleNewChat}
          className="flex items-center gap-2 px-4 py-2 
           bg-blue-600 dark:bg-emerald-600
           text-white 
           border border-blue-600 dark:border-emerald-600
           hover:bg-blue-700 dark:hover:bg-emerald-700
           hover:scale-103 transition-all duration-200 
           "
        >
          <MessageSquarePlus className="w-5 h-5" />
          <span>New Chat</span>
        </Button>
      </div>

      {/* Chat Container */}
      <div className="flex flex-col flex-1 min-h-0 bg-base-200 dark:bg-slate-900 rounded-2xl border border-gray-300 dark:border-slate-700">
        <div className="relative">
          <ChatContainerTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {isLoadingHistory && (
            <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden bg-gray-100 dark:bg-slate-800">
              <div className="w-full h-full bg-linear-to-r from-blue-600 to-cyan-600 animate-loading-bar"></div>
            </div>
          )}
        </div>

        {activeTab === "current" && (
          <CurrentChatContent
            messages={messages}
            isAnalyzing={isAnalyzing}
            messagesEndRef={messagesEndRef}
            suggestedQuestions={suggestedQuestions}
            handleSuggestedQuestion={handleSuggestedQuestion}
          />
        )}

        {activeTab === "history" && (
          <HistoryChatTab
            history={history}
            setCurrentSessionId={setCurrentSessionId}
            setMessages={setMessages}
            setActivateTab={setActiveTab}
            setIsLoadingHistory={setIsLoadingHistory}
            onDeleteSession={deleteSession}
          />
        )}

        {activeTab === "current" && (
          <ChatContainerInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            handleKeyPress={handleKeyPress}
            textareaRef={textareaRef}
          />
        )}
      </div>
    </div>
  );
}
