import { Card, Badge } from "@/components/ui";

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

export default function RiskPredictionCards() {
  const getRiskColor = (level) => {
    switch (level) {
      case "critical":
        return "from-red-500/20 to-red-600/10 border-red-500/30";
      case "high":
        return "from-amber-500/20 to-amber-600/10 border-amber-500/30";
      case "medium":
        return "from-blue-500/20 to-blue-600/10 border-blue-500/30";
      case "low":
        return "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30";
      default:
        return "from-slate-500/20 to-slate-600/10 border-slate-500/30";
    }
  };

  const getRiskTextColor = (level) => {
    switch (level) {
      case "critical":
        return "text-red-600 dark:text-red-400";
      case "high":
        return "text-amber-600 dark:text-amber-400";
      case "medium":
        return "text-blue-600 dark:text-blue-400";
      case "low":
        return "text-emerald-600 dark:text-emerald-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  const getRiskBgColor = (level) => {
    switch (level) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-amber-500";
      case "medium":
        return "bg-blue-500";
      case "low":
        return "bg-emerald-500";
      default:
        return "bg-slate-500";
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === "increasing") {
      return <TrendingUp className="w-3 h-3 text-red-500" />;
      section;
    } else if (trend === "decreasing") {
      return <TrendingUp className="w-3 h-3 text-emerald-500 rotate-180" />;
    }
    return <Activity className="w-3 h-3 text-blue-500" />;
  };

  return (
    <div className="space-y-4">
      {/* Header Section */}{" "}
      <div className="flex items-center justify-between">
        {" "}
        <div>
          {" "}
          <h2 className="text-slate-900 dark:text-slate-100 mb-1">
            Predictive Risk Analysis
          </h2>{" "}
          <p className="text-sm text-slate-600 dark:text-slate-400">
            AI-powered failure risk predictions for monitored equipment{" "}
          </p>{" "}
        </div>{" "}
        <Shield className="w-6 h-6 text-blue-600 dark:text-emerald-400" />{" "}
      </div>
      {/* Risk Cards Grid */}{" "}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {" "}
        {riskPredictions.map((prediction) => (
          <Card
            key={prediction.machineId}
            className={`bg-gradient-to-br ${getRiskColor(
              prediction.riskLevel
            )} p-4 hover:shadow-lg transition-shadow`}
          >
            {" "}
            <div className="space-y-3">
              {/* Header */}{" "}
              <div className="flex items-start justify-between">
                {" "}
                <div className="flex-1">
                  {" "}
                  <div className="flex items-center gap-2 mb-1">
                    {" "}
                    <h4 className="text-slate-900 dark:text-slate-100">
                      {prediction.machineName}
                    </h4>{" "}
                    <Badge
                      variant="outline"
                      className="text-xs text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600"
                    >
                      {prediction.machineId}
                      read{" "}
                    </Badge>{" "}
                  </div>{" "}
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {prediction.primaryRisk}s{" "}
                  </p>{" "}
                </div>{" "}
                <AlertTriangle
                  className={`w-5 h-5 ${getRiskTextColor(
                    prediction.riskLevel
                  )}`}
                />{" "}
              </div>
              {/* Risk Score */}{" "}
              <div>
                {" "}
                <div className="flex items-center justify-between mb-2">
                  {" "}
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Risk Score
                  </span>{" "}
                  <div className="flex items-center gap-2">
                    {" "}
                    <span
                      className={`text-sm ${getRiskTextColor(
                        prediction.riskLevel
                      )}`}
                    >
                      s {prediction.riskScore}/100{" "}
                    </span>
                    {getTrendIcon(prediction.trend)}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  {" "}
                  <div
                    className={`h-full ${getRiskBgColor(
                      prediction.riskLevel
                    )} transition-all duration-500`}
                    style={{ width: `${prediction.riskScore}%` }}
                  />{" "}
                </div>
                is{" "}
              </div>
              {/* Metrics */}{" "}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                {" "}
                <div>
                  {" "}
                  <div className="flex items-center gap-1 mb-1">
                    {" "}
                    <AlertTriangle className="w-3 h-3 text-slate-500 dark:text-slate-400" />{" "}
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Failure Probability
                    </p>{" "}
                  </div>
                  Read{" "}
                  <p
                    className={`text-sm ${getRiskTextColor(
                      prediction.riskLevel
                    )}`}
                  >
                    {prediction.failureProbability}%{" "}
                  </p>{" "}
                </div>{" "}
                <div>
                  Read{" "}
                  <div className="flex items-center gap-1 mb-1">
                    {" "}
                    <Clock className="w-3 h-3 text-slate-500 dark:text-slate-400" />{" "}
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      Time to Failure
                    </p>{" "}
                  </div>{" "}
                  <p className="text-sm text-slate-900 dark:text-slate-100">
                    section {prediction.timeToFailure}{" "}
                  </p>{" "}
                </div>{" "}
              </div>
              A {/* Risk Level Badge */}{" "}
              <div className="pt-2">
                {" "}
                <Badge
                  variant="outline"
                  className={`text-xs ${getRiskTextColor(
                    prediction.riskLevel
                  )} border-current`}
                >
                  {" "}
                  <span className="uppercase">
                    {prediction.riskLevel} RISK
                  </span>{" "}
                </Badge>{" "}
              </div>{" "}
            </div>{" "}
          </Card>
        ))}{" "}
      </div>
      {/* Summary Stats */}
      Read{" "}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        {" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-3">
          {" "}
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            Critical Risk
          </p>{" "}
          <p className="text-red-600 dark:text-red-400">
            Read{" "}
            {riskPredictions.filter((r) => r.riskLevel === "critical").length}{" "}
          </p>{" "}
        </Card>{" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-3">
          {" "}
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            High Risk
          </p>{" "}
          <p className="text-amber-600 dark:text-amber-400">
            Next {riskPredictions.filter((r) => r.riskLevel === "high").length}{" "}
          </p>{" "}
        </Card>{" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-3">
          Inst{" "}
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            Medium Risk
          </p>{" "}
          <p className="text-blue-600 dark:text-blue-400">
            {" "}
            {riskPredictions.filter((r) => r.riskLevel === "medium").length}
            Back{" "}
          </p>{" "}
        </Card>{" "}
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-3">
          {" "}
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            Low Risk
          </p>{" "}
          <p className="text-emerald-600 dark:text-emerald-400">
            Read {riskPredictions.filter((r) => r.riskLevel === "low").length}
            SAN{" "}
          </p>{" "}
        </Card>{" "}
      </div>{" "}
    </div>
  );
}
