import { MapPin, ClipboardText, TrendUp, Plant } from "@phosphor-icons/react";
import { useReports } from "@/hooks/useReports";
import { useDashboardFilters } from "@/context/dashboard-filters";
import { StatCard } from "@/components/dashboard/StatCard";
import { DonutCard } from "@/components/dashboard/DonutCard";
import { ClimateEventsBarCard } from "@/components/dashboard/ClimateEventsBarCard";
import { ReportsOverTimeCard } from "@/components/analytics/ReportsOverTimeCard";
import {
  averageLossBy,
  computeStats,
  countBy,
  reportsOverTime,
  toChartSlices,
  topHotspots,
} from "@/lib/report-utils";

export default function AnalyticsPage() {
  const { data: allReports = [], isLoading, isError } = useReports();
  const { applyFilters, county, dateRange } = useDashboardFilters();

  const reports = applyFilters(allReports);
  const stats = computeStats(reports);

  const timeSeries = reportsOverTime(reports);
  const lossByCrop = averageLossBy(reports, "crop");
  const climateSlices = toChartSlices(countBy(reports, "climateEvent"));
  const hotspots = topHotspots(reports, 5);
  const affectedCounties = new Set(reports.map((r) => r.county)).size;

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading analytics...</div>;
  }

  if (isError) {
    return <div className="p-6 text-sm text-red-600">Couldn't load analytics. Please try again.</div>;
  }

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>

      {(county !== "All Counties" || dateRange !== "All Time") && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
          Showing results for {county !== "All Counties" ? county : "all counties"}
          {dateRange !== "All Time" ? ` · ${dateRange}` : ""}. Change this from the top bar.
        </p>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ClipboardText size={22} weight="fill" />}
          value={stats.totalReports.toLocaleString()}
          label="Total Reports"
          accent="green"
        />
        <StatCard
          icon={<MapPin size={22} weight="fill" />}
          value={affectedCounties.toString()}
          label="Counties Affected"
          accent="amber"
        />
        <StatCard
          icon={<TrendUp size={22} weight="fill" />}
          value={`${stats.averageLossPercentage}%`}
          label="Average Loss"
          accent="violet"
        />
        <StatCard
          icon={<Plant size={22} weight="fill" />}
          value={stats.mostAffectedCrop ?? "—"}
          label="Most Affected Crop"
          accent="blue"
        />
      </div>

      {/* Trend + climate mix */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReportsOverTimeCard title="Reports Over Time" series={timeSeries} />
        </div>
        <DonutCard title="Climate Events" slices={climateSlices} />
      </div>

      {/* Loss by crop + hotspots */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClimateEventsBarCard title="Average Loss % by Crop" entries={lossByCrop} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Top Affected Sub-counties</h3>
          <ul className="divide-y divide-gray-100">
            {hotspots.map((h) => (
              <li key={`${h.subCounty}-${h.county}`} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{h.subCounty}</p>
                  <p className="truncate text-xs text-gray-500">{h.county} County</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium text-gray-900">{h.reportCount} reports</p>
                  <p className="text-xs text-gray-500">{h.averageLoss}% avg loss</p>
                </div>
              </li>
            ))}
            {hotspots.length === 0 && (
              <li className="py-4 text-center text-sm text-gray-400">No data for the current filters.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}