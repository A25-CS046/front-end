import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout() {
  return (
    <div className="drawer lg:drawer-open dark:bg-slate-950 min-h-screen">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col flex-1 relative">
        <Navbar />
        <main className="overflow-y-auto">
          {/* GANTI {children} DENGAN <Outlet /> */}
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="app-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}
