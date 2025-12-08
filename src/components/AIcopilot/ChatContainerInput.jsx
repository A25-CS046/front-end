import { SendHorizonal } from "lucide-react";

export default function ChatContainerInput({
  input,
  setInput,
  handleSend,
  handleKeyPress,
  textareaRef,
}) {
  return (
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
  );
}
