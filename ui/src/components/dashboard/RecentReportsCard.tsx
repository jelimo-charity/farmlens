import { Link } from "react-router-dom";
import type { Report } from "../../types/report";
import { impactColor, impactLevel, timeAgo } from "../../lib/report-utils";

interface RecentReportsCardProps {
  reports: Report[];
}

export function RecentReportsCard({ reports }: RecentReportsCardProps) {
  const recent = [...reports]
    .sort((a, b) => new Date(b.reportDate).getTime() - new Date(a.reportDate).getTime())
    .slice(0, 4);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Recent Reports</h3>
        <Link to="/reports" className="text-xs font-medium text-green-700 hover:underline">
          View All
        </Link>
      </div>
      <ul className="divide-y divide-gray-100">
        {recent.map((report) => {
          const level = impactLevel(report.estimatedLossPercentage);
          return (
            <li key={report.id} className="flex items-start gap-2.5 py-2.5 first:pt-0 last:pb-0">
              <span
                className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: impactColor[level] }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">
                  {report.ward}, {report.subCounty}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {report.crop} · {report.farmSizeAcres} acres · {report.estimatedLossPercentage}%
                </p>
              </div>
              <span className="shrink-0 whitespace-nowrap text-xs text-gray-400">
                {timeAgo(report.reportDate)}
              </span>
            </li>
          );
        })}
        {recent.length === 0 && (
          <li className="py-4 text-center text-sm text-gray-400">No reports yet.</li>
        )}
      </ul>
    </div>
  );
}