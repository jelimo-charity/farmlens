import { NavLink } from "react-router-dom";
import {
  SquaresFour,
  UploadSimple,
  FileText,
  MapTrifold,
  ChartBar,
  Plant,
} from "@phosphor-icons/react";

interface SidebarProps {
  closeSidebar?: () => void;
}

const navItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: SquaresFour,
    end: true,
  },
  {
    to: "/report",
    label: "Submit Report",
    icon: UploadSimple,
  },
  {
    to: "/reports",
    label: "Reports",
    icon: FileText,
  },
  {
    to: "/map",
    label: "Map",
    icon: MapTrifold,
  },
  {
    to: "/analytics",
    label: "Analytics",
    icon: ChartBar,
  },
];

export function Sidebar({
  closeSidebar,
}: SidebarProps) {
  return (
    // h-dvh, not h-screen — see DashboardLayout.tsx for why. w-72 on the
    // mobile overlay (vs w-64 on desktop) gives touch targets a bit more
    // breathing room without eating too much of a typical ~375-430px phone screen.
    <aside className="flex h-dvh w-72 lg:w-64 shrink-0 flex-col overflow-y-auto border-r border-green-900 bg-[#0F3D22] text-white">
      {/* Logo */}
      <NavLink
        to="/"
        onClick={closeSidebar}
        className="flex items-center gap-3 border-b border-green-800 px-6 py-6 transition-colors hover:bg-green-900/40"
      >
        <Plant
          size={26}
          weight="fill"
          className="text-green-400"
        />

        <span className="text-xl font-semibold tracking-tight">
          FarmLens
        </span>
      </NavLink>

      {/* Navigation */}
      <nav className="mt-5 flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeSidebar}
          >
            {({ isActive }) => (
              <div
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base lg:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-700 text-white shadow-sm"
                    : "text-green-100 hover:bg-green-800/40 hover:text-white"
                }`}
              >
                <Icon
                  size={20}
                  className="lg:hidden"
                  weight={isActive ? "fill" : "regular"}
                />
                <Icon
                  size={19}
                  className="hidden lg:block"
                  weight={isActive ? "fill" : "regular"}
                />

                <span>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-green-800 p-3">
        <NavLink
          to="/"
          onClick={closeSidebar}
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-base lg:text-sm font-medium text-green-100 transition-all duration-200 hover:bg-green-800/40 hover:text-white"
        >
          <Plant size={18} />

          <span>Back to Website</span>
        </NavLink>
      </div>
    </aside>
  );
}