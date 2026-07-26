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
      <NavLink
  to="/"
  className="flex items-center gap-2 border-b border-green-800 px-5 py-5 transition hover:bg-green-900/40"
>
  <Plant
    size={24}
    weight="fill"
    className="text-green-400"
  />

  <span className="text-lg font-semibold text-white">
    FarmLens
  </span>
</NavLink>

      <nav className="mt-4 flex-1 space-y-1 px-3">
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
      <div className="border-t border-green-800 p-3">
  <NavLink
    to="/"
    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-green-100 transition hover:bg-green-800/40 hover:text-white"
  >
    <Plant size={18} />
    Back to Website
  </NavLink>
</div>
    </aside>
  );
}