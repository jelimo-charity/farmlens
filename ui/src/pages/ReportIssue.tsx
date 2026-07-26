import { ReportForm } from "@/components/report-issue/ReportForm";

export default function ReportIssue() {
  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 md:py-6 lg:px-8">
        <div className="mb-5">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Submit Report
          </h1>

          <p className="mt-1 text-sm text-slate-600 md:text-base">
            Help us understand climate-related challenges affecting your farm.
          </p>
        </div>

        <ReportForm />
      </div>
    </div>
  );
}