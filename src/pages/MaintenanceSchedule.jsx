import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Wrench,
  FileText,
  ChevronRight,
  ChevronLeft,
  Search,
  RefreshCw,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Timer,
  Cpu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useMaintenanceSchedules } from "@/hooks/useMaintenanceSchedules";

// Helper functions
function getPriorityFromRiskScore(riskScore) {
  if (riskScore >= 0.8) return "high";
  if (riskScore >= 0.5) return "medium";
  return "low";
}

function formatDuration(start, end) {
  if (!start || !end) return "-";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate - startDate;
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) {
    const diffMins = Math.round(diffMs / (1000 * 60));
    return `${diffMins} min`;
  }
  if (diffHours >= 24) {
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
  }
  return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
}

function formatDate(timestamp) {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(timestamp) {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusDisplay(status) {
  switch (status) {
    case "PENDING":
      return {
        label: "Scheduled",
        color: "border-slate-500/30 text-slate-600 dark:text-slate-400",
      };
    case "IN_PROGRESS":
      return {
        label: "In Progress",
        color: "border-blue-500/30 text-blue-600 dark:text-blue-400",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        color: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
      };
    default:
      return {
        label: status,
        color: "border-slate-500/30 text-slate-600 dark:text-slate-400",
      };
  }
}

// Schedule Detail Modal Component
function ScheduleDetailModal({ schedule, open, onClose }) {
  if (!schedule) return null;

  const priority = getPriorityFromRiskScore(schedule.risk_score);
  const statusDisplay = getStatusDisplay(schedule.status);
  const actions = Array.isArray(schedule.actions) ? schedule.actions : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-blue-600 dark:text-emerald-400 flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            {schedule.schedule_id}
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Unit: {schedule.unit_id} • Product: {schedule.product_id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Status
              </p>
              <Badge variant="outline" className={statusDisplay.color}>
                {statusDisplay.label}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Priority
              </p>
              <Badge
                variant="outline"
                className={`
                  ${
                    priority === "high"
                      ? "border-red-500/30 text-red-600 dark:text-red-400"
                      : ""
                  }
                  ${
                    priority === "medium"
                      ? "border-amber-500/30 text-amber-600 dark:text-amber-400"
                      : ""
                  }
                  ${
                    priority === "low"
                      ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : ""
                  }
                `}
              >
                {priority} priority
              </Badge>
            </div>
          </div>

          {/* Risk Score */}
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Risk Score
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    priority === "high"
                      ? "bg-red-500"
                      : priority === "medium"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{ width: `${(schedule.risk_score || 0) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                {((schedule.risk_score || 0) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Scheduled Start
                </p>
                <p className="text-slate-900 dark:text-slate-100">
                  {formatDateTime(schedule.recommended_start)}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Duration
                </p>
                <p className="text-slate-900 dark:text-slate-100">
                  {formatDuration(
                    schedule.recommended_start,
                    schedule.recommended_end
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Reason
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg text-sm">
              {schedule.reason || "-"}
            </p>
          </div>

          {/* Actions */}
          {actions.length > 0 && (
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Recommended Actions
              </p>
              <div className="space-y-2">
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800/50 rounded"
                  >
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span className="text-slate-900 dark:text-slate-100 text-sm">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Model Info */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              Model: {schedule.model_version || "-"}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              Created: {formatDate(schedule.created_at)}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MaintenanceSchedule() {
  // API hook
  const {
    schedules,
    pagination,
    filters,
    isLoading,
    error,
    refetch,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
    setStatusFilter,
    setSearch,
  } = useMaintenanceSchedules({ initialLimit: 10 });

  // Local state
  const [searchInput, setSearchInput] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  // Status filter tabs
  const statusTabs = [
    { value: "", label: "All" },
    { value: "PENDING", label: "Scheduled" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
  ];

  const openDetail = (schedule) => {
    setSelectedSchedule(schedule);
    setIsDetailOpen(true);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            Maintenance Schedule
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Optimized maintenance tasks based on predictive analytics
          </p>
        </div>

        <Button
          onClick={refetch}
          variant="outline"
          className="border-slate-300 dark:border-slate-600"
          disabled={isLoading}
        >
          <RefreshCw
            className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <p className="text-red-800 dark:text-red-200">
            {error.message || "Failed to load schedules"}
          </p>
        </div>
      )}

      {/* Search and Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Search by schedule ID or reason..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-10 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((tab) => (
            <Button
              key={tab.value}
              variant={filters.status === tab.value ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(tab.value)}
              className={
                filters.status === tab.value
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Schedule Cards */}
      <div className="space-y-3 sm:space-y-4">
        {isLoading && schedules.length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-slate-400" />
            <p className="mt-3 text-slate-500">Loading schedules...</p>
          </div>
        ) : schedules.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-8 h-8 mx-auto text-slate-400" />
            <p className="mt-3 text-slate-500">
              No maintenance schedules found
            </p>
          </div>
        ) : (
          schedules.map((schedule) => {
            const priority = getPriorityFromRiskScore(schedule.risk_score);
            const statusDisplay = getStatusDisplay(schedule.status);

            return (
              <Card
                key={schedule.id}
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={`w-1 h-12 rounded-full ${
                          priority === "high"
                            ? "bg-red-500"
                            : priority === "medium"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                        }`}
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                          <h3 className="text-slate-900 dark:text-slate-100 font-medium">
                            {schedule.schedule_id}
                          </h3>
                          <span className="text-xs text-slate-500">
                            Unit: {schedule.unit_id}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">
                          {schedule.reason || "No reason provided"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ml-0 sm:ml-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Date</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {formatDate(schedule.recommended_start)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Duration</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {formatDuration(
                              schedule.recommended_start,
                              schedule.recommended_end
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Risk</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {((schedule.risk_score || 0) * 100).toFixed(0)}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        <div>
                          <p className="text-xs text-slate-500">Status</p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${statusDisplay.color}`}
                          >
                            {statusDisplay.label}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-3">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        priority === "high"
                          ? "border-red-500/30 text-red-600 dark:text-red-400"
                          : priority === "medium"
                          ? "border-amber-500/30 text-amber-600 dark:text-amber-400"
                          : "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {priority} priority
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openDetail(schedule)}
                      className="text-blue-600 dark:text-emerald-400 hover:text-blue-700 dark:hover:text-emerald-300 hover:bg-blue-500/10 dark:hover:bg-emerald-500/10"
                    >
                      View Details
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Showing {schedules.length} of {pagination.total} schedules
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={!hasPrevPage || isLoading}
              className="border-slate-300 dark:border-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </Button>
            <span className="text-sm text-slate-600 dark:text-slate-400 px-2">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={!hasNextPage || isLoading}
              className="border-slate-300 dark:border-slate-700"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      <ScheduleDetailModal
        schedule={selectedSchedule}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
