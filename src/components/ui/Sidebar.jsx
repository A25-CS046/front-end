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
    <div className="flex flex-col min-h-full w-64 h-screen bg-base-200">
      <div className="flex items-center gap-1 mr-2 ml-2 mt-2 p-2">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center ">
          {theme === "light" ? (
            <img src="images/logo-light.png" />
          ) : (
            <img src="images/logo-dark.png" />
          )}
        </div>
        <div>
          <h1 className="text-xl text-primary">AEGIS</h1>
          <p className="text-sm text-base-content">Predictive Maintenance</p>
        </div>
      </div>
      <div className="divider m-2" />
      <ul className="menu w-full h-full p-2 text-base-content">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              end
              className={({ isActive }) =>
                isActive
                  ? "active p-4 m-1 bg-primary text-primary-content font-semibold"
                  : "p-4 m-1 hover:bg-base-300"
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
        <button onClick={toggleTheme} className="btn btn-soft mr-2 ml-2">
          {theme === "light" ? (
            <>
              <Moon className="mr-1 h-5 w-5 text-primary" /> Dark Mode
            </>
          ) : (
            <>
              <Sun className="mr-1 h-5 w-5 text-warning" /> Light Mode
            </>
          )}
        </button>

        <div className="divider m-1" />
        {/* System Status */}
        <div className="p-3 mr-2 ml-2 mb-3 bg-base-300  border border-base-300  rounded-lg text-xs text-base-content">
          <p className="font-medium mb-1">System Status</p>
          <p className="flex mb-1 items-center gap-1 text-success">
            <span className="w-2 h-2 bg-success rounded-full"></span>
            All Systems Operational
          </p>
        </div>
      </div>
    </div>
  );
}
