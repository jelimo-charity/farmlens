import {
  ClipboardText,
  MapPin,
  ChartBar,
  HandHeart,
} from "@phosphor-icons/react";

const steps = [
  {
    icon: ClipboardText,
    title: "Report",
    text: "Farmers submit reports about climate impacts.",
  },
  {
    icon: MapPin,
    title: "Locate",
    text: "GPS coordinates identify affected farms.",
  },
  {
    icon: ChartBar,
    title: "Analyze",
    text: "Reports are transformed into useful insights.",
  },
  {
    icon: HandHeart,
    title: "Respond",
    text: "Organizations provide timely support.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-green-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How It Works
          </h2>

          <p className="mt-4 text-gray-600">
            From reporting to action in four simple steps.
          </p>
        </div>

        <div className="mt-20 grid gap-10 md:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-600 text-white shadow-lg">
                  <Icon size={36} />
                </div>

                <div className="mt-5 text-lg font-bold">
                  {index + 1}. {step.title}
                </div>

                <p className="mt-3 text-gray-600">
                  {step.text}
                </p>

              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}