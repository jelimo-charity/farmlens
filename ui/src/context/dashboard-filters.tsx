import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Report } from "@/types/report";

export const DATE_RANGES = ["Last 7 Days", "Last 30 Days", "This Season", "All Time"] as const;
export type DateRange = (typeof DATE_RANGES)[number];

const DATE_RANGE_DAYS: Record<DateRange, number | null> = {
  "Last 7 Days": 7,
  "Last 30 Days": 30,
  "This Season": 90, // approximation — no season start/end date in the schema yet
  "All Time": null,
};

interface DashboardFiltersValue {
  county: string; // "All Counties" or an exact county name
  setCounty: (county: string) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  /** Applies the current county + date range filters to a list of reports. */
  applyFilters: (reports: Report[]) => Report[];
}

const DashboardFiltersContext = createContext<DashboardFiltersValue | null>(null);

export function DashboardFiltersProvider({ children }: { children: ReactNode }) {
  const [county, setCounty] = useState("All Counties");
  const [dateRange, setDateRange] = useState<DateRange>("All Time");

  const applyFilters = useMemo(() => {
    return (reports: Report[]) => {
      const days = DATE_RANGE_DAYS[dateRange];
      const cutoff = days ? Date.now() - days * 24 * 60 * 60 * 1000 : null;

      return reports.filter((report) => {
        if (county !== "All Counties" && report.county !== county) return false;
        if (cutoff && new Date(report.reportDate).getTime() < cutoff) return false;
        return true;
      });
    };
  }, [county, dateRange]);

  const value: DashboardFiltersValue = {
    county,
    setCounty,
    dateRange,
    setDateRange,
    applyFilters,
  };

  return (
    <DashboardFiltersContext.Provider value={value}>
      {children}
    </DashboardFiltersContext.Provider>
  );
}

export function useDashboardFilters() {
  const ctx = useContext(DashboardFiltersContext);
  if (!ctx) {
    throw new Error("useDashboardFilters must be used within DashboardFiltersProvider");
  }
  return ctx;
}