import UserChatBubble from "@/components/AIcopilot/UserChatBubble";
import AIChatBubble from "@/components/AIcopilot/AiChatBubble";
import LoadingBubble from "@/components/AIcopilot/LoadingBubble";
import { formatTime } from "@/utils/formatTime";

export default function CurrentChatContent({
  messages,
  isAnalyzing,
  messagesEndRef,
  suggestedQuestions,
  handleSuggestedQuestion,
}) {
  return (
    <div className="flex-1 overflow-y-auto mt-3 space-y-4 px-4">
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

      {/* Suggestion */}
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
  );
}
