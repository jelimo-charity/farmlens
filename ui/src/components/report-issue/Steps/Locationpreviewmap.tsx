import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { TileLayerOptions } from "leaflet";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const tileLayerOptions: TileLayerOptions & { attribution: string } = {
  attribution: "&copy; OpenStreetMap contributors",
};

interface LocationPreviewMapProps {
  center: [number, number];
  position: [number, number] | null;
  zoom?: number;
}

function RecenterOnChange({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center[0], center[1], zoom]);
  return null;
}

/** Purely a visual confirmation of the auto-detected/auto-resolved location — not interactive. */
export function LocationPreviewMap({ center, position, zoom = 11 }: LocationPreviewMapProps) {
  return (
    <div className="h-48 w-full overflow-hidden rounded-lg border border-gray-200">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        attributionControl={false}
      >
        <TileLayer {...tileLayerOptions} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterOnChange center={center} zoom={zoom} />
        {position && <Marker position={position} icon={markerIcon} />}
      </MapContainer>
    </div>
  );
}