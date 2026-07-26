import {
  ClipboardText,
  CurrencyCircleDollar,
  MapPin,
  Plant,
  TrendUp,
} from "@phosphor-icons/react";

import { useReports } from "@/hooks/useReports";
import { useDashboardFilters } from "@/context/dashboard-filters";

import { StatCard } from "@/components/dashboard/StatCard";
import { DonutCard } from "@/components/dashboard/DonutCard";
import { ClimateEventsBarCard } from "@/components/dashboard/ClimateEventsBarCard";
import { ReportsOverTimeCard } from "@/components/analytics/ReportsOverTimeCard";
import { formatCurrencyShort } from "@/lib/report-utils";

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
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading analytics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Couldn't load analytics. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Insights from farmer climate reports.
        </p>
      </div>

      {(county !== "All Counties" || dateRange !== "All Time") && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Showing results for{" "}
          <span className="font-semibold">
            {county !== "All Counties" ? county : "All Counties"}
          </span>
          {dateRange !== "All Time" && (
            <>
              {" "}
              • <span className="font-semibold">{dateRange}</span>
            </>
          )}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          icon={<ClipboardText size={20} weight="fill" />}
          value={stats.totalReports.toLocaleString()}
          label="Total Reports"
          accent="green"
        />

        <StatCard
          icon={<MapPin size={20} weight="fill" />}
          value={affectedCounties.toString()}
          label="Counties"
          accent="amber"
        />

        <StatCard
          icon={<TrendUp size={20} weight="fill" />}
          value={`${stats.averageLossPercentage}%`}
          label="Average Loss"
          accent="violet"
        />

        <StatCard
          icon={<CurrencyCircleDollar size={20} weight="fill" />}
          value={formatCurrencyShort(stats.estimatedFinancialLoss ?? 0)}
          label="Financial Loss"
          accent="maroon"
        />

        <StatCard
          icon={<Plant size={20} weight="fill" />}
          value={stats.mostAffectedCrop ?? "—"}
          label="Most Affected Crop"
          accent="blue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReportsOverTimeCard
            title="Reports Over Time"
            series={timeSeries}
          />
        </div>

        <DonutCard
          title="Climate Events"
          slices={climateSlices}
        />
      </div>

      {/* Lower Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClimateEventsBarCard
            title="Average Loss by Crop (%)"
            entries={lossByCrop}
          />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            Top Affected Sub-counties
          </h3>

          <ul className="divide-y divide-gray-100">
            {hotspots.map((h) => (
              <li
                key={`${h.subCounty}-${h.county}`}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {h.subCounty}
                  </p>

                  <p className="text-xs text-gray-500">
                    {h.county} County
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {h.reportCount}
                  </p>

                  <p className="text-xs text-gray-500">
                    {h.averageLoss}% loss
                  </p>
                </div>
              </li>
            ))}

            {hotspots.length === 0 && (
              <li className="py-8 text-center text-sm text-gray-400">
                No hotspot data available.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}