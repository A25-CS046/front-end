import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  Activity,
} from "lucide-react";

const riskPredictions = [
  {
    machineId: "TUR-004",
    machineName: "Turbine D",
    riskScore: 85,
    riskLevel: "critical",
    primaryRisk: "Bearing Failure",
    failureProbability: 78,
    timeToFailure: "3-5 days",
    trend: "increasing",
  },
  {
    machineId: "CNC-002",
    machineName: "CNC Mill B",
    riskScore: 62,
    riskLevel: "high",
    primaryRisk: "Spindle Misalignment",
    failureProbability: 54,
    timeToFailure: "7-10 days",
    trend: "increasing",
  },
  {
    machineId: "PUMP-007",
    machineName: "Hydraulic Pump C",
    riskScore: 42,
    riskLevel: "medium",
    primaryRisk: "Seal Degradation",
    failureProbability: 35,
    timeToFailure: "14-21 days",
    trend: "stable",
  },
  {
    machineId: "PRESS-001",
    machineName: "Hydraulic Press A",
    riskScore: 18,
    riskLevel: "low",
    primaryRisk: "Normal Wear",
    failureProbability: 12,
    timeToFailure: ">90 days",
    trend: "stable",
  },
];

const RISK_STYLES = {
  critical: {
    card: "from-red-500/20 to-red-600/10 border-red-500/30",
    text: "text-red-600 dark:text-red-400",
    bar: "bg-red-500",
    label: "Critical Risk",
  },
  high: {
    card: "from-amber-500/20 to-amber-600/10 border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-500",
    label: "High Risk",
  },
  medium: {
    card: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
    text: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-500",
    label: "Medium Risk",
  },
  low: {
    card: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    bar: "bg-emerald-500",
    label: "Low Risk",
  },
};

const RiskCard = ({ data }) => {
  const style = RISK_STYLES[data.riskLevel] || RISK_STYLES.low;

  const getTrendIcon = (trend) => {
    if (trend === "increasing")
      return <TrendingUp className="w-3 h-3 text-red-500" />;
    if (trend === "decreasing")
      return <TrendingUp className="w-3 h-3 text-emerald-500 rotate-180" />;
    return <Activity className="w-3 h-3 text-blue-500" />;
  };

  return (
    <Card
      className={`bg-gradient-to-br ${style.card} p-4 hover:shadow-lg transition-shadow`}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-slate-900 dark:text-slate-100 font-medium">
                {data.machineName}
              </h4>

              <Badge
                variant="outline"
                className="text-xs text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600"
              >
                {data.machineId}
              </Badge>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              {data.primaryRisk}
            </p>
          </div>

          <AlertTriangle className={`w-5 h-5 ${style.text}`} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Risk Score
            </span>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${style.text}`}>
                {data.riskScore}/100
              </span>
              {getTrendIcon(data.trend)}
            </div>
          </div>

          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${style.bar} transition-all duration-500`}
              style={{ width: `${data.riskScore}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
          <div>
            <p className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-1">
              <AlertTriangle className="w-3 h-3" /> Failure Prob.
            </p>

            <p className={`text-sm font-medium ${style.text}`}>
              {data.failureProbability}%
            </p>
          </div>

          <div>
            <p className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-400 mb-1">
              <Clock className="w-3 h-3" /> Time to Failure
            </p>

            <p className="text-sm text-slate-900 dark:text-slate-100">
              {data.timeToFailure}
            </p>
          </div>
        </div>

        <div className="pt-2">
          <Badge
            variant="outline"
            className={`text-xs ${style.text} border-current`}
          >
            <span className="uppercase">{data.riskLevel} RISK</span>
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default function RiskPredictionCards() {
  const statsOrder = ["critical", "high", "medium", "low"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900 dark:text-slate-100">
            Predictive Risk Analysis
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400">
            AI-powered failure risk predictions
          </p>
        </div>

        <Shield className="w-6 h-6 text-blue-600 dark:text-emerald-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {riskPredictions.map((prediction) => (
          <RiskCard key={prediction.machineId} data={prediction} />
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {statsOrder.map((level) => (
          <Card
            key={level}
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-3"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              {RISK_STYLES[level].label}
            </p>

            <p className={`font-bold text-lg ${RISK_STYLES[level].text}`}>
              {riskPredictions.filter((r) => r.riskLevel === level).length}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
