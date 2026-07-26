import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { DashboardFiltersProvider } from "@/context/dashboard-filters";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent background scrolling when the mobile sidebar is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <DashboardFiltersProvider>
      <div className="flex h-dvh overflow-hidden bg-slate-50">
        {/* Desktop Sidebar */}
        <aside className="hidden shrink-0 lg:block">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />

            <aside className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] lg:hidden">
              <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </aside>
          </>
        )}

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar onMenuClick={() => setSidebarOpen(true)} />

          <main
            className="
              flex-1
              overflow-y-auto
              overscroll-contain
              bg-slate-50
            "
          >
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardFiltersProvider>
  );
}