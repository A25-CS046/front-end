import { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="drawer lg:drawer-open dark:bg-slate-950">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col flex-1 relative">
        <Navbar />
        <main className="overflow-y-auto">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="app-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}
