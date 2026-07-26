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
    <div className="flex h-full min-h-[110px] items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      {/* Icon */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${accentStyles[accent]}`}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {/* Value */}
        <p
          className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-tight text-gray-900 sm:text-lg lg:text-xl"
          title={value}
        >
          {value}
        </p>

        {/* Label */}
        <p className="mt-1 text-left text-xs leading-5 text-gray-500 sm:text-sm">
          {label}
        </p>
      </div>
    </div>
  );
}