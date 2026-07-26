import { useMemo, useState } from "react";
import { MagnifyingGlass, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useReports } from "@/hooks/useReports";
import { useDashboardFilters } from "@/context/dashboard-filters";
import { impactColor, impactLevel, impactLabel } from "@/lib/report-utils";

const PAGE_SIZE = 10;

export default function ReportsPage() {
  const { data: allReports = [], isLoading, isError } = useReports();
  const { applyFilters, county, dateRange } = useDashboardFilters();

  const [search, setSearch] = useState("");
  const [crop, setCrop] = useState("All Crops");
  const [page, setPage] = useState(1);

  const baseReports = applyFilters(allReports);
  const crops = Array.from(new Set(allReports.map((r) => r.crop))).sort();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return baseReports
      .filter((r) => (crop === "All Crops" ? true : r.crop === crop))
      .filter((r) => {
        if (!term) return true;
        return (
          r.county.toLowerCase().includes(term) ||
          r.subCounty.toLowerCase().includes(term) ||
          r.ward?.toLowerCase().includes(term) ||
          r.crop.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime());
  }, [baseReports, search, crop]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function resetToFirstPage<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading reports...</div>;
  }

  if (isError) {
    return <div className="p-6 text-sm text-red-600">Couldn't load reports. Please try again.</div>;
  }

  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <span className="text-sm text-gray-500">{filtered.length} reports</span>
      </div>

      {(county !== "All Counties" || dateRange !== "All Time") && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
          Showing results for {county !== "All Counties" ? county : "all counties"}
          {dateRange !== "All Time" ? ` · ${dateRange}` : ""}. Change this from the top bar.
        </p>
      )}

      {/* Search + crop filter */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <MagnifyingGlass size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => resetToFirstPage(setSearch)(e.target.value)}
            placeholder="Search by county, sub-county, ward, or crop..."
            className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <select
          value={crop}
          onChange={(e) => resetToFirstPage(setCrop)(e.target.value)}
          className="rounded-lg border border-gray-200 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option>All Crops</option>
          {crops.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">County</th>
              <th className="px-4 py-3 font-medium">Sub-county</th>
              <th className="px-4 py-3 font-medium">Crop</th>
              <th className="px-4 py-3 font-medium">Acres</th>
              <th className="px-4 py-3 font-medium"> Estimated Crop Loss %</th>
              <th className="px-4 py-3 font-medium">Estimated Financial Loss (KES)</th>
              <th className="px-4 py-3 font-medium">Impact</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageRows.map((report) => {
              const level = impactLevel(report.estimatedLossPercentage);
              return (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{report.county}</td>
                  <td className="px-4 py-3 text-gray-600">{report.subCounty}</td>
                  <td className="px-4 py-3 text-gray-600">{report.crop}</td>
                  <td className="px-4 py-3 text-gray-600">{report.farmSizeAcres}</td>
                  <td className="px-4 py-3 text-gray-600">{report.estimatedLossPercentage}%</td>
                  <td className="px-4 py-3 text-gray-600">{report.estimatedFinancialLoss}</td>
                  <td className="px-4 py-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: `${impactColor[level]}1A`, color: impactColor[level] }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: impactColor[level] }} />
                      {impactLabel[level]}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    {new Date(report.reportDate).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
            {pageRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                  No reports match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40"
              aria-label="Previous page"
            >
              <CaretLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 disabled:opacity-40"
              aria-label="Next page"
            >
              <CaretRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}