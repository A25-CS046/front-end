export default function MetricsSection({ metrics }) {
  return (
    <div>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
        Current Metrics
      </p>

      <div className="space-y-1 ">
        {metrics.temperature && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Temperature:</span>
            <span className="text-slate-900 dark:text-slate-100">
              {metrics.temperature}°C
            </span>
          </div>
        )}

        {metrics.vibration && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Vibration:</span>
            <span className="text-slate-900 dark:text-slate-100">
              {metrics.vibration} mm/s
            </span>
          </div>
        )}

        {metrics.current && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Current:</span>
            <span className="text-slate-900 dark:text-slate-100">
              {metrics.current} A
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
