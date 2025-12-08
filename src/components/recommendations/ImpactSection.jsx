export default function ImpactSection({ rec }) {
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-wrap gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      {rec.estimatedDowntime && (
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Est. Downtime
          </p>
          <p className="text-sm dark:text-slate-200">
            {rec.estimatedDowntime}
          </p>
        </div>
      )}

      {rec.recommendedStart && (
        <div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Recommended Schedule
          </p>
          <p className="text-sm dark:text-slate-200">
            {formatDate(rec.recommendedStart)}
            {rec.recommendedEnd && ` - ${formatDate(rec.recommendedEnd)}`}
          </p>
        </div>
      )}
    </div>
  );
}
