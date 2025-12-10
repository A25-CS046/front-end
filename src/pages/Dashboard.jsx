import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Server, RefreshCw, AlertTriangle } from "lucide-react";

// Components
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import MachineStatusGrid from "@/components/dashboard/MachineStatusGrid";

// Hooks
import {
  useDashboardSummary,
  useMachines,
  useActiveTasks,
  useTeamMembers,
  useTeamPerformance,
} from "@/hooks/useDashboardData";

// Fallback static data
import {
  allMachines as staticMachines,
  machineStatusData as staticStatusData,
  teamPerformance as staticTeamPerformance,
  stats as staticStats,
} from "@/data/dashboardData";

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  // API hooks with auto-refresh
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useDashboardSummary({ window: "24h", refetchInterval: 30000 });

  const {
    machines: apiMachines,
    totalCount,
    isLoading: machinesLoading,
    error: machinesError,
    refetch: refetchMachines,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useMachines({ limit: 10 });

  const {
    data: activeTasksData,
    isLoading: tasksLoading,
    error: tasksError,
    refetch: refetchTasks,
  } = useActiveTasks({ refetchInterval: 60000 });

  const {
    data: teamMembersData,
    isLoading: teamMembersLoading,
    error: teamMembersError,
    refetch: refetchTeamMembers,
  } = useTeamMembers({ refetchInterval: 60000 });

  const {
    data: teamPerfData,
    isLoading: teamPerfLoading,
    error: teamPerfError,
    refetch: refetchTeamPerf,
  } = useTeamPerformance({ weeks: 4, refetchInterval: 60000 });

  // Determine if using API or fallback data
  const hasApiData = summaryData && !summaryError;
  const hasMachinesData = apiMachines?.length > 0 && !machinesError;
  const hasTeamPerfData = teamPerfData?.length > 0 && !teamPerfError;

  // API structure: { totalMachines, stats: { total, avgHealth, avgRUL }, statusCounts: { healthy, warning, critical }, activeFailures }
  const stats = hasApiData
    ? {
        total: summaryData.totalMachines ?? staticStats.total,
        healthy: summaryData.statusCounts?.healthy ?? staticStats.healthy,
        warning: summaryData.statusCounts?.warning ?? staticStats.warning,
        critical: summaryData.statusCounts?.critical ?? staticStats.critical,
        avgHealth: Math.round(
          summaryData.stats?.avgHealth ?? staticStats.avgHealth
        ),
      }
    : staticStats;

  const machines = hasMachinesData ? apiMachines : staticMachines;

  const machineStatusData = hasApiData
    ? [
        { name: "Healthy", value: stats.healthy, color: "#10b981" },
        { name: "Warning", value: stats.warning, color: "#f59e0b" },
        { name: "Critical", value: stats.critical, color: "#ef4444" },
      ]
    : staticStatusData;

  // Team performance - always use dummy data (API has no data)
  const teamPerformance = staticTeamPerformance;

  const isLoading = summaryLoading || machinesLoading;
  const hasError =
    summaryError || machinesError || tasksError || teamMembersError;

  const handleRefresh = () => {
    refetchSummary();
    refetchMachines();
    refetchTasks();
    refetchTeamMembers();
    refetchTeamPerf();
  };

  const goToMachineDetails = (machineId) => {
    navigate("/machine-details");
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            Dashboard
          </h1>

          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            Comprehensive overview and team management
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            onClick={handleRefresh}
            variant="outline"
            className="border-slate-300 dark:border-slate-600 flex-1 sm:flex-none"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 sm:mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>

          <Button
            onClick={() => goToMachineDetails()}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white flex-1 sm:flex-none"
          >
            <Server className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">View Machine Details</span>
            <span className="sm:hidden">Details</span>
          </Button>
        </div>
      </div>

      {/* Error Banner */}
      {hasError && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <div>
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              Unable to fetch live data
            </p>
            <p className="text-amber-600 dark:text-amber-400 text-sm">
              Showing cached data.{" "}
              {summaryError?.message ||
                machinesError?.message ||
                tasksError?.message ||
                teamMembersError?.message}
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <DashboardStats
        totalMachines={stats.total}
        avgHealth={stats.avgHealth}
        activeTasks={activeTasksData}
        teamMembers={teamMembersData}
        isLoading={summaryLoading || tasksLoading || teamMembersLoading}
      />

      <div>
        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-slate-900 dark:text-slate-100 text-lg sm:text-xl">
              Machine Status Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Health and performance metrics
              {hasApiData && (
                <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                  • Live
                </span>
              )}
            </p>
          </div>

          {/* Pagination Controls */}
          {hasMachinesData && totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={!hasPrevPage}
              >
                Previous
              </Button>
              <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={!hasNextPage}
              >
                Next
              </Button>
            </div>
          )}
        </div>

        {isLoading && !hasMachinesData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg h-64 animate-pulse" />
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg h-64 animate-pulse" />
          </div>
        ) : (
          <DashboardCharts
            machineStatusData={machineStatusData}
            teamPerformance={teamPerformance}
          />
        )}

        {isLoading && !hasMachinesData ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-slate-100 dark:bg-slate-800 rounded-lg h-32 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <MachineStatusGrid
            machines={machines}
            onDetailsClick={goToMachineDetails}
          />
        )}
      </div>
    </div>
  );
}
