import { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Sidebar from "@/components/ui/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side ">
        <label htmlFor="app-drawer" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}
