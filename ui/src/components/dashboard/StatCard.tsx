import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  accent: "green" | "amber" | "blue" | "violet";
}

const accentStyles: Record<StatCardProps["accent"], string> = {
  green: "bg-green-50 text-green-700",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-blue-50 text-blue-700",
  violet: "bg-violet-50 text-violet-700",
};

export function StatCard({ icon, value, label, accent }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${accentStyles[accent]}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="truncate text-xl font-semibold text-gray-900">{value}</p>
        <p className="truncate text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}