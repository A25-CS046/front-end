export default function RecommendedActionsSection({ actions }) {
  return (
    <div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
        Recommended Actions
      </p>

      <ul className="space-y-1">
        {actions.map((action, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300"
          >
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5"></div>
            {action}
          </li>
        ))}
      </ul>
    </div>
  );
}
