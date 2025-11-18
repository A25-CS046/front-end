import { Card } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

export default function DashboardCharts({
  machineStatusData,
  teamPerformance,
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4">
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6">
        <h3 className="text-slate-900 dark:text-slate-100 mb-4">
          Machine Status Distribution
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={machineStatusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {machineStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-3 gap-2 mt-4">
          {machineStatusData.map((stat) => (
            <div
              key={stat.name}
              className="flex flex-col items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: stat.color }}
                ></div>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  {stat.name}
                </span>
              </div>
              <span className="text-slate-900 dark:text-slate-100">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 p-4 sm:p-6">
        <h3 className="text-slate-900 dark:text-slate-100 mb-4">
          Team Performance Trends
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={teamPerformance}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              className="dark:stroke-slate-800"
            />
            <XAxis dataKey="name" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
              labelStyle={{ color: "#334155" }}
              className="dark:!bg-slate-800 dark:!border-slate-700"
            />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" name="Tasks Completed" />
            <Bar dataKey="efficiency" fill="#3b82f6" name="Efficiency %" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
