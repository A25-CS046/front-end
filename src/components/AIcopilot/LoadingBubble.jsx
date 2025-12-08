export default function LoadingBubble() {
  return (
    <div className="chat chat-start">
      <div
        className={
          "chat-bubble rounded-xl border bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600"
        }
      >
        <div className="flex gap-1 items-center">
          <p className="text-sm italic mr-1">Analyzing</p>
          <div
            className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-cyan-600 items-center"
            style={{ animationDelay: "0ms" }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce bg-blue-600 dark:bg-cyan-600"
            style={{ animationDelay: "100ms" }}
          />
          <div
            className="w-2 h-2 rounded-full animate-bounce bg-blue-500 dark:bg-cyan-400"
            style={{ animationDelay: "200ms" }}
          />
        </div>
      </div>
    </div>
  );
}
