import type { ReportFormValues } from "@/lib/report-form-schema";

interface ReviewStepProps {
  values: ReportFormValues;
  onEditStep: (step: number) => void;
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return (
    <div
      className="
        flex
        flex-col
        gap-1
        py-1.5
        text-sm
        sm:flex-row
        sm:justify-between
        sm:gap-4
      "
    >
      <span className="text-gray-500">
        {label}
      </span>

      <span
        className="
          break-words
          font-medium
          text-gray-900
          sm:text-right
        "
      >
        {value}
      </span>
    </div>
  );
}


export function ReviewStep({
  values,
  onEditStep,
}: ReviewStepProps) {

  return (
    <div className="space-y-5">

      <h2 className="text-base font-semibold text-gray-900">
        Review Your Report
      </h2>


      {/* Farm Location */}
      <div className="rounded-lg border border-gray-200 p-4">

        <div className="
          mb-3
          flex
          items-center
          justify-between
        ">
          <h3 className="text-sm font-semibold text-gray-700">
            Farm Location
          </h3>

          <button
            type="button"
            onClick={() => onEditStep(0)}
            className="
              text-xs
              font-medium
              text-green-700
              hover:underline
            "
          >
            Edit
          </button>

        </div>


        <ReviewRow
          label="County"
          value={values.county}
        />

        <ReviewRow
          label="Sub-county"
          value={values.subCounty}
        />

        <ReviewRow
          label="Ward"
          value={values.ward}
        />

        <ReviewRow
          label="GPS"
          value={
            values.latitude && values.longitude
              ? `${values.latitude}, ${values.longitude}`
              : undefined
          }
        />

      </div>



      {/* Farm Details */}
      <div className="rounded-lg border border-gray-200 p-4">

        <div className="
          mb-3
          flex
          items-center
          justify-between
        ">

          <h3 className="text-sm font-semibold text-gray-700">
            Farm Details
          </h3>


          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="
              text-xs
              font-medium
              text-green-700
              hover:underline
            "
          >
            Edit
          </button>

        </div>


        <ReviewRow
          label="Crop"
          value={values.crop}
        />


        <ReviewRow
          label="Farm Size"
          value={
            values.farmSizeAcres
              ? `${values.farmSizeAcres} acres`
              : undefined
          }
        />


        <ReviewRow
          label="Planting Date"
          value={
            values.plantingMonth &&
            values.plantingYear
              ? `${values.plantingMonth} ${values.plantingYear}`
              : undefined
          }
        />


        <ReviewRow
          label="Growth Stage"
          value={values.growthStage}
        />

      </div>



      {/* Climate Impact */}
      <div className="rounded-lg border border-gray-200 p-4">

        <div className="
          mb-3
          flex
          items-center
          justify-between
        ">

          <h3 className="text-sm font-semibold text-gray-700">
            Climate Impact
          </h3>


          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="
              text-xs
              font-medium
              text-green-700
              hover:underline
            "
          >
            Edit
          </button>

        </div>


        <ReviewRow
          label="Climate Event"
          value={values.climateEvent}
        />


        <ReviewRow
          label="Estimated Loss"
          value={`${values.estimatedLossPercentage ?? 0}%`}
        />


        <ReviewRow
          label="Estimated Financial Loss"
          value={
            values.estimatedFinancialLoss
              ? `KES ${values.estimatedFinancialLoss.toLocaleString()}`
              : undefined
          }
        />


        {values.description && (
          <p
            className="
              mt-3
              rounded-md
              bg-gray-50
              p-3
              text-sm
              leading-relaxed
              text-gray-600
              break-words
            "
          >
            {values.description}
          </p>
        )}

      </div>


    </div>
  );
}