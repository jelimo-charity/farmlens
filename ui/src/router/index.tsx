import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import ReportsPage from "@/pages/Reports";
import MapPage from "@/pages/Map";
import AnalyticsPage from "@/pages/Analytics";
import ReportIssue from "@/pages/ReportIssue";
import NotFound from "@/pages/NotFound";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/reports", element: <ReportsPage /> },
      { path: "/map", element: <MapPage /> },
      { path: "/analytics", element: <AnalyticsPage /> },
      { path: "/report", element: <ReportIssue /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);