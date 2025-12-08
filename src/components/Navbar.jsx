import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const drawer = document.getElementById("app-drawer");
    const syncState = () => setOpen(drawer.checked);
    drawer.addEventListener("change", syncState);

    return () => drawer.removeEventListener("change", syncState);
  }, []);
  return (
    <div className="navbar bg-base-200 lg:hidden dark:bg-slate-900 dark:border-r dark:border-gray-50/20">
      <div className="flex-1">
        <label className="btn btn-ghost text-xl">
          {theme === "light" ? (
            <img
              src="/images/logo-light.png"
              alt="logo"
              className="w-10 -h10"
            />
          ) : (
            <img src="/images/logo-dark.png" alt="logo" className="w-10 -h10" />
          )}
          AEGIS
        </label>
      </div>
      <div className="flex-none">
        <button
          onClick={toggleTheme}
          className="btn btn-square btn-ghost swap swap-rotate dark:text-gray-300  dark:hover:bg-transparent"
        >
          <input type="checkbox" />
          {theme === "light" ? (
            <Moon className="swap-active" />
          ) : (
            <Sun className="swap-off" />
          )}
        </button>
      </div>
      <div className="flex-none">
        <label
          htmlFor="app-drawer"
          className="btn btn-square btn-ghost swap swap-rotate dark:text-gray-300  dark:hover:bg-transparent"
          onClick={() => setOpen(!open)}
        >
          <input type="checkbox" checked={open} readOnly />
          <Menu className="swap-off" size={28} />
          <X className="swap-on" size={28} />
        </label>
      </div>
    </div>
  );
}
