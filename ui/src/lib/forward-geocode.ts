export interface ForwardGeocodeResult {
  latitude: number;
  longitude: number;
}

// Simple in-memory cache so re-selecting the same ward/sub-county doesn't
// re-hit the network every time (e.g. flipping between two wards and back).
const cache = new Map<string, ForwardGeocodeResult | null>();

/**
 * Best-effort forward geocode of a Kenyan place name to coordinates, using
 * OpenStreetMap's free Nominatim API. This is only ever used as a fallback
 * when device GPS isn't available — if it fails or returns nothing, the
 * caller should fall back further to a known-good county centroid rather
 * than block the farmer from submitting.
 */
export async function forwardGeocode(query: string): Promise<ForwardGeocodeResult | null> {
  if (!query.trim()) return null;
  if (cache.has(query)) return cache.get(query)!;

  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=jsonv2&countrycodes=ke&limit=1&q=${encodeURIComponent(query)}`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error("Forward geocode request failed");

    const data = await res.json();
    const first = Array.isArray(data) ? data[0] : null;

    const result: ForwardGeocodeResult | null = first
      ? { latitude: Number(first.lat), longitude: Number(first.lon) }
      : null;

    cache.set(query, result);
    return result;
  } catch {
    cache.set(query, null);
    return null;
  }
}