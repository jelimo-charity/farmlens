import { ReportForm } from "@/components/report-issue/ReportForm";

export default function ReportIssue() {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Submit Report
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          Tell us what's happening on your farm — it only takes a couple of minutes.
        </p>
      </div>

      <div className="mt-6">
        <ReportForm />
      </div>
    </div>
  );
}