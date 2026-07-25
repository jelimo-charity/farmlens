import { useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { CircleMarkerOptions, TileLayerOptions } from "leaflet";
import { useReports } from "@/hooks/useReports";
import { useDashboardFilters } from "@/context/dashboard-filters";
import { impactColor, impactLabel, impactLevel } from "@/lib/report-utils";

const DEFAULT_CENTER: [number, number] = [-0.42, 36.95]; // Nyeri County

const tileLayerOptions: TileLayerOptions & { attribution: string } = {
  attribution: "&copy; OpenStreetMap contributors",
};

export default function MapPage() {
  const { data: allReports = [], isLoading, isError } = useReports();
  const { applyFilters, county, dateRange } = useDashboardFilters();

  const [crop, setCrop] = useState("All Crops");

  const baseReports = applyFilters(allReports);
  const crops = Array.from(new Set(allReports.map((r) => r.crop))).sort();

  const reports = useMemo(
    () => baseReports.filter((r) => (crop === "All Crops" ? true : r.crop === crop)),
    [baseReports, crop],
  );

  const withCoords = reports.filter((r) => r.latitude && r.longitude);
  const center: [number, number] = withCoords.length
    ? [withCoords[0].latitude, withCoords[0].longitude]
    : DEFAULT_CENTER;

  if (isLoading) {
    return <div className="p-6 text-sm text-gray-500">Loading map...</div>;
  }

  if (isError) {
    return <div className="p-6 text-sm text-red-600">Couldn't load reports. Please try again.</div>;
  }

  return (
    <div className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Map</h1>
        <span className="text-sm text-gray-500">{reports.length} reports plotted</span>
      </div>

      {(county !== "All Counties" || dateRange !== "All Time") && (
        <p className="rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800">
          Showing results for {county !== "All Counties" ? county : "all counties"}
          {dateRange !== "All Time" ? ` · ${dateRange}` : ""}. Change this from the top bar.
        </p>
      )}

      <div className="flex flex-1 flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="rounded-lg border border-gray-200 py-2 px-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option>All Crops</option>
            {crops.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <ul className="flex items-center gap-3 text-xs text-gray-500">
            {(["high", "medium", "low"] as const).map((level) => (
              <li key={level} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: impactColor[level] }} />
                {impactLabel[level]}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-h-[420px] flex-1 overflow-hidden rounded-lg">
          <MapContainer center={center} zoom={9} scrollWheelZoom style={{ height: "100%", width: "100%" }}>
            <TileLayer
              {...tileLayerOptions}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {withCoords.map((report) => {
              const level = impactLevel(report.estimatedLossPercentage);
              const circleOptions: CircleMarkerOptions = {
                radius: 8,
                color: impactColor[level],
                fillColor: impactColor[level],
                fillOpacity: 0.85,
                weight: 1,
              };
              return (
                <CircleMarker
                  key={report.id}
                  center={[report.latitude, report.longitude]}
                  {...circleOptions}
                >
                  <Popup>
                    <strong>
                      {report.ward}, {report.subCounty}
                    </strong>
                    <br />
                    {report.county} County
                    <br />
                    {report.crop} · {report.estimatedLossPercentage}% loss
                    <br />
                    {report.climateEvent}
                    <br />
                    {new Date(report.reportDate).toLocaleDateString()}
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>

        {withCoords.length === 0 && (
          <p className="text-center text-sm text-gray-400">No reports with location data match the current filters.</p>
        )}
      </div>
    </div>
  );
}