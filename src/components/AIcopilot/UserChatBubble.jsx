export default function UserChatBubble({ message, time }) {
  return (
    <div className="chat chat-end">
      <div className="chat-header flex gap-2 items-center">
        <p className="text-xs">You</p>
        <time className="text-xs opacity-70">{time}</time>
      </div>

      <div className="chat-bubble mt-2 rounded-xl whitespace-pre-wrap wrap-break-word shadow-[0_2px_4px_rgba(0,0,0,0.15)] bg-linear-to-r from-blue-600 to-cyan-600 text-white">
        {message}
      </div>
    </div>
  );
}
