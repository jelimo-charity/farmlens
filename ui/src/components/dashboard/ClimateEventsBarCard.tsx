import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

import {
  formatCurrencyShort,
  type CropLossEntry,
} from "../../lib/report-utils";

interface ClimateEventsBarCardProps {
  title: string;
  entries: CropLossEntry[];
}

const COLORS = [
  "#2F9E52",
  "#3B82F6",
  "#F59E0B",
  "#A855F7",
  "#EF4444",
  "#14B8A6",
  "#F97316",
  "#EC4899",
];

export function ClimateEventsBarCard({
  title,
  entries,
}: ClimateEventsBarCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>

        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
          {entries.length} Crops
        </span>
      </div>

      <div className="h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={entries}
            layout="vertical"
            margin={{
              top: 5,
              right: 40,
              left: 30,
              bottom: 5,
            }}
            barCategoryGap={18}
          >
            <CartesianGrid
              horizontal={false}
              strokeDasharray="3 3"
              stroke="#E5E7EB"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              type="category"
              dataKey="label"
              width={95}
              tick={{
                fontSize: 13,
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
  cursor={{ fill: "#F9FAFB" }}
  contentStyle={{
    borderRadius: 14,
    border: "1px solid #E5E7EB",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
  }}
  formatter={(value) => [
    `${Number(value ?? 0).toFixed(1)}%`,
    "Average Loss",
  ]}
  labelFormatter={(label, payload) => {
    if (!payload?.length) return label;

    const crop = payload[0].payload as CropLossEntry;

    return `${crop.label}

Financial Loss: ${formatCurrencyShort(crop.totalFinancialLoss)}

Reports: ${crop.reportCount}`;
  }}
/>

            <Bar
              dataKey="averageLossPercentage"
              radius={[0, 8, 8, 0]}
              barSize={24}
            >
              {entries.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}