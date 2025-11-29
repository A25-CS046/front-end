import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  Clock,
  Wrench,
  User,
  FileText,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const maintenanceTasks = [
  {
    id: "MT-001",
    machine: "Turbine D",
    machineId: "M-004",
    type: "Preventive Maintenance",
    priority: "high",
    scheduledDate: "2025-11-02",
    estimatedDuration: "4 hours",
    assignedTo: "John Martinez",
    status: "scheduled",
    description: "Complete bearing replacement and lubrication system overhaul",
    parts: [
      "Bearing Assembly TRB-450",
      "Synthetic Lubricant 5L",
      "Seal Kit SK-220",
    ],
    notes:
      "Critical - RUL indicates high failure risk. Vibration sensors showing increased amplitude.",
  },
  {
    id: "MT-002",
    machine: "CNC Mill B",
    machineId: "M-002",
    type: "Predictive Maintenance",
    priority: "medium",
    scheduledDate: "2025-11-05",
    estimatedDuration: "2 hours",
    assignedTo: "Sarah Chen",
    status: "scheduled",
    description: "Spindle alignment check and vibration dampening adjustment",
    parts: ["Alignment Tool Kit", "Dampening Pads DP-100"],
    notes:
      "Scheduled based on vibration pattern analysis showing early signs of misalignment.",
  },
  {
    id: "MT-003",
    machine: "Hydraulic Press A",
    machineId: "M-001",
    type: "Routine Inspection",
    priority: "low",
    scheduledDate: "2025-11-08",
    estimatedDuration: "1 hour",
    assignedTo: "Mike Thompson",
    status: "scheduled",
    description: "Quarterly hydraulic system inspection and fluid analysis",
    parts: ["Hydraulic Fluid Sample Kit"],
    notes:
      "Standard quarterly maintenance. Machine operating within normal parameters.",
  },
  {
    id: "MT-004",
    machine: "Conveyor C",
    machineId: "M-003",
    type: "Preventive Maintenance",
    priority: "low",
    scheduledDate: "2025-11-12",
    estimatedDuration: "3 hours",
    assignedTo: "Lisa Rodriguez",
    status: "scheduled",
    description: "Belt tensioning and roller bearing inspection",
    parts: ["Conveyor Belt Tension Gauge", "Roller Bearings RB-300 (x6)"],
    notes: "Proactive maintenance to maintain optimal performance.",
  },
  {
    id: "MT-005",
    machine: "Hydraulic Press A",
    machineId: "M-001",
    type: "Preventive Maintenance",
    priority: "medium",
    scheduledDate: "2025-10-28",
    estimatedDuration: "2 hours",
    assignedTo: "John Martinez",
    status: "completed",
    description: "Pressure sensor calibration and filter replacement",
    parts: ["Pressure Sensor PS-150", "Oil Filter OF-75"],
    notes: "Completed successfully. All readings within acceptable range.",
  },
];

function MaintenanceDetailDialog({ task }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 dark:text-emerald-400 hover:text-blue-700 dark:hover:text-emerald-300 hover:bg-blue-500/10 dark:hover:bg-emerald-500/10"
        >
          View Details
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-blue-600 dark:text-emerald-400 flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            {task.id} - {task.type}
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            {task.machine} ({task.machineId})
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                Status
              </p>
              <Badge
                variant="outline"
                className={`
                  ${
                    task.status === "completed"
                      ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : ""
                  }
                  ${
                    task.status === "in-progress"
                      ? "border-blue-500/30 text-blue-600 dark:text-blue-400"
                      : ""
                  }
                  ${
                    task.status === "scheduled"
                      ? "border-slate-500/30 text-slate-600 dark:text-slate-400"
                      : ""
                  }
                `}
              >
                {task.status}
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
                    task.priority === "high"
                      ? "border-red-500/30 text-red-600 dark:text-red-400"
                      : ""
                  }
                  ${
                    task.priority === "medium"
                      ? "border-amber-500/30 text-amber-600 dark:text-amber-400"
                      : ""
                  }
                  ${
                    task.priority === "low"
                      ? "border-blue-500/30 text-blue-600 dark:text-blue-400"
                      : ""
                  }
                `}
              >
                {task.priority}
              </Badge>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
              <div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Scheduled Date
                </p>
                <p className="text-slate-900 dark:text-slate-100">
                  {new Date(task.scheduledDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
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
                  {task.estimatedDuration}
                </p>
              </div>
            </div>
          </div>

          {/* Assigned To */}
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Assigned Technician
              </p>
              <p className="text-slate-900 dark:text-slate-100">
                {task.assignedTo}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Description
            </p>
            <p className="text-slate-900 dark:text-slate-100">
              {task.description}
            </p>
          </div>

          {/* Required Parts */}
          <div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Required Parts
            </p>
            <div className="space-y-2">
              {task.parts.map((part, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800/50 rounded"
                >
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-900 dark:text-slate-100">
                    {part}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Notes
              </p>
            </div>
            <p className="text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 p-3 rounded-lg text-sm">
              {task.notes}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MaintenanceSchedule() {
  const [filter, setFilter] = useState("all");

  const filteredTasks =
    filter === "all"
      ? maintenanceTasks
      : maintenanceTasks.filter((task) => task.status === filter);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-blue-600 dark:text-emerald-400 mb-1 sm:mb-2">
            Maintenance Schedule
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Optimized maintenance tasks based on predictive analytics
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className={
              filter === "all"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            All
          </Button>
          <Button
            variant={filter === "scheduled" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("scheduled")}
            className={
              filter === "scheduled"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            Scheduled
          </Button>
          <Button
            variant={filter === "in-progress" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("in-progress")}
            className={
              filter === "in-progress"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            In Progress
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("completed")}
            className={
              filter === "completed"
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Maintenance Tasks */}
      <div className="space-y-3 sm:space-y-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-1 h-12 rounded-full ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-amber-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
                      <h3 className="text-slate-900 dark:text-slate-100">
                        {task.machine}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-500">
                        {task.machineId}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {task.type}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ml-0 sm:ml-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Date
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {new Date(task.scheduledDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Duration
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {task.estimatedDuration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Technician
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">
                        {task.assignedTo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-500">
                        Status
                      </p>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          task.status === "completed"
                            ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : ""
                        }${
                          task.status === "in-progress"
                            ? "border-blue-500/30 text-blue-600 dark:text-blue-400"
                            : ""
                        }${
                          task.status === "scheduled"
                            ? "border-slate-500/30 text-slate-600 dark:text-slate-400"
                            : ""
                        }`}
                      >
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row lg:flex-col items-start lg:items-end justify-between lg:justify-start gap-3">
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    task.priority === "high"
                      ? "border-red-500/30 text-red-600 dark:text-red-400"
                      : ""
                  }${
                    task.priority === "medium"
                      ? "border-amber-500/30 text-amber-600 dark:text-amber-400"
                      : ""
                  }${
                    task.priority === "low"
                      ? "border-blue-500/30 text-blue-600 dark:text-blue-400"
                      : ""
                  }`}
                >
                  {task.priority} priority
                </Badge>
                <MaintenanceDetailDialog task={task} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">
            No maintenance tasks found for this filter.
          </p>
        </div>
      )}
    </div>
  );
}
