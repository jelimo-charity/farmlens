import type { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
  accent: "green" | "amber" | "blue" | "violet" | "maroon";
}

const accentStyles: Record<StatCardProps["accent"], string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  blue: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
  maroon: "bg-rose-50 text-rose-700",
};

export function StatCard({
  icon,
  value,
  label,
  accent,
}: StatCardProps) {
  return (
    <div className="flex h-28 items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentStyles[accent]}`}
      >
        {icon}
      </div>

      <div className="flex flex-1 flex-col justify-center min-w-0">
        <p className="break-words text-lg font-bold leading-tight text-gray-900">
          {value}
        </p>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          {label}
        </p>
      </div>
    </div>
  );
}