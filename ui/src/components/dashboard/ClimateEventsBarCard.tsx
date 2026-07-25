import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { CountEntry } from  "../../lib/report-utils";

interface ClimateEventsBarCardProps {
  title: string;
  entries: CountEntry[];
}

export function ClimateEventsBarCard({ title, entries }: ClimateEventsBarCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="mb-3 text-sm font-semibold text-gray-900">{title}</h3>
      <div className="h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={entries} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: "#F3F4F6" }} />
            <Bar dataKey="value" fill="#2F9E52" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}