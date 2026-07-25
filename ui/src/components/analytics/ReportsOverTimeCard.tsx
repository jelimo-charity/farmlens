import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { TimeSeriesPoint } from "../../lib/report-utils";

interface ReportsOverTimeCardProps {
  title: string;
  series: TimeSeriesPoint[];
}

export function ReportsOverTimeCard({ title, series }: ReportsOverTimeCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">{title}</h3>
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <Tooltip
  labelFormatter={(_, payload) => payload?.[0]?.payload?.label ?? ""}
  formatter={(value) => [Number(value ?? 0), "Reports"]}
/>
            <Line
              type="monotone"
              dataKey="count"
              stroke="#2F9E52"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {series.length === 0 && (
        <p className="text-center text-sm text-gray-400">No data for the current filters.</p>
      )}
    </div>
  );
}