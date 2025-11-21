export default function ImpactSection({ rec }) {
  return (
    <div className="flex flex-wrap gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      {rec.estimatedDowntime && (
        <div>
          <p className="text-xs text-slate-600">Est. Downtime</p>
          <p className="text-sm">{rec.estimatedDowntime}</p>
        </div>
      )}

      {rec.estimatedCost && (
        <div>
          <p className="text-xs text-slate-600">Est. Cost</p>
          <p className="text-sm">{rec.estimatedCost}</p>
        </div>
      )}

      {rec.predictedFailureDate && (
        <div>
          <p className="text-xs text-slate-600">Predicted Failure</p>
          <p className="text-sm">
            {rec.predictedFailureDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
