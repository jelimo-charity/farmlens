import { useCallback, useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  ArrowClockwise,
  CheckCircle,
  MapPin,
  PencilSimple,
  Spinner,
  WarningCircle,
} from "@phosphor-icons/react";
import { Field, inputClass } from "../Fields";
import { KENYA_COUNTIES } from "@/lib/kenya-counties";
import { reverseGeocodeSubCounty } from "@/lib/reverse-geocode";
import type { ReportFormValues } from "@/lib/report-form-schema";

interface FarmLocationStepProps {
  form: UseFormReturn<ReportFormValues>;
}

type LocationStatus = "locating" | "detected" | "denied" | "unavailable";

export function FarmLocationStep({ form }: FarmLocationStepProps) {
  const { register, setValue, formState: { errors } } = form;
  const [status, setStatus] = useState<LocationStatus>("locating");
  const [manualOverride, setManualOverride] = useState(false);

  const detectLocation = useCallback(() => {
    setStatus("locating");

    if (!navigator.geolocation) {
      setStatus("unavailable");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude.toFixed(4));
        const lon = Number(position.coords.longitude.toFixed(4));
        setValue("latitude", lat, { shouldValidate: true });
        setValue("longitude", lon, { shouldValidate: true });

        const result = await reverseGeocodeSubCounty(lat, lon);
        setValue("subCounty", result.subCounty, { shouldValidate: true });
        setStatus(result.detected ? "detected" : "unavailable");
      },
      (error) => {
        // code 1 = PERMISSION_DENIED — the browser has blocked the prompt (or the
        // user declined it). Retrying getCurrentPosition() won't help here; the
        // farmer needs to change it in their browser's site settings. Other codes
        // (POSITION_UNAVAILABLE, TIMEOUT) are worth just letting them retry.
        setStatus(error.code === error.PERMISSION_DENIED ? "denied" : "unavailable");
      },
      { timeout: 10000 },
    );
  }, [setValue]);

  useEffect(() => {
    // Farmers shouldn't have to know or type their sub-county, or fiddle with
    // GPS fields — capture location automatically and derive sub-county from it.
    // A placeholder is set immediately so the form never blocks on this resolving.
    setValue("subCounty", "Not specified");
    detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      <Field label="Ward / Village" htmlFor="ward" error={errors.ward?.message}>
        <input
          id="ward"
          className={inputClass}
          placeholder="e.g. Kiamathaga"
          {...register("ward")}
        />
      </Field>

      {/* Location — captured silently. No coordinates or sub-county for the farmer to fill in. */}
      <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-xs">
        {status === "locating" && (
          <span className="flex items-center gap-1.5 text-gray-500">
            <Spinner size={14} className="animate-spin" />
            Detecting your location...
          </span>
        )}

        {status === "detected" && (
          <span className="flex items-center gap-1.5 text-green-700">
            <CheckCircle size={14} weight="fill" />
            Location detected automatically
          </span>
        )}

        {status === "unavailable" && !manualOverride && (
          <div className="flex items-center justify-between gap-2 text-amber-700">
            <span className="flex items-center gap-1.5">
              <WarningCircle size={14} />
              Couldn't auto-detect your location — that's okay, you can still submit.
            </span>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={detectLocation}
                className="flex items-center gap-1 font-medium text-green-700 hover:underline"
              >
                <ArrowClockwise size={12} />
                Try again
              </button>
              <button
                type="button"
                onClick={() => setManualOverride(true)}
                className="flex items-center gap-1 font-medium text-green-700 hover:underline"
              >
                <PencilSimple size={12} />
                Edit manually
              </button>
            </div>
          </div>
        )}

        {status === "denied" && !manualOverride && (
          <div className="flex items-center justify-between gap-2 text-amber-700">
            <span className="flex items-center gap-1.5">
              <WarningCircle size={14} />
              Location access is blocked for this site — enable it in your browser's
              site settings if you'd like it auto-filled, or continue without it.
            </span>
            <button
              type="button"
              onClick={() => setManualOverride(true)}
              className="flex shrink-0 items-center gap-1 font-medium text-green-700 hover:underline"
            >
              <PencilSimple size={12} />
              Edit manually
            </button>
          </div>
        )}
      </div>

      {manualOverride && (
        <div className="space-y-3 rounded-lg border border-gray-200 p-3">
          <p className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
            <MapPin size={14} />
            Manual location (optional)
          </p>
          <Field label="Sub-county" htmlFor="subCounty" optional error={errors.subCounty?.message}>
            <input id="subCounty" className={inputClass} placeholder="e.g. Mathira" {...register("subCounty")} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <input
              className={inputClass}
              placeholder="Latitude"
              type="number"
              step="any"
              {...register("latitude", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
            />
            <input
              className={inputClass}
              placeholder="Longitude"
              type="number"
              step="any"
              {...register("longitude", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
            />
          </div>
        </div>
      )}
    </div>
  );
}