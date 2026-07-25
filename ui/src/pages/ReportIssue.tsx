import { ReportForm } from "@/components/report-issue/ReportForm";

export default function ReportIssue() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-900">Submit Report</h1>
        <p className="mt-1 text-sm text-gray-500">
          Tell us what's happening on your farm — it only takes a couple of minutes.
        </p>
      </div>
      <div className="mt-6">
        <ReportForm />
      </div>
    </div>
  );
}