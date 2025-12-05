import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { CheckCircle, AlertTriangle, XCircle, TrendingUp } from "lucide-react";

const getStatusIcon = (status) => {
  switch (status) {
    case "healthy":
      return (
        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      );
    case "warning":
      return (
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      );
    case "critical":
      return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
    default:
      return null;
  }
};

export default function MachineStatusGrid({ machines, onDetailsClick }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-slate-900 dark:text-slate-100 text-sm sm:text-base">
          Quick Status View
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
        {machines.map((machine) => (
          <div
            key={machine.id}
            className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {machine.id}
                </p>
                <p className="text-sm text-slate-900 dark:text-slate-100 truncate">
                  {machine.name}
                </p>
              </div>
              {getStatusIcon(machine.status)}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-2">
              <span>Health: {machine.health}%</span>
              <span>RUL: {machine.rul}d</span>
            </div>

            <Progress value={machine.health} className="h-1.5" />
          </div>
        ))}
      </div>

      <div className="mt-3 sm:mt-4 text-center">
        <Button
          variant="outline"
          onClick={onDetailsClick}
          className="border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs sm:text-sm w-full sm:w-auto"
        >
          <span className="hidden sm:inline">
            View Detailed Sensor Data for All Machines
          </span>
          <span className="sm:hidden">View All Machine Details</span>
          <TrendingUp className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}
