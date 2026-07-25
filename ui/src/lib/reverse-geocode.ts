export interface ReverseGeocodeResult {
  subCounty: string;
  detected: boolean; // false if we had to fall back to a placeholder
}

/**
 * Best-effort reverse geocode of GPS coordinates to a sub-county-like name.
 * Uses OpenStreetMap's free Nominatim API. Kenya's county/sub-county/ward
 * hierarchy doesn't map cleanly onto Nominatim's address fields, so this
 * picks the closest available field and should be treated as a *guess* —
 * farmers can still correct it via the "edit manually" fallback in the form.
 *
 * For production-grade accuracy, consider swapping this for a paid geocoder
 * (Google Geocoding API, Mapbox, etc.) or a local Kenya ward/sub-county
 * boundary lookup instead.
 */
export async function reverseGeocodeSubCounty(
  latitude: number,
  longitude: number,
): Promise<ReverseGeocodeResult> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      { headers: { Accept: "application/json" } },
    );
    if (!res.ok) throw new Error("Reverse geocode request failed");

    const data = await res.json();
    const address = data?.address ?? {};

    const candidate: string | undefined =
      address.county || address.state_district || address.city_district || address.suburb || address.town;

    if (candidate) {
      return { subCounty: candidate, detected: true };
    }
    return { subCounty: "Not specified", detected: false };
  } catch {
    return { subCounty: "Not specified", detected: false };
  }
}