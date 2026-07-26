import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import type { TileLayerOptions } from "leaflet";

// Default Leaflet marker icons reference files that don't resolve correctly
// under most bundlers — point them at CDN copies instead.
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

interface LocationPickerMapProps {
  center: [number, number];
  position: [number, number] | null;
  onChange: (lat: number, lon: number) => void;
}

function RecenterOnChange({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center[0], center[1]]);
  return null;
}

function ClickHandler({ onChange }: { onChange: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) {
      onChange(Number(e.latlng.lat.toFixed(5)), Number(e.latlng.lng.toFixed(5)));
    },
  });
  return null;
}

export function LocationPickerMap({ center, position, onChange }: LocationPickerMapProps) {
  return (
    <div className="h-56 w-full overflow-hidden rounded-lg border border-gray-200">
      <MapContainer center={center} zoom={9} style={{ height: "100%", width: "100%" }}>
        <TileLayer {...tileLayerOptions} url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <RecenterOnChange center={center} />
        <ClickHandler onChange={onChange} />
        {position && (
          <Marker
            position={position}
            icon={markerIcon}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const marker = e.target as L.Marker;
                const { lat, lng } = marker.getLatLng();
                onChange(Number(lat.toFixed(5)), Number(lng.toFixed(5)));
              },
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}