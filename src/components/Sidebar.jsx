import { NavLink } from "react-router";
import { useTheme } from "@/hooks/useTheme";
import {
  Moon,
  Sun,
  Activity,
  Sparkles,
  ClipboardList,
  Users,
  Calendar,
  BotMessageSquare,
  Server,
  KeyRound,
  User,
  Wrench,
} from "lucide-react";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const links = [
    { name: "Dashboard", path: "/", icon: Activity },
    { name: "AI Recommendations", path: "/aiRecommendations", icon: Sparkles },
    {
      name: "Ticket Assignment",
      path: "/ticketAssignment",
      icon: ClipboardList,
    },
    { name: "User Management", path: "/userManagement", icon: Users },
    {
      name: "Maintenance Schedule",
      path: "/maintenanceSchedule",
      icon: Calendar,
    },
    { name: "AI Copilot", path: "/aiCopilot", icon: BotMessageSquare },
    { name: "Machine Details", path: "/machineDetails", icon: Server },
    { name: "Change Password", path: "/test", icon: KeyRound },
  ];

  return (
    <div className="flex flex-col min-h-full w-64 h-screen bg-base-200 dark:bg-slate-900 dark:border-r dark:border-gray-50/20">
      <div className="flex items-center gap-1 mx-2 my-3 p-2">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center ">
          {theme === "light" ? (
            <img src="images/logo-light.png" />
          ) : (
            <img src="images/logo-dark.png" />
          )}
        </div>
        <div>
          <h1 className="text-xl text-blue-600 dark:text-emerald-400">AEGIS</h1>
          <p className="text-sm text-base-content dark:text-gray-400">
            Predictive Maintenance
          </p>
        </div>
      </div>
      <div className="divider mx-0 my-2" />
      <div className="mx-4 my-1">
        <label className="text-xs text-gray-600 dark:text-gray-400 mb-2 block">
          Role
        </label>
        <label className="flex items-center gap-2 px-3 py-2 my-1 text-sm dark:bg-slate-800 dark:text-gray-300 rounded-lg">
          {/* {user.role === "technician" ? <></> : <></>} */}
          <Wrench
            strokeWidth={3}
            className="w-4 h-4 text-blue-600/80 dark:text-blue-400/80"
          />
          <p>Technician</p>
        </label>
      </div>
      <div className="divider mx-0 my-2" />
      <ul className="menu w-full h-full p-2 text-base-content dark:text-gray-300">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end
              className={({ isActive }) =>
                isActive
                  ? "active p-3.5 m-1 bg-primary text-primary-content font-semibold border rounded-lg dark:bg-emerald-500/25 dark:text-emerald-400 dark:border-emerald-800"
                  : "p-3.5 m-1 hover:bg-base-300 dark:hover:bg-emerald-800/25 rounded-lg"
              }
            >
              <link.icon className="w-5 h-5 mr-3" />
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex flex-col">
        <div className="divider m-1" />
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn mx-2 justify-start rounded-lg text-sm dark:bg-base-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {theme === "light" ? (
            <>
              <Moon className="h-5 w-5 text-primary" /> Dark Mode
            </>
          ) : (
            <>
              <Sun className="h-5 w-5 text-warning" /> Light Mode
            </>
          )}
        </button>

        <div className="divider m-1" />
        {/* System Status */}
        <div className="p-3 mx-2 mb-3 bg-base-300  border border-base-300 dark:bg-slate-800 dark:border-gray-700 rounded-lg text-xs text-base-content">
          <p className="font-medium mb-1 dark:text-gray-400 dark:text-sm">
            System Status
          </p>
          <div className="flex mb-1 items-center gap-1 text-success">
            <div className="inline-grid *:[grid-area:1/1] gap-1 text-success">
              <div className="status status-success animate-ping"></div>
              <div className="status status-success"></div>
            </div>
            All Systems Operational
          </div>
        </div>
      </div>
    </div>
  );
}
