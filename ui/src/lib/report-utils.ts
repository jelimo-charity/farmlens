import type { Report } from "../types/report";

export type ImpactLevel = "high" | "medium" | "low";

/** Loss-percentage thresholds used everywhere impact is color-coded. */
export function impactLevel(lossPercentage: number): ImpactLevel {
  if (lossPercentage >= 50) return "high";
  if (lossPercentage >= 25) return "medium";
  return "low";
}

export const impactColor: Record<ImpactLevel, string> = {
  high: "#EF4444", // red
  medium: "#F59E0B", // amber
  low: "#22C55E", // green
};

export const impactLabel: Record<ImpactLevel, string> = {
  high: "High Impact",
  medium: "Medium Impact",
  low: "Low Impact",
};

/** "2 min ago", "5 hr ago", "3 days ago" */
export function timeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export interface CountEntry {
  label: string;
  value: number;
}

/** Groups reports by a key and returns counts sorted descending. */
export function countBy(
  reports: Report[],
  key: keyof Report,
): CountEntry[] {
  const counts = new Map<string, number>();
  for (const report of reports) {
    const raw = report[key];
    const label = typeof raw === "string" ? raw : String(raw);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export interface ComputedStats {
  totalReports: number;
  totalFarmSizeAcres: number;
  averageLossPercentage: number;
  mostAffectedCrop: string | null;
}

/** Derives the top-row stat card values from whatever report list is currently in view (already filtered). */
export function computeStats(reports: Report[]): ComputedStats {
  const totalReports = reports.length;
  const totalFarmSizeAcres = Math.round(
    reports.reduce((sum, r) => sum + (r.farmSizeAcres ?? 0), 0) * 10,
  ) / 10;
  const averageLossPercentage = totalReports
    ? Math.round(
        (reports.reduce((sum, r) => sum + (r.estimatedLossPercentage ?? 0), 0) / totalReports) * 10,
      ) / 10
    : 0;
  const mostAffectedCrop = countBy(reports, "crop")[0]?.label ?? null;

  return { totalReports, totalFarmSizeAcres, averageLossPercentage, mostAffectedCrop };
}

export interface TimeSeriesPoint {
  date: string; // ISO yyyy-mm-dd, for sorting
  label: string; // e.g. "Jul 21", for display
  count: number;
}

/** Counts reports per calendar day, sorted chronologically. */
export function reportsOverTime(reports: Report[]): TimeSeriesPoint[] {
  const counts = new Map<string, number>();
  for (const report of reports) {
    const iso = report.reportDate.slice(0, 10); // yyyy-mm-dd
    counts.set(iso, (counts.get(iso) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date,
      count,
      label: new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    }));
}

/** Average estimatedLossPercentage grouped by a key (e.g. "crop"), sorted worst-first. */
export function averageLossBy(reports: Report[], key: keyof Report): CountEntry[] {
  const sums = new Map<string, { total: number; count: number }>();
  for (const report of reports) {
    const raw = report[key];
    const label = typeof raw === "string" ? raw : String(raw);
    const entry = sums.get(label) ?? { total: 0, count: 0 };
    entry.total += report.estimatedLossPercentage ?? 0;
    entry.count += 1;
    sums.set(label, entry);
  }
  return Array.from(sums.entries())
    .map(([label, { total, count }]) => ({ label, value: Math.round((total / count) * 10) / 10 }))
    .sort((a, b) => b.value - a.value);
}

/** Top N sub-counties by report count, with average loss for context. */
export interface HotspotEntry {
  subCounty: string;
  county: string;
  reportCount: number;
  averageLoss: number;
}

export interface ChartSlice {
  label: string;
  value: number;
  color: string;
}

export function topHotspots(reports: Report[], limit = 5): HotspotEntry[] {
  const groups = new Map<string, { county: string; total: number; count: number }>();
  for (const report of reports) {
    const key = `${report.subCounty}|${report.county}`;
    const entry = groups.get(key) ?? { county: report.county, total: 0, count: 0 };
    entry.total += report.estimatedLossPercentage ?? 0;
    entry.count += 1;
    groups.set(key, entry);
  }
  return Array.from(groups.entries())
    .map(([key, { county, total, count }]) => ({
      subCounty: key.split("|")[0],
      county,
      reportCount: count,
      averageLoss: Math.round((total / count) * 10) / 10,
    }))
    .sort((a, b) => b.reportCount - a.reportCount)
    .slice(0, limit);
}

const CHART_PALETTE = ["#2F9E52", "#F59E0B", "#3B82F6", "#A855F7", "#EF4444", "#94A3B8"];

/** Assigns a stable color to each entry, falling back to a shared "Others" bucket after `max`. */
export function toChartSlices(entries: CountEntry[], max = 4): ChartSlice[] {
  const top = entries.slice(0, max);
  const rest = entries.slice(max);
  const restTotal = rest.reduce((sum, e) => sum + e.value, 0);
  const slices = restTotal > 0 ? [...top, { label: "Others", value: restTotal }] : top;
  return slices.map((slice, i) => ({ ...slice, color: CHART_PALETTE[i % CHART_PALETTE.length] }));
}