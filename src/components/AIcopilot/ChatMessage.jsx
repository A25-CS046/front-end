export default function ChatMessage({ sender, message, time }) {
  const isUser = sender === "user";

  return (
    <div className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
      <div className="chat-header flex gap-2 items-center">
        <p className="text-xs">{isUser ? "You" : "AI Copilot"}</p>
        <time className="text-xs opacity-70">{time}</time>
      </div>

      <div
        className={`chat-bubble mt-2 rounded-xl whitespace-pre-wrap wrap-break-word shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_2px_rgba(255,255,255,0.15)] ${
          isUser
            ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white"
            : "border bg-slate-100 dark:bg-slate-800 dark:border-slate-600"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
