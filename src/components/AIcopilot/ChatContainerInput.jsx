import { Mic, SendHorizonal } from "lucide-react";
import MicButton from "./MicButton";
import { useState } from "react";

export default function ChatContainerInput({
  input,
  setInput,
  handleSend,
  handleKeyPress,
  textareaRef,
}) {
  const [isListening, setIsListening] = useState(false);

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

        <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
          <MicButton setInput={setInput} setIsListening={setIsListening} />

          {!isListening && (
            <button
              disabled={!input.trim()}
              onClick={handleSend}
              className="h-10 lg:h-13 px-4 lg:px-5 flex items-center justify-center rounded-xl text-white/90 bg-blue-600 dark:bg-emerald-600 transition-all duration-200 hover:scale-103 disabled:opacity-50 disabled:scale-100 "
            >
              <SendHorizonal className="w-4 h-4 lg:w-6 lg:h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
