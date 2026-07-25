import { Check } from "@phosphor-icons/react";

interface StepperProps {
  steps: readonly { label: string }[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <ol className="flex items-center">
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isActive = index === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <li key={step.label} className={`flex items-center ${isLast ? "" : "flex-1"}`}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isComplete
                    ? "bg-green-700 text-white"
                    : isActive
                      ? "border-2 border-green-700 text-green-700"
                      : "border-2 border-gray-200 text-gray-400"
                }`}
              >
                {isComplete ? <Check size={16} weight="bold" /> : index + 1}
              </div>
              <span
                className={`whitespace-nowrap text-xs font-medium ${
                  isActive || isComplete ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-colors ${
                  isComplete ? "bg-green-700" : "bg-gray-200"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}