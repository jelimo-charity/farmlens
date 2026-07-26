import { ClipboardText, MapPin, Plant, ShieldCheck } from "@phosphor-icons/react";
import { useReports } from "@/hooks/useReports";
import { useDashboardFilters } from "@/context/dashboard-filters";
import { StatCard } from "@/components/dashboard/StatCard";
import { DonutCard } from "@/components/dashboard/DonutCard";
import { RecentReportsCard } from "@/components/dashboard/RecentReportsCard";
import { ReportsMapCard } from "@/components/dashboard/ReportsMapCard";
import { computeStats, countBy, toChartSlices } from "@/lib/report-utils";

export default function DashboardPage() {
  const { data: allReports = [], isLoading, isError } = useReports();
  const { applyFilters } = useDashboardFilters();

  const reports = applyFilters(allReports);
  const stats = computeStats(reports);

  const countyEntries = countBy(reports, "county").slice(0, 4);
  const cropSlices = toChartSlices(countBy(reports, "crop"));

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading dashboard...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-sm text-red-600">
        Couldn't load the dashboard. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {reports.length === 0 && (
        <p className="rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-800">
          No reports match the current county/date filters.
        </p>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ClipboardText size={22} weight="fill" />}
          value={stats.totalReports.toLocaleString()}
          label="Total Reports"
          accent="green"
        />
        <StatCard
          icon={<MapPin size={22} weight="fill" />}
          value={stats.totalFarmSizeAcres.toLocaleString()}
          label="Acres Affected"
          accent="amber"
        />
        <StatCard
          icon={<Plant size={22} weight="fill" />}
          value={stats.mostAffectedCrop ?? "—"}
          label="Most Affected Crop"
          accent="blue"
        />
        <StatCard
          icon={<ShieldCheck size={22} weight="fill" />}
          value={`${stats.averageLossPercentage}%`}
          label="Average Loss"
          accent="violet"
        />
      </div>

      {/* Map + recent reports */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ReportsMapCard title="Reports Across Counties" reports={reports} />
        </div>
        <RecentReportsCard reports={reports} />
      </div>

      {/* Breakdown charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DonutCard title="Reports by County" slices={toChartSlices(countyEntries)} />
        <DonutCard title="Affected Crops" slices={cropSlices} />
      </div>
    </div>
  );
}