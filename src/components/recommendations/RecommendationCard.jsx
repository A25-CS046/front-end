import { Card } from "@/components/ui/Card";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Calendar,
  CheckCircle2,
  XCircle,
  ThermometerSun,
  Activity,
  TrendingUp,
  Wrench,
  AlertTriangle,
  Clock,
  Sparkles,
} from "lucide-react";
import MetricsSection from "@/components/recommendations/MetricsSection";
import RecommendedActionsSection from "@/components/recommendations/RecommendedActionsSection";
import ImpactSection from "@/components/recommendations/ImpactSection";

export default function RecommendationCard({
  rec,
  onCreateTicket,
  onAcknowledge,
  onDismiss,
}) {
  if (rec.status === "dismissed" || rec.status === "ticket-created") {
    return null;
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "text-red-600 dark:text-red-400 border-red-500";
      case "high":
        return "text-amber-600 dark:text-amber-400 border-amber-500";
      case "medium":
        return "text-blue-600 dark:text-blue-400 border-blue-500";
      default:
        return "text-slate-600 dark:text-slate-400 border-slate-500";
    }
  };


  return (
    <Card
      className={`bg-white dark:bg-slate-900 border dark:border-slate-800 p-4 sm:p-6 ${
        rec.status === "dismissed" ? "opacity-50" : ""
      }`}
    >
      <div className="space-y-4">
        {/* Header*/}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <div
                className={`w-1 h-16 rounded-full ${
                  rec.severity === "critical"
                    ? "bg-red-500"
                    : rec.severity === "high"
                    ? "bg-amber-500"
                    : rec.severity === "medium"
                    ? "bg-blue-500"
                    : "bg-slate-500"
                }`}
              ></div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-slate-900 dark:text-slate-100 font-semibold">
                    {rec.machineType}
                  </h3>
                  <Badge
                    variant="outline"
                    className="dark:text-slate-400 dark:border-slate-600"
                  >
                    {rec.machineId}
                  </Badge>
                </div>

                <p className="text-slate-900 dark:text-slate-100">
                  {rec.prediction}
                </p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className={getSeverityColor(rec.severity)}
                  >
                    <span className="ml-1 capitalize">{rec.severity}</span>
                  </Badge>

                  <Badge
                    variant="outline"
                    className="dark:text-slate-400 dark:border-slate-600"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {rec.timeframe}
                  </Badge>

                  <Badge
                    variant="outline"
                    className="bg-transparent text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  >
                    <Sparkles className="w-3 h-3 mr-1" />
                    {rec.confidence}% confidence
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div>
            {rec.status === "ticket-created" && (
              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Ticket Created
              </Badge>
            )}

            {rec.status === "acknowledged" && (
              <Badge className="bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30">
                Acknowledged
              </Badge>
            )}
          </div>
        </div>

        <Separator />
        {/* AI Analysis and Metrics */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              AI Analysis
            </p>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              {rec.details}
            </p>

            {rec.aiModel && (
              <p className="text-xs text-slate-500 mt-2">
                Model: {rec.aiModel}
              </p>
            )}
          </div>

          {rec.currentMetrics && (
            <MetricsSection metrics={rec.currentMetrics} />
          )}
        </div>
        {/* Recommended actions */}
        <RecommendedActionsSection actions={rec.recommendedActions} />

        {(rec.estimatedDowntime || rec.recommendedStart) && (
          <ImpactSection rec={rec} />
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          <Button
            size="sm"
            onClick={() => onCreateTicket(rec)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Auto-Create Ticket
          </Button>

          {rec.status === "new" && (
            <Button
              className="dark:text-slate-400 dark:border-slate-600 dark:hover:text-slate-200 dark:hover:bg-blue-500/20"
              size="sm"
              variant="outline"
              onClick={() => onAcknowledge(rec.id)}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Acknowledge
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            className="dark:text-slate-400 dark:border-slate-600 dark:hover:text-slate-200 dark:hover:bg-red-500/20"
            onClick={() => onDismiss(rec.id)}
          >
            <XCircle className="w-4 h-4 mr-2" />
            Dismiss
          </Button>
        </div>
        {/* Timestamp */}
        <div className="text-xs text-slate-500">
          Generated{" "}
          {rec.createdAt.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </Card>
  );
}
