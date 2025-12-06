import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AIChatBubble({ message, time }) {
  const highlightStatus = (text) => {
    if (/CRITICAL/i.test(text)) {
      return <span className="bg-red-500 text-white px-1 rounded">{text}</span>;
    }
    if (/WARNING/i.test(text)) {
      return (
        <span className="bg-yellow-400 text-black px-1 rounded">{text}</span>
      );
    }
    if (/OK|NORMAL/i.test(text)) {
      return (
        <span className="bg-green-400 text-white px-1 rounded">{text}</span>
      );
    }
    return text;
  };
  return (
    <div className="chat chat-start">
      <div className="chat-header flex gap-2 items-center">
        <p className="text-xs">AI Copilot</p>
        <time className="text-xs opacity-70">{time}</time>
      </div>

      <div className="chat-bubble mt-2 rounded-xl whitespace-pre-wrap wrap-break-word shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_2px_rgba(255,255,255,0.15)] border bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 px-4 py-2 overflow-x-auto">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, ...props }) => (
              <p
                className="prose dark:prose-invert wrap-break-word"
                {...props}
              />
            ),
            table: ({ node, ...props }) => (
              <div className="overflow-x-auto">
                <table
                  className="table-auto border-collapse border border-gray-300 dark:border-gray-600"
                  {...props}
                />
              </div>
            ),
            th: ({ node, ...props }) => (
              <th className="border px-2 py-1" {...props} />
            ),
            td: ({ node, ...props }) => (
              <td className="border px-2 py-1" {...props} />
            ),
            strong: ({ node, ...props }) => (
              <strong
                className="bg-red-200 dark:bg-red-700 px-1 rounded"
                {...props}
              />
            ),
          }}
        >
          {message}
        </ReactMarkdown>
      </div>
    </div>
  );
}

// =========================================================

// import React from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { AlertCircle, Calendar, TrendingUp } from "lucide-react";

// export default function AIChatBubble({ message, time, machines = [] }) {
//   return (
//     <div className="mb-4">
//       {/* Header */}
//       <div className="flex gap-2 items-center mb-1">
//         <p className="text-xs font-semibold">AI Copilot</p>
//         <time className="text-xs opacity-70">{time}</time>
//       </div>

//       {/* Bubble */}
//       <div className="rounded-xl p-3 shadow-sm whitespace-pre-wrap break-words border overflow-x-auto bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-gray-900 dark:text-gray-100">
//         {/* Markdown content */}
//         <ReactMarkdown
//           remarkPlugins={[remarkGfm]}
//           components={{
//             p: ({ node, ...props }) => (
//               <p className="break-words mb-2" {...props} />
//             ),
//             table: ({ node, ...props }) => (
//               <div className="overflow-x-auto my-2">
//                 <table
//                   className="table-auto border-collapse border border-gray-300 dark:border-gray-600 w-full"
//                   {...props}
//                 />
//               </div>
//             ),
//             th: ({ node, children, ...props }) => (
//               <th
//                 className="border px-2 py-1 bg-gray-200 dark:bg-gray-700 text-left"
//                 {...props}
//               >
//                 {children}
//               </th>
//             ),
//             td: ({ node, children, ...props }) => {
//               const content = children[0];
//               if (
//                 typeof content === "string" &&
//                 ["OVERDUE", "WARNING", "OK"].includes(content)
//               ) {
//                 let colorClass = "";
//                 if (content === "OVERDUE") colorClass = "bg-red-500 text-white";
//                 if (content === "WARNING")
//                   colorClass = "bg-yellow-400 text-black";
//                 if (content === "OK") colorClass = "bg-green-400 text-white";
//                 return (
//                   <td className="border px-2 py-1">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs ${colorClass}`}
//                     >
//                       {content}
//                     </span>
//                   </td>
//                 );
//               }
//               return (
//                 <td className="border px-2 py-1" {...props}>
//                   {children}
//                 </td>
//               );
//             },
//             strong: ({ node, ...props }) => (
//               <strong
//                 className="bg-red-200 dark:bg-red-700 px-1 rounded"
//                 {...props}
//               />
//             ),
//           }}
//         >
//           {message}
//         </ReactMarkdown>

//         {/* Machines list */}
//         {machines.length > 0 && (
//           <div className="mt-3 space-y-2">
//             {machines.map((m) => (
//               <div
//                 key={m.id}
//                 className="p-3 rounded-xl border shadow-sm bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600"
//               >
//                 {/* Header: name + status */}
//                 <div className="flex items-center justify-between mb-1">
//                   <h4 className="font-medium text-gray-900 dark:text-white">
//                     {m.name}
//                   </h4>
//                   <span
//                     className={`px-2 py-0.5 text-xs rounded-full ${
//                       m.status === "critical"
//                         ? "bg-red-500 text-white"
//                         : m.status === "warning"
//                         ? "bg-yellow-400 text-black"
//                         : "bg-green-400 text-white"
//                     }`}
//                   >
//                     {m.status.toUpperCase()}
//                   </span>
//                 </div>

//                 <p className="text-xs text-gray-700 dark:text-gray-300">
//                   ID: {m.id}
//                 </p>

//                 {/* Additional info */}
//                 <div className="mt-2 space-y-1 text-xs text-gray-700 dark:text-gray-300">
//                   {m.nextMaintenance && (
//                     <div className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3" />
//                       <span>{m.nextMaintenance}</span>
//                     </div>
//                   )}
//                   {m.issue && (
//                     <div className="flex items-start gap-1">
//                       <AlertCircle className="w-3 h-3 mt-0.5" />
//                       <span>{m.issue}</span>
//                     </div>
//                   )}
//                   {m.predictedFailure && (
//                     <div className="flex items-center gap-1">
//                       <TrendingUp className="w-3 h-3" />
//                       <span>Failure: {m.predictedFailure}</span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
