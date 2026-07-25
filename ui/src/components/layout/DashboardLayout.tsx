import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { DashboardFiltersProvider } from "@/context/dashboard-filters";

export function DashboardLayout() {
  return (
    <DashboardFiltersProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardFiltersProvider>
  );
}