import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CaretLeft, CaretRight, CheckCircle } from "@phosphor-icons/react";
import { ReportsApi } from "@/api/reports";
import { useReportMetadata } from "@/hooks/useReportMetadata";
import {
  reportFormSchema,
  REPORT_FORM_STEPS,
  STEP_FIELDS,
  REPORT_FORM_DEFAULTS,
  type ReportFormValues,
} from "@/lib/report-form-schema";
import type { CreateReportDto } from "@/types/report";
import { Stepper } from "./Stepper";
import { FarmLocationStep } from "./Steps/FarmLocationStep";
import { FarmDetailsStep } from "./Steps/FarmDetailsStep";
import { ClimateImpactStep } from "./Steps/ClimateImpactStep";
import { ReviewStep } from "./Steps/ReviewStep";

const LAST_STEP = REPORT_FORM_STEPS.length - 1;

export function ReportForm() {
  const [step, setStep] = useState(0);
  const { data: metadata, isLoading: metadataLoading } = useReportMetadata();

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportFormSchema),
    defaultValues: REPORT_FORM_DEFAULTS,
    mode: "onBlur",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess, isError, reset: resetMutation } = useMutation({
    mutationFn: (values: ReportFormValues) => {
      const payload: CreateReportDto = {
        ...values,
        reportDate: new Date().toISOString(),
        ward: values.ward || undefined,
        description: values.description || undefined,
        imageUrl: values.imageUrl || undefined,
      };
      return ReportsApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });

  async function goNext() {
    const fieldsToValidate = STEP_FIELDS[step];
    const valid = await form.trigger(fieldsToValidate);
    if (!valid) return;
    setStep((s) => Math.min(LAST_STEP, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  function onSubmit(values: ReportFormValues) {
    mutate(values);
  }

  function startNewReport() {
    form.reset(REPORT_FORM_DEFAULTS);
    setStep(0);
    resetMutation();
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-10 text-center">
        <CheckCircle size={48} weight="fill" className="text-green-600" />
        <h2 className="text-lg font-semibold text-gray-900">Report submitted</h2>
        <p className="max-w-sm text-sm text-gray-500">
          Thank you — your report has been recorded and will help organizations respond faster.
        </p>
        <button
          type="button"
          onClick={startNewReport}
          className="mt-2 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
        >
          Submit Another Report
        </button>
      </div>
    );
  }

  if (metadataLoading || !metadata) {
    return <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Loading form...</div>;
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Stepper steps={REPORT_FORM_STEPS} currentStep={step} />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-xl border border-gray-200 bg-white p-5"
      >
        {step === 0 && <FarmLocationStep form={form} />}
        {step === 1 && (
          <FarmDetailsStep
            form={form}
            crops={metadata.crops}
            plantingMonths={metadata.plantingMonths}
            growthStages={metadata.growthStages}
          />
        )}
        {step === 2 && <ClimateImpactStep form={form} climateEvents={metadata.climateEvents} />}
        {step === 3 && <ReviewStep values={form.getValues()} onEditStep={setStep} />}

        {isError && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Something went wrong submitting your report. Please try again.
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-0"
          >
            <CaretLeft size={16} />
            Back
          </button>

          {step < LAST_STEP ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-1 rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800"
            >
              Next
              <CaretRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800 disabled:opacity-60"
            >
              {isPending ? "Submitting..." : "Submit Report"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}