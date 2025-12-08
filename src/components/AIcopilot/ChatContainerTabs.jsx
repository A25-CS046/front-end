export default function ChatContainerTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex flex-col min-h-0">
      <div className="flex border-b border-gray-300 dark:border-slate-700 px-6">
        <button
          onClick={() => setActiveTab("current")}
          className={`flex-1 py-3 text-center font-medium  ${
            activeTab === "current"
              ? "border-b-2 border-blue-600 dark:border-emerald-300"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Current Chat
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 py-2 text-center font-medium ${
            activeTab === "history"
              ? "border-b-2 border-blue-600 dark:border-emerald-300"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          History Chat
        </button>
      </div>
    </div>
  );
}
