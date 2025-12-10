import { useNavigate, NavLink } from "react-router-dom"; // Changed from "react-router" to "react-router-dom"
import React, { useState, useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";
import { getProfile, logout } from "@/api/authService"; // Import logout
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
  Wrench,
  LogOut,
  UserStar,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const userData = await getProfile();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Handle error, e.g., clear token if unauthorized
        localStorage.removeItem("authToken");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserProfile();
  }, []); // Run once on mount

  // Helper to get initials for AvatarFallback
  const getUserInitials = (name) => {
    if (!name) return "US"; // User Short for Unknown User
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  const links = [
    { name: "Dashboard", path: "/", icon: Activity },
    { name: "AI Recommendations", path: "/ai-recommendations", icon: Sparkles },
    {
      name: "Ticket Assignment",
      path: "/ticket-assignment",
      icon: ClipboardList,
    },
    { name: "User Management", path: "/user-management", icon: Users },
    {
      name: "Maintenance Schedule",
      path: "/maintenance-schedule",
      icon: Calendar,
    },
    { name: "AI Copilot", path: "/ai-copilot", icon: BotMessageSquare },
    { name: "Machine Details", path: "/machine-details", icon: Server },
    { name: "Change Password", path: "/change-password", icon: KeyRound },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the backend logout API
    } catch (error) {
      console.error("Error during logout API call:", error);
      // Even if API call fails, proceed to clear local storage and redirect
    } finally {
      localStorage.removeItem("authToken"); // Clear the token
      setUser(null); // Clear user state
      navigate("/auth/login"); // Redirect to login page
    }
  };

  return (
    <div className="flex flex-col min-h-full w-64 h-full bg-base-200 dark:bg-slate-900 dark:border-r dark:border-gray-50/20 overflow-y-auto">
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

      {/* Dynamic User Profile Widget */}
      <div className="mx-4 my-1 p-3 flex items-center gap-3 dark:bg-slate-800/50 rounded-lg">
        {loadingUser ? (
          <div className="w-10 h-10 rounded-full bg-slate-700 animate-pulse"></div>
        ) : user ? (
          <>
            <Avatar className="flex h-10 w-10 select-none items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 align-middle">
              <AvatarFallback className="text-white text-sm font-medium leading-none">
                {getUserInitials(user.name)}
              </AvatarFallback>
              {/* Optional: Add Avatar.Image if you have user profile pictures */}
              {/* <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src="/path/to/user/image.jpg"
                alt={user.name}
              /> */}
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="text-slate-700  dark:text-white text-sm font-semibold truncate">
                {user.name}
              </span>
              <span className="flex items-center text-slate-400 dark:text-blue-300 text-xs gap-1 capitalize">
                {user.role === "supervisor" ? (
                  <UserStar className="w-3 h-3" />
                ) : (
                  <Wrench className="w-3 h-3" />
                )}

                {user.role}
              </span>
            </div>
          </>
        ) : (
          <div className="text-sm text-slate-500">No user data</div>
        )}
      </div>

      <div className="divider mx-0 my-2" />
      <ul className="menu w-full flex-1 p-2 text-base-content dark:text-gray-300">
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
          className="btn mx-2 my-1 justify-start rounded-lg text-sm dark:bg-base-200 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
        <button
          onClick={handleLogout}
          className="btn mx-2 my-1 justify-start rounded-lg text-sm border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
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

