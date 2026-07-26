import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { DashboardFiltersProvider } from "@/context/dashboard-filters";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardFiltersProvider>
      {/* h-dvh (not h-screen/100vh) — 100vh on mobile browsers is calculated
          against the largest possible viewport (address bar hidden), which
          doesn't match the actual visible area and shows up as dead space
          at the bottom, especially as the browser chrome shows/hides on scroll. */}
      <div className="flex h-dvh bg-gray-50 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <div className="fixed left-0 top-0 z-50 h-dvh lg:hidden">
              <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>
          </>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardFiltersProvider>
  );
}