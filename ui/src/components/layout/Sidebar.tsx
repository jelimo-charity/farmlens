import { NavLink } from "react-router-dom";
import { SquaresFour, UploadSimple, FileText, MapTrifold, ChartBar, Plant } from "@phosphor-icons/react";
// Bring this back once the page/route exists:
// import { Gear } from "@phosphor-icons/react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: SquaresFour, end: true },
  { to: "/report", label: "Submit Report", icon: UploadSimple },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/map", label: "Map", icon: MapTrifold },
  { to: "/analytics", label: "Analytics", icon: ChartBar },
  // Add this back once the page/route exists:
  // { to: "/settings", label: "Settings", icon: Gear },
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col bg-[#0F3D22] text-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <Plant size={24} weight="fill" className="text-green-400" />
        <span className="text-lg font-semibold">FarmPulse</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-green-700/60 text-white"
                  : "text-green-100/80 hover:bg-green-800/40 hover:text-white"
              }`
            }
          >
            <Icon size={18} weight={"regular"} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}