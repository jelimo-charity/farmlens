import {
  MapTrifold,
  ChartPie,
  Database,
  Funnel,
  DeviceMobile,
  Cloud,
} from "@phosphor-icons/react";

const features = [
  {
    icon: MapTrifold,
    title: "Interactive Maps",
    description:
      "Visualize reported climate incidents across counties with an interactive map.",
  },
  {
    icon: ChartPie,
    title: "Analytics Dashboard",
    description:
      "Track trends, climate events, crop losses and reporting statistics in real time.",
  },
  {
    icon: Database,
    title: "Secure Data Storage",
    description:
      "Reports are securely stored and organized for long-term climate analysis.",
  },
  {
    icon: Funnel,
    title: "Advanced Filtering",
    description:
      "Quickly filter reports by crop, county, climate event and growth stage.",
  },
  {
    icon: DeviceMobile,
    title: "Mobile Friendly",
    description:
      "Submit reports easily from any device whether you're in the office or the field.",
  },
  {
    icon: Cloud,
    title: "Cloud Powered",
    description:
      "Reliable cloud infrastructure keeps data available whenever it's needed.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gradient-to-b from-white to-green-50 py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <div className="mx-auto mb-4 h-1 w-20 rounded-full bg-green-600" />

          <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
            Powerful Features
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            FarmLens combines mapping, analytics and modern reporting tools to
            help governments, NGOs and farmers monitor climate impacts with confidence.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="
                  group rounded-3xl bg-white p-8 shadow-sm
                  transition-all duration-300
                  hover:-translate-y-3
                  hover:shadow-2xl
                  hover:ring-1
                  hover:ring-green-200
                "
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 transition group-hover:bg-green-600">
                  <Icon
                    size={34}
                    className="text-green-700 transition group-hover:text-white"
                    weight="duotone"
                  />
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}