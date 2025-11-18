import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch =
      machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || machine.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
    // 1. Wrapper Sticky agar sidebar tetap diam saat user scroll konten kanan
    <div className="sticky top-6 h-[calc(100vh-3rem)]">
      {/* 2. Card dibuat flex-col dan h-full agar mengisi tinggi wrapper */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-sm">
        {/* 3. Header dikasih shrink-0 agar ukurannya tidak tergencet */}
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        {/* 4. ScrollArea dibuat flex-1 agar otomatis mengisi sisa ruang kosong */}
        <ScrollArea className="flex-1 w-full">
          <div className="p-4 space-y-2 pr-3">
            {filteredMachines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => onSelect(machine)}
                className={`w-full p-4 rounded-lg border transition-all text-left ${
                  selectedMachine.id === machine.id
                    ? "bg-blue-500/10 dark:bg-emerald-500/10 border-blue-500/30 dark:border-emerald-500/30"
                    : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-slate-900 dark:text-slate-100 font-medium">
                        {machine.name}
                      </span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          selectedMachine.id === machine.id
                            ? "text-blue-600 dark:text-emerald-400 translate-x-1"
                            : "text-slate-400"
                        }`}
                      />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {machine.id}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(machine.status)} border`}>
                    {getStatusIcon(machine.status)}
                    <span className="ml-1 capitalize">{machine.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400 mb-2">
                  <div className="flex items-center gap-1">
                    <Activity className="w-3 h-3" />
                    <span>{machine.health}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>RUL: {machine.rul}d</span>
                  </div>
                </div>
                <Progress value={machine.health} className="h-1" />
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
}
