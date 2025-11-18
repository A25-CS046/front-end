import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Server } from "lucide-react";

// Components
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import MachineStatusGrid from "@/components/dashboard/MachineStatusGrid";
import RiskPredictionCards from "@/components/dashboard/RiskPredictionCards";

// Data
import {
  allMachines,
  machineStatusData,
  teamPerformance,
  stats,
} from "@/data/dashboardData";

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  const goToMachineDetails = () => {
    navigate("/machine-details");
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            Dashboard
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Comprehensive overview and team management
          </p>
        </div>

        <Button
          onClick={goToMachineDetails}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white"
        >
          <Server className="w-4 h-4 mr-2" />
          View Machine Details
        </Button>
      </div>

      <DashboardStats totalMachines={stats.total} avgHealth={stats.avgHealth} />

      <div>
        <div className="mb-4">
          <h2 className="text-slate-900 dark:text-slate-100">
            Machine Status Overview
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Health and performance metrics
          </p>
        </div>

        <DashboardCharts
          machineStatusData={machineStatusData}
          teamPerformance={teamPerformance}
        />

        <MachineStatusGrid
          machines={allMachines}
          onDetailsClick={goToMachineDetails}
        />
      </div>

      <RiskPredictionCards />
    </div>
  );
}
