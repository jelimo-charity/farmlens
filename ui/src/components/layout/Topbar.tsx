import {
  Bell,
  CalendarBlank,
  CaretDown,
  List,
  Plant,
} from "@phosphor-icons/react";

import {
  useDashboardFilters,
  DATE_RANGES,
  type DateRange,
} from "@/context/dashboard-filters";

import { useReports } from "@/hooks/useReports";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({
  onMenuClick,
}: TopbarProps) {
  const { data: reports = [] } = useReports();

  const {
    county,
    setCounty,
    dateRange,
    setDateRange,
  } = useDashboardFilters();

  const counties = Array.from(
    new Set(reports.map((r) => r.county))
  ).sort();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
      >
        <List size={24} />
      </button>

      <div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
        {/* County Filter */}
        <div className="relative hidden sm:block">
          <select
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option>All Counties</option>

            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <CaretDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Date Filter */}
        <div className="relative hidden md:block">
          <select
            value={dateRange}
            onChange={(e) =>
              setDateRange(
                e.target.value as DateRange
              )
            }
            className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-8 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            {DATE_RANGES.map((range) => (
              <option
                key={range}
                value={range}
              >
                {range}
              </option>
            ))}
          </select>

          <CalendarBlank
            size={14}
            className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <CaretDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        {/* Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-green-700">
          <Plant
            size={18}
            weight="fill"
          />
        </div>
      </div>
    </header>
  );
}