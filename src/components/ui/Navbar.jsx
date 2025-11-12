import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="navbar bg-base-200 lg:hidden">
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
        <button onClick={toggleTheme} className="btn btn-square btn-ghost">
          {theme === "light" ? <Moon /> : <Sun />}
        </button>
      </div>
      <div className="flex-none">
        <label htmlFor="app-drawer" className="btn btn-square btn-ghost">
          <Menu />
        </label>
      </div>
    </div>
  );
}
