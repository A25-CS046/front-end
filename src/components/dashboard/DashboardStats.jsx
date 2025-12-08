import { Card } from "@/components/ui/Card";
import { Activity, Users, Wrench, Server } from "lucide-react";

function StatCard({
  title,
  value,
  subtext,
  icon,
  className,
  textColor,
  isLoading,
}) {
  return (
    <Card className={`bg-linear-to-br ${className} p-3 sm:p-4`}>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {title}
        </p>
        {icon}
      </div>
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 mb-1"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
        </div>
      ) : (
        <>
          <p className="text-slate-900 dark:text-slate-100 font-semibold text-base sm:text-lg lg:text-xl">
            {value}
          </p>
          <p className={`text-xs ${textColor} mt-1`}>{subtext}</p>
        </>
      )}
    </Card>
  );
}

export default function DashboardStats({
  totalMachines,
  avgHealth,
  activeTasks,
  teamMembers,
  isLoading = false,
}) {
  // Fallback values
  const tasks = activeTasks || { total: 0, inProgress: 0, pending: 0 };
  const team = teamMembers || { total: 0, available: 0, onTask: 0 };

  const statCardsData = [
    {
      title: "Total Machines",
      value: totalMachines ?? "-",
      subtext: "All systems monitored",
      icon: <Server className="w-5 h-5 text-teal-600 dark:text-emerald-400" />,
      className:
        "from-teal-50 to-teal-100/50 dark:from-emerald-500/10 dark:to-emerald-600/5 border-teal-200 dark:border-emerald-500/20",
      textColor: "text-teal-600 dark:text-emerald-400",
    },
    {
      title: "Active Tasks",
      value: tasks.inProgress + tasks.pending || "-",
      subtext: `${tasks.inProgress} In Progress`,
      icon: <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      className:
        "from-blue-50 to-blue-100/50 dark:from-blue-500/10 dark:to-blue-600/5 border-blue-200 dark:border-blue-500/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Team Members",
      value: team.total || "-",
      subtext: `${team.onTask} On Task`,
      icon: <Users className="w-5 h-5 text-orange-600 dark:text-amber-400" />,
      className:
        "from-orange-50 to-orange-100/50 dark:from-amber-500/10 dark:to-amber-600/5 border-orange-200 dark:border-amber-500/20",
      textColor: "text-orange-600 dark:text-amber-400",
    },
    {
      title: "Avg Health Score",
      value: avgHealth != null ? `${avgHealth}%` : "-",
      subtext: "Fleet-wide average",
      icon: (
        <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
      ),
      className:
        "from-purple-50 to-purple-100/50 dark:from-purple-500/10 dark:to-purple-600/5 border-purple-200 dark:border-purple-500/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {statCardsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtext={stat.subtext}
          icon={stat.icon}
          className={stat.className}
          textColor={stat.textColor}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
