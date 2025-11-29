import { useState, useMemo } from "react";
import { Activity, Thermometer, Zap } from "lucide-react";

// Components & Data
import { machines, generateSensorData } from "@/data/machineData";
import MachineSidebar from "@/components/machine/MachineSidebar";
import SensorChart from "@/components/machine/SensorChart";

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
  const [selectedMachine, setSelectedMachine] = useState(machines[0]);

  const sensorData = useMemo(() => {
    return generateSensorData(selectedMachine.id, selectedMachine.health);
  }, [selectedMachine]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-slate-900 dark:text-slate-100 mb-2 text-2xl font-bold">
          Machine Details
        </h1>

        <p className="text-slate-600 dark:text-slate-400">
          Detailed sensor data and health metrics for all machines
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <MachineSidebar
            machines={machines}
            selectedMachine={selectedMachine}
            onSelect={setSelectedMachine}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <CardTitle className="text-slate-900 dark:text-slate-100 flex items-center gap-3 text-xl">
                {selectedMachine.name}
                <Badge variant="outline" className="capitalize">
                  {selectedMachine.status}
                </Badge>
              </CardTitle>

              <CardDescription className="mt-1">
                {selectedMachine.id} • {selectedMachine.type}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatBox
                  icon={Activity}
                  label="Health Score"
                  value={`${selectedMachine.health}%`}
                  subColor="text-blue-600"
                >
                  <Progress
                    value={selectedMachine.health}
                    className="h-1 mt-2"
                  />
                </StatBox>

                <StatBox
                  icon={Zap}
                  label="RUL"
                  value={`${selectedMachine.rul} days`}
                  subText="Remaining useful life"
                  subColor="text-emerald-600"
                />

                <StatBox
                  icon={Package}
                  label="Manufacturer"
                  value={selectedMachine.manufacturer}
                  subText={selectedMachine.model}
                  subColor="text-blue-600"
                />

                <StatBox
                  icon={MapPin}
                  label="Location"
                  value={selectedMachine.location}
                  subColor="text-amber-600"
                  truncate
                />

                <StatBox
                  icon={Calendar}
                  label="Installation"
                  value={selectedMachine.installDate}
                />

                <StatBox
                  icon={Wrench}
                  label="Last Maintenance"
                  value={selectedMachine.lastMaintenance}
                  subColor="text-emerald-600"
                />
              </div>
            </CardContent>
          </Card>

          <SensorChart
            title="Vibration Monitoring"
            description="Real-time vibration data over 24 hours (mm/s)"
            icon={Activity}
            data={sensorData.vibrationData}
            unit="Vibration"
            color={{ hex: "#3b82f6", text: "text-blue-600 dark:text-blue-400" }}
          />

          <SensorChart
            title="Temperature Monitoring"
            description="Real-time temperature data over 24 hours (°C)"
            icon={Thermometer}
            data={sensorData.temperatureData}
            unit="Temperature"
            color={{
              hex: "#f97316",
              text: "text-orange-600 dark:text-orange-400",
            }}
          />

          <SensorChart
            title="Current Monitoring"
            description="Real-time current data over 24 hours (Amperes)"
            icon={Zap}
            data={sensorData.currentData}
            unit="Current"
            color={{
              hex: "#fbbf24",
              text: "text-amber-600 dark:text-amber-400",
            }}
          />
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
