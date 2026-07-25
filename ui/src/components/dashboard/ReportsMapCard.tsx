import type { CircleMarkerOptions, TileLayerOptions } from "leaflet";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Report } from "../../types/report";
import { impactColor, impactLabel, impactLevel } from "../../lib/report-utils";

// NOTE: if you're seeing "Property 'attribution'/'radius' does not exist" TS errors here,
// it means TypeScript is resolving a different `leaflet` install than the one react-leaflet's
// types were built against (usually a duplicate copy nested in node_modules). Run
// `npm ls leaflet` — if more than one version shows up, run `npm dedupe` or reinstall.
// Typing the option objects explicitly against Leaflet's own types (below) works around
// the mismatch either way.

const tileLayerOptions: TileLayerOptions & { attribution: string } = {
  attribution: "&copy; OpenStreetMap contributors",
};

interface ReportsMapCardProps {
  title: string;
  reports: Report[];
}

const DEFAULT_CENTER: [number, number] = [-0.42, 36.95]; // Nyeri County

export function ReportsMapCard({ title, reports }: ReportsMapCardProps) {
  const withCoords = reports.filter((r) => r.latitude && r.longitude);
  const center: [number, number] = withCoords.length
    ? [withCoords[0].latitude, withCoords[0].longitude]
    : DEFAULT_CENTER;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <ul className="flex items-center gap-3 text-xs text-gray-500">
          {(["high", "medium", "low"] as const).map((level) => (
            <li key={level} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: impactColor[level] }}
              />
              {impactLabel[level]}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-72 w-full overflow-hidden rounded-lg">
        <MapContainer center={center} zoom={10} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            {...tileLayerOptions}
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {withCoords.map((report) => {
            const level = impactLevel(report.estimatedLossPercentage);
            const circleOptions: CircleMarkerOptions = {
              radius: 7,
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
                  <strong>{report.ward}, {report.subCounty}</strong>
                  <br />
                  {report.crop} · {report.estimatedLossPercentage}% loss
                  <br />
                  {report.climateEvent}
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}