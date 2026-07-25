import type { UseFormReturn } from "react-hook-form";
import { Field, inputClass } from "../Fields";
import type { ReportFormValues } from "@/lib/report-form-schema";

interface FarmDetailsStepProps {
  form: UseFormReturn<ReportFormValues>;
  crops: string[];
  plantingMonths: string[];
  growthStages: string[];
}

export function FarmDetailsStep({ form, crops, plantingMonths, growthStages }: FarmDetailsStepProps) {
  const { register, formState: { errors } } = form;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-900">Farm Details</h2>

      <Field label="Crop" htmlFor="crop" error={errors.crop?.message}>
        <select id="crop" className={inputClass} {...register("crop")}>
          <option value="">Select crop</option>
          {crops.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Farm Size (Acres)" htmlFor="farmSizeAcres" error={errors.farmSizeAcres?.message}>
        <input
          id="farmSizeAcres"
          type="number"
          step="0.1"
          min="0"
          className={inputClass}
          placeholder="e.g. 2.5"
          {...register("farmSizeAcres")}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Planting Month" htmlFor="plantingMonth" error={errors.plantingMonth?.message}>
          <select id="plantingMonth" className={inputClass} {...register("plantingMonth")}>
            <option value="">Select month</option>
            {plantingMonths.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Planting Year" htmlFor="plantingYear" error={errors.plantingYear?.message}>
          <input
            id="plantingYear"
            type="number"
            className={inputClass}
            placeholder="e.g. 2026"
            {...register("plantingYear")}
          />
        </Field>
      </div>

      <Field label="Growth Stage" htmlFor="growthStage" error={errors.growthStage?.message}>
        <select id="growthStage" className={inputClass} {...register("growthStage")}>
          <option value="">Select growth stage</option>
          {growthStages.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </Field>
    </div>
  );
}