import {
  Leaf,
  MapPin,
  Lightning,
  ChartBar,
} from "@phosphor-icons/react";

const items = [
  {
    icon: Leaf,
    title: "Farmer First",
    description:
      "Built to help farmers quickly report crop losses caused by climate events.",
  },
  {
    icon: MapPin,
    title: "GPS Enabled",
    description:
      "Capture precise farm locations for faster verification and response.",
  },
  {
    icon: Lightning,
    title: "Real-Time Reporting",
    description:
      "Climate reports become available instantly for analysis.",
  },
  {
    icon: ChartBar,
    title: "Actionable Insights",
    description:
      "Understand climate trends using dashboards and analytics.",
  },
];

export default function WhyFarmLens() {
  return (
    <section id="why-farmlens" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <p className="font-semibold text-green-600">
            WHY FARMLENS
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Helping Farmers Build Climate Resilience
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-gray-600">
            FarmLens enables communities, NGOs and governments
            to collect reliable agricultural climate data from
            farmers across Kenya.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <Icon
                  size={50}
                  className="text-green-600"
                  weight="duotone"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}