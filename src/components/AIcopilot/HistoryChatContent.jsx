import { formatDate } from "@/utils/formatDate";
import { formatTime } from "@/utils/formatTime";
import { MessageSquare, Trash2 } from "lucide-react";

export default function HistoryChatTab({
  history,
  setCurrentSessionId,
  setMessages,
  setActivateTab,
  setIsLoadingHistory,
  onDeleteSession,
}) {
  if (!history.length) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center text-center text-gray-400 dark:text-gray-500">
        <MessageSquare className="w-16 h-16 mb-4" />
        <p className="text-lg font-medium mb-2">Belum ada riwayat chat</p>
        <p className="text-sm">
          Mulai percakapan baru untuk melihat riwayat di sini.
        </p>
      </div>
    );
  }

  const handleSelectSession = (session) => {
    setIsLoadingHistory(true);

    setTimeout(() => {
      setMessages(session.messages);
      setCurrentSessionId(session.id);
      setActivateTab("current");
      setIsLoadingHistory(false);
    }, 800);
  };

  const handleDelete = (e, sessionId) => {
    e.stopPropagation();

    if (onDeleteSession) {
      onDeleteSession(sessionId);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-4 overflow-y-auto w-full p-4 lg:px-10">
      {history.map((session) => (
        <div
          key={session.id}
          onClick={() => handleSelectSession(session)}
          className="flex flex-row justify-between w-full bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl border border-gray-300 dark:border-slate-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-600/50 hover:border-blue-600 dark:hover:border-emerald-700"
        >
          <div className="">
            <p className="font-semibold text-left">
              {session.title || "Percakapan Tanpa Judul"}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-left mt-1 line-clamp-2">
              {session.messages?.[1]?.message || "..."}
            </p>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-left mt-2">
              {`${formatDate(session.createdAt)}, ${formatTime(
                session.createdAt
              )}`}
            </p>
          </div>

          <button
            onClick={(e) => handleDelete(e, session.id)}
            className="ml-4 text-white-500 hover:text-red-600"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
