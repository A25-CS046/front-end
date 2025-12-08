import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  Search,
  Filter,
  ChevronRight,
  Activity,
  Calendar,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

export default function MachineSidebar({
  machines,
  selectedMachine,
  onSelect,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  isLoading,
  totalCount,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "healthy":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "warning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "critical":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20";
    }
  };

  const getStatusIcon = (status) => {
    if (status === "healthy") return <CheckCircle className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  return (
    <div className="sticky top-6 h-[calc(100vh-3rem)]">
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-sm">
        <CardHeader className="border-b border-slate-200 dark:border-slate-800 shrink-0 pb-3">
          <CardTitle className="text-slate-900 dark:text-slate-100">
            All Machines
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Select a machine to view details
          </CardDescription>
          <div className="space-y-3 pt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search machines..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <Select value={statusFilter} onValueChange={onStatusChange}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-xs text-slate-600 dark:text-slate-400">
              Showing {machines.length} of {totalCount} machines
            </div>
          </div>
        </CardHeader>

        <ScrollArea className="flex-1 w-full">
          <div className="p-4 space-y-2 pr-3">
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-full p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 animate-pulse"
                  style={{ height: "80px" }}
                />
              ))
            ) : machines.length === 0 ? (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                <p className="text-sm">No machines found</p>
                <p className="text-xs mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              // Machine list (no frontend filtering - backend handles it)
              machines.map((machine) => (
                <button
                  key={machine.unitId}
                  onClick={() => onSelect(machine)}
                  className={`w-full p-4 rounded-lg border transition-all text-left ${
                    selectedMachine?.unitId === machine.unitId
                      ? "bg-blue-500/10 dark:bg-emerald-500/10 border-blue-500/30 dark:border-emerald-500/30"
                      : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-slate-900 dark:text-slate-100 font-medium">
                          {machine.name ?? "—"}
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            selectedMachine?.unitId === machine.unitId
                              ? "text-blue-600 dark:text-emerald-400 translate-x-1"
                              : "text-slate-400"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {machine.unitId ?? "—"}
                      </p>
                    </div>
                    <Badge
                      className={`${getStatusColor(machine.status)} border`}
                    >
                      {getStatusIcon(machine.status)}
                      <span className="ml-1 capitalize">
                        {machine.status ?? "unknown"}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      <span>{machine.healthPercent ?? "—"}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>RUL: {machine.syntheticRUL ?? "—"}d</span>
                    </div>
                  </div>
                  <Progress
                    value={machine.healthPercent ?? 0}
                    className="h-1"
                  />
                </button>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={onPrevPage}
                  disabled={!hasPrevPage || isLoading}
                  className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Page {currentPage + 1} of {totalPages}
                </span>
                <button
                  onClick={onNextPage}
                  disabled={!hasNextPage || isLoading}
                  className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}
