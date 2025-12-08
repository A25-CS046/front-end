import { useState, useMemo, useEffect } from "react";
import { Activity, Thermometer, Zap, Loader2, AlertCircle } from "lucide-react";

// Components
import MachineSidebar from "@/components/machine/MachineSidebar";
import SensorChart from "@/components/machine/SensorChart";

// Hooks
import { useMachines, useMachineSensors } from "@/hooks/useMachineData";
// Static data
import {
  machines as staticMachines,
  generateSensorData,
} from "@/data/machineData";
import { useParams } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Package, MapPin, Wrench, Calendar } from "lucide-react";

export default function MachineDetails() {
  // Toggle data source:
  // - To use API data, set `USE_API = true` (default).
  // - To use static data, set `USE_API = false` or comment/uncomment below lines.
  const USE_API = true;
  // const USE_API = false;

  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [dateRange, setDateRange] = useState({
    start: "2022-11-16T00:00:00Z",
    end: "2022-11-18T00:00:00Z",
  });

  const {
    machines: apiMachines,
    isLoading: machinesLoading,
    error: machinesError,
    totalCount,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    hasNextPage,
    hasPrevPage,
  } = useMachines({
    limit: 50,
    search: searchQuery,
    status: statusFilter,
  });

  const machines = USE_API
    ? apiMachines
    : (staticMachines || []).map((m) => ({
        unitId: m.id,
        name: m.name,
        type: m.type,
        manufacturer: m.manufacturer,
        model: m.model,
        location: m.location,
        healthPercent: m.health,
        syntheticRUL: m.rul,
        status: m.status,
        installDate: m.installDate,
        lastMaintenance: m.lastMaintenance,
      }));

  const selectedMachine = useMemo(() => {
    if (!machines || machines.length === 0) return null;
    if (selectedMachineId) {
      return (
        machines.find((m) => m.unitId === selectedMachineId) || machines[0]
      );
    }
    return machines[0];
  }, [machines, selectedMachineId]);

  const timeRange = useMemo(() => {
    if (!dateRange.start || !dateRange.end) {
      return { start: undefined, end: undefined };
    }

    return {
      start: dateRange.start,
      end: dateRange.end,
    };
  }, [dateRange]);
  const {
    sensors: sensorDataApi,
    isLoading: sensorsLoading,
    error: sensorsError,
  } = useMachineSensors(selectedMachine?.unitId, {
    start: timeRange.start,
    end: timeRange.end,
    interval: "hourly",
    enabled: USE_API && !!selectedMachine?.unitId,
  });

  const staticSensorPayload =
    !USE_API && selectedMachine
      ? generateSensorData(
          selectedMachine.unitId || selectedMachine.id,
          selectedMachine.healthPercent || selectedMachine.health
        )
      : null;

  const chartData = useMemo(() => {
    if (!USE_API && staticSensorPayload) {
      return {
        vibrationData: staticSensorPayload.vibrationData || [],
        temperatureData: staticSensorPayload.temperatureData || [],
        currentData: staticSensorPayload.currentData || [],
      };
    }

    const sensorData = sensorDataApi || [];
    if (sensorData.length === 0) {
      return { vibrationData: [], temperatureData: [], currentData: [] };
    }

    const vibrationData = sensorData.map((d) => {
      const date = new Date(d.timestamp);
      return {
        time:
          date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) +
          " " +
          date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        fullTime: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        value: d.vibration ?? d.rotationalSpeedRpm ?? null,
        threshold: 2000,
      };
    });

    const temperatureData = sensorData.map((d) => {
      const date = new Date(d.timestamp);
      return {
        time:
          date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) +
          " " +
          date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        fullTime: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        value: d.temperatureC ?? null,
        threshold: 85,
      };
    });

    const currentData = sensorData.map((d) => {
      const date = new Date(d.timestamp);
      return {
        time:
          date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) +
          " " +
          date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
        fullTime: date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        value: d.current ?? d.torqueNm ?? null,
        threshold: 50,
      };
    });

    return { vibrationData, temperatureData, currentData };
  }, [sensorDataApi, staticSensorPayload, USE_API]);

  const handleSelectMachine = (machine) => {
    setSelectedMachineId(machine.unitId);
  };

  const params = useParams();
  useEffect(() => {
    if (params?.unitId) setSelectedMachineId(params.unitId);
  }, [params?.unitId]);

  if (machinesLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-slate-600 dark:text-slate-400">
            Loading machines...
          </p>
        </div>
      </div>
    );
  }

  if (machinesError) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-red-600 dark:text-red-400 font-medium">
            Failed to load machines
          </p>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            {machinesError}
          </p>
        </div>
      </div>
    );
  }

  if (!machines || machines.length === 0) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <Package className="w-8 h-8 text-slate-400" />
          <p className="text-slate-600 dark:text-slate-400">
            No machines found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-slate-900 dark:text-slate-100 mb-2 text-2xl font-bold">
          Machine Details
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          Detailed sensor data and health metrics for all machines
        </p>
      </div>

      {/* Date Range Filter */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Start Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={dateRange.start ? dateRange.start.slice(0, 16) : ""}
              onChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  start: e.target.value
                    ? new Date(e.target.value).toISOString()
                    : "",
                }))
              }
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Select start date"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              End Date (Optional)
            </label>
            <input
              type="datetime-local"
              value={dateRange.end ? dateRange.end.slice(0, 16) : ""}
              onChange={(e) =>
                setDateRange((prev) => ({
                  ...prev,
                  end: e.target.value
                    ? new Date(e.target.value).toISOString()
                    : "",
                }))
              }
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Select end date"
            />
          </div>
          <div>
            <button
              onClick={() =>
                setDateRange({
                  start: "",
                  end: "",
                })
              }
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Current database contains data from Nov 16-18, 2022. Adjust range to
          view different time periods.
        </p>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MachineSidebar
            machines={machines}
            selectedMachine={selectedMachine}
            onSelect={handleSelectMachine}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            isLoading={machinesLoading}
            totalCount={totalCount}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={nextPage}
            onPrevPage={prevPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-3 text-xl">
                {selectedMachine.name ||
                  selectedMachine.productId ||
                  selectedMachine.unitId ||
                  "—"}
                <Badge variant="outline" className="capitalize">
                  {selectedMachine.status ?? "unknown"}
                </Badge>
              </CardTitle>

              <CardDescription className="mt-1">
                Unit ID: {selectedMachine.unitId ?? "—"} • Type:{" "}
                {selectedMachine.type ?? "—"}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBox
                  icon={Activity}
                  label="Health Score"
                  value={
                    selectedMachine.healthPercent != null
                      ? `${selectedMachine.healthPercent}%`
                      : "—"
                  }
                  subColor="text-blue-600"
                >
                  {selectedMachine.healthPercent != null && (
                    <Progress
                      value={selectedMachine.healthPercent}
                      className="h-1 mt-2"
                    />
                  )}
                </StatBox>

                <StatBox
                  icon={Zap}
                  label="RUL"
                  value={
                    selectedMachine.syntheticRUL != null
                      ? `${selectedMachine.syntheticRUL} days`
                      : "—"
                  }
                  subText="Remaining useful life"
                  subColor="text-emerald-600"
                />
              </div>
            </CardContent>
          </Card>

          {sensorsLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="ml-2 text-slate-600 dark:text-slate-400">
                Loading sensor data...
              </span>
            </div>
          ) : sensorsError ? (
            <div className="flex items-center justify-center py-12">
              <AlertCircle className="w-6 h-6 text-red-500" />
              <span className="ml-2 text-red-600 dark:text-red-400">
                Failed to load sensor data
              </span>
            </div>
          ) : (
            <>
              <SensorChart
                title="Vibration Monitoring"
                description="Rotational speed sensor data (RPM)"
                icon={Activity}
                data={chartData.vibrationData}
                unit="RPM"
                color={{
                  hex: "#3b82f6",
                  text: "text-blue-600 dark:text-blue-400",
                }}
              />

              <SensorChart
                title="Temperature Monitoring"
                description="Process temperature sensor data (°C)"
                icon={Thermometer}
                data={chartData.temperatureData}
                unit="°C"
                color={{
                  hex: "#f97316",
                  text: "text-orange-600 dark:text-orange-400",
                }}
              />

              <SensorChart
                title="Torque Monitoring"
                description="Torque measurement sensor data (Nm)"
                icon={Zap}
                data={chartData.currentData}
                unit="Nm"
                color={{
                  hex: "#fbbf24",
                  text: "text-amber-600 dark:text-amber-400",
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function StatBox({
  icon: Icon,
  label,
  value,
  subText,
  children,
  subColor = "text-slate-600",
  truncate = false,
}) {
  return (
    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${subColor}`} />
        <span className="text-xs text-slate-600 dark:text-slate-400">
          {label}
        </span>
      </div>
      <p
        className={`text-slate-900 dark:text-slate-100 font-medium ${
          truncate ? "line-clamp-2 text-sm" : ""
        }`}
      >
        {value}
      </p>
      {subText && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          {subText}
        </p>
      )}
      {children}
    </div>
  );
}
