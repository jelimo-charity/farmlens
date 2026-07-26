import type { UseFormReturn } from "react-hook-form";
import { Field, inputClass } from "../Fields";
import type { ReportFormValues } from "@/lib/report-form-schema";

interface ClimateImpactStepProps {
  form: UseFormReturn<ReportFormValues>;
  climateEvents: string[];
}

export function ClimateImpactStep({
  form,
  climateEvents,
}: ClimateImpactStepProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const lossValue = watch("estimatedLossPercentage") ?? 0;

  return (
    <div className="space-y-5">

      <h2 className="text-base font-semibold text-gray-900">
        Climate Impact
      </h2>


      <Field
        label="Climate Event"
        htmlFor="climateEvent"
        error={errors.climateEvent?.message}
      >
        <select
          id="climateEvent"
          className={inputClass}
          {...register("climateEvent")}
        >
          <option value="">
            Select climate event
          </option>

          {climateEvents.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}

        </select>
      </Field>


      {/* Crop loss slider */}
      <div>

        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">

          <label
            htmlFor="estimatedLossPercentage"
            className="text-sm font-medium text-gray-700"
          >
            Estimated Crop Loss
          </label>

          <span className="text-sm font-semibold text-green-700">
            {lossValue}%
          </span>

        </div>


        <input
          id="estimatedLossPercentage"
          type="range"
          min={0}
          max={100}
          step={5}
          className="
            w-full
            cursor-pointer
            accent-green-700
          "
          {...register("estimatedLossPercentage", {
            setValueAs: (v) =>
              v === "" ? undefined : Number(v),
          })}
        />


        {errors.estimatedLossPercentage && (
          <p className="mt-1 text-xs text-red-600">
            {errors.estimatedLossPercentage.message}
          </p>
        )}

      </div>



      <Field
        label="Estimated Financial Loss (KES)"
        htmlFor="estimatedFinancialLoss"
        optional
        error={errors.estimatedFinancialLoss?.message}
      >

        <input
          id="estimatedFinancialLoss"
          type="number"
          min="0"
          step="100"
          className={inputClass}
          placeholder="e.g. 35000"
          {...register("estimatedFinancialLoss", {
            setValueAs: (v) =>
              v === "" ? undefined : Number(v),
          })}
        />

      </Field>


      <p className="
        text-xs
        leading-relaxed
        text-gray-500
      ">
        Optional. Estimate the value of crops, inputs, or income lost due to
        this climate event.
      </p>



      <Field
        label="Description"
        htmlFor="description"
        optional
        error={errors.description?.message}
      >

        <textarea
          id="description"
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Briefly describe what happened and when..."
          {...register("description")}
        />

      </Field>



      <Field
        label="Photo URL"
        htmlFor="imageUrl"
        optional
        error={errors.imageUrl?.message}
      >

        <input
          id="imageUrl"
          className={inputClass}
          placeholder="https://example.com/photo.jpg"
          {...register("imageUrl")}
        />

      </Field>


    </div>
  );
}