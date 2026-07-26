import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

export function Field({ label, htmlFor, error, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
        {optional && <span className="ml-1 text-xs font-normal text-gray-400">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

// text-base (16px) on mobile, text-sm (14px) from sm: up — inputs under 16px
// trigger iOS Safari's automatic zoom-on-focus, which is the single most
// jarring "this form feels broken on my phone" issue. py-3 (vs py-2.5) on
// mobile gives a slightly taller, easier-to-tap field; steps back down at sm:.
export const inputClass =
  "w-full rounded-lg border border-gray-200 py-3 sm:py-2.5 px-3 text-base sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600";