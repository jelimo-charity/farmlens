import { useEffect, useMemo, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { CheckCircle, MapPin, Spinner, WarningCircle } from "@phosphor-icons/react";
import { Field, inputClass } from "../Fields";
import { LocationPreviewMap } from "./Locationpreviewmap";
import { KENYA_COUNTY_SUBCOUNTIES, KENYA_COUNTIES } from "@/lib/kenya-subcounties";
import { getWards } from "@/lib/kenya-wards";
import { KENYA_COUNTY_CENTERS, DEFAULT_MAP_CENTER } from "@/lib/kenya-county-centers";
import { forwardGeocode } from "@/lib/forward-geocode";
import type { ReportFormValues } from "@/lib/report-form-schema";

interface FarmLocationStepProps {
  form: UseFormReturn<ReportFormValues>;
}

type LocationStatus =
  | "locating-gps"      // trying device GPS
  | "gps"                // device GPS succeeded — best available, most precise
  | "searching"          // GPS unavailable, looking up the typed county/sub-county/ward instead
  | "resolved"           // found coordinates for the typed area
  | "approximate";       // fell back to the county's general area

export function FarmLocationStep({ form }: FarmLocationStepProps) {
  const { register, watch, setValue, formState: { errors } } = form;
  const [status, setStatus] = useState<LocationStatus>("locating-gps");
  const gpsSucceeded = useRef(false);

  const county = watch("county");
  const subCounty = watch("subCounty");
  const ward = watch("ward");
  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const subCounties = county ? KENYA_COUNTY_SUBCOUNTIES[county] ?? [] : [];
  const wards = useMemo(
    () => (county && subCounty ? getWards(county, subCounty) : null),
    [county, subCounty],
  );

  useEffect(() => {
    if (subCounty && !subCounties.includes(subCounty)) {
      setValue("subCounty", "");
      setValue("ward", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [county]);

  useEffect(() => {
    const currentWard = form.getValues("ward");
    if (wards && currentWard && !wards.includes(currentWard)) {
      setValue("ward", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subCounty]);

  // --- Priority 1: device GPS, tried once on mount. Most precise, zero effort. ---
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("searching");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        gpsSucceeded.current = true;
        setValue("latitude", Number(position.coords.latitude.toFixed(5)), { shouldValidate: true });
        setValue("longitude", Number(position.coords.longitude.toFixed(5)), { shouldValidate: true });
        setStatus("gps");
      },
      () => setStatus("searching"), // fall through to name-based lookup below
      { timeout: 8000 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Priority 2: forward-geocode whatever they've typed/selected so far, ---
  // --- re-running as they refine ward/sub-county for better precision.     ---
  // --- Skipped entirely if GPS already gave us a precise position.        ---
  useEffect(() => {
    if (gpsSucceeded.current) return;
    if (!county) return;

    let cancelled = false;
    setStatus("searching");

    const query = [ward, subCounty, county, "Kenya"].filter(Boolean).join(", ");
    const timer = setTimeout(async () => {
      const result = await forwardGeocode(query);
      if (cancelled) return;

      if (result) {
        setValue("latitude", Number(result.latitude.toFixed(5)), { shouldValidate: true });
        setValue("longitude", Number(result.longitude.toFixed(5)), { shouldValidate: true });
        setStatus("resolved");
      } else {
        // Priority 3: guaranteed fallback, no network needed.
        const center = KENYA_COUNTY_CENTERS[county];
        if (center) {
          setValue("latitude", center[0], { shouldValidate: true });
          setValue("longitude", center[1], { shouldValidate: true });
        }
        setStatus("approximate");
      }
    }, 600); // debounce so switching ward/sub-county quickly doesn't spam requests

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [county, subCounty, ward, setValue]);

  const mapPosition: [number, number] | null =
    latitude != null && longitude != null ? [latitude, longitude] : null;
  const mapCenter: [number, number] =
    mapPosition ?? (county ? KENYA_COUNTY_CENTERS[county] : undefined) ?? DEFAULT_MAP_CENTER;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">Farm Information</h2>

      <Field label="County" htmlFor="county" error={errors.county?.message}>
        <select id="county" className={inputClass} {...register("county")}>
          <option value="">Select county</option>
          {KENYA_COUNTIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Sub-county" htmlFor="subCounty" error={errors.subCounty?.message}>
        <select id="subCounty" className={inputClass} disabled={!county} {...register("subCounty")}>
          <option value="">{county ? "Select sub-county" : "Select a county first"}</option>
          {subCounties.map((sc) => (
            <option key={sc} value={sc}>
              {sc}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Ward / Village" htmlFor="ward" optional error={errors.ward?.message}>
        {wards ? (
          <select id="ward" className={inputClass} {...register("ward")}>
            <option value="">Select ward</option>
            {wards.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        ) : (
          <input
            id="ward"
            className={inputClass}
            placeholder={subCounty ? "e.g. Kiamathaga" : "Select a sub-county first"}
            disabled={!subCounty}
            {...register("ward")}
          />
        )}
        {!wards && subCounty && (
          <p className="mt-1 text-[13px] sm:text-xs text-gray-400">
            We don't have a ward list for this area yet — type it in.
          </p>
        )}
      </Field>

      {/* Location — resolved automatically, nothing for the farmer to fill in or tap. */}
      <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-[13px] sm:text-xs">
        {status === "locating-gps" && (
          <span className="flex items-center gap-1.5 text-gray-500">
            <Spinner size={14} className="animate-spin" />
            Detecting your location...
          </span>
        )}
        {status === "gps" && (
          <span className="flex items-center gap-1.5 text-green-700">
            <CheckCircle size={14} weight="fill" />
            Using your device's exact location
          </span>
        )}
        {status === "searching" && (
          <span className="flex items-center gap-1.5 text-gray-500">
            <Spinner size={14} className="animate-spin" />
            Locating {[ward, subCounty, county].filter(Boolean).pop() ?? "your area"}...
          </span>
        )}
        {status === "resolved" && (
          <span className="flex items-center gap-1.5 text-green-700">
            <MapPin size={14} weight="fill" />
            Location found for {[ward, subCounty].filter(Boolean)[0] ?? county}
          </span>
        )}
        {status === "approximate" && (
          <span className="flex items-center gap-1.5 text-amber-700">
            <WarningCircle size={14} />
            Showing the general {county} area — exact spot not found, but that's okay to submit.
          </span>
        )}
      </div>

      {county && <LocationPreviewMap center={mapCenter} position={mapPosition} />}
    </div>
  );
}